"use client";
import React from "react";
import * as ChakraUI from "@chakra-ui/react";
import * as ShadcnUI from "@/design-libraries/shadcn-ui";

function MainComponent() {
  const [cards, setCards] = React.useState([]);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [currentCard, setCurrentCard] = React.useState(null);
  const [progress, setProgress] = React.useState({ completed: 0, total: 22 });
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await fetch("/api/major-arcana", { method: "POST" });
      if (!response.ok) {
        throw new Error(
          `Failed to fetch cards: [${response.status}] ${response.statusText}`
        );
      }
      const data = await response.json();
      setCards(data.cards || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load cards");
    }
  };

  const generateSigilForCard = async (card) => {
    const prompt = `Mystical sacred geometry sigil symbol, ${card.geometry} geometric pattern, representing ${card.harmonicName}, minimalist esoteric design, golden bronze metallic sacred symbols and intricate linework on pure black background, occult mysticism, precise sacred geometry, ethereal glow, arcane symbolism, hermetic tradition, high contrast, centered composition, symmetrical mandala`;

    const imageResponse = await fetch(
      `/integrations/stable-diffusion-v-3/?prompt=${encodeURIComponent(
        prompt
      )}&width=1024&height=1024`,
      { method: "GET" }
    );

    if (!imageResponse.ok) {
      throw new Error(
        `Failed to generate image: [${imageResponse.status}] ${imageResponse.statusText}`
      );
    }

    const imageData = await imageResponse.json();

    if (!imageData.data || !imageData.data[0]) {
      throw new Error("No image URL returned from Stable Diffusion");
    }

    const imageUrl = imageData.data[0];

    const updateResponse = await fetch("/api/generate-sigil", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageUrl,
        cardId: card.number,
      }),
    });

    if (!updateResponse.ok) {
      throw new Error(
        `Failed to update database: [${updateResponse.status}] ${updateResponse.statusText}`
      );
    }

    const result = await updateResponse.json();
    return { ...result, imageUrl };
  };

  const generateAllSigils = async () => {
    setIsGenerating(true);
    setError(null);
    setProgress({ completed: 0, total: cards.length });

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      setCurrentCard(card);

      try {
        const result = await generateSigilForCard(card);

        setCards((prevCards) =>
          prevCards.map((c) =>
            c.number === card.number
              ? { ...c, sigilUrl: result.imageUrl, status: "success" }
              : c
          )
        );

        setProgress((prev) => ({ ...prev, completed: prev.completed + 1 }));
      } catch (err) {
        console.error(err);
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.number === card.number
              ? { ...c, status: "error", error: err.message }
              : c
          )
        );
        setProgress((prev) => ({ ...prev, completed: prev.completed + 1 }));
      }
    }

    setIsGenerating(false);
    setCurrentCard(null);
  };

  const regenerateSingleCard = async (card) => {
    setCards((prevCards) =>
      prevCards.map((c) =>
        c.number === card.number ? { ...c, status: "loading" } : c
      )
    );

    try {
      const result = await generateSigilForCard(card);
      setCards((prevCards) =>
        prevCards.map((c) =>
          c.number === card.number
            ? { ...c, sigilUrl: result.imageUrl, status: "success" }
            : c
        )
      );
    } catch (err) {
      console.error(err);
      setCards((prevCards) =>
        prevCards.map((c) =>
          c.number === card.number
            ? { ...c, status: "error", error: err.message }
            : c
        )
      );
    }
  };

  const progressPercentage =
    progress.total > 0
      ? Math.round((progress.completed / progress.total) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-3">
            Sigil Regeneration
          </h1>
          <p className="text-gray-400 text-lg font-light">
            Generate mystical geometric sigils for all 22 Major Arcana cards
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-950 border border-red-800 rounded-lg">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button
            onClick={generateAllSigils}
            disabled={isGenerating || cards.length === 0}
            className="px-8 py-3 bg-gradient-to-r from-amber-600 to-yellow-700 hover:from-amber-500 hover:to-yellow-600 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-amber-900/50"
          >
            {isGenerating ? "Generating..." : "Generate All Sigils"}
          </button>

          {isGenerating && (
            <div className="flex-1 max-w-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">
                  {progress.completed} of {progress.total} complete
                </span>
                <span className="text-sm font-medium text-amber-500">
                  {progressPercentage}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 to-yellow-700 transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              {currentCard && (
                <p className="text-xs text-gray-500 mt-2">
                  Currently processing: {currentCard.harmonicName}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const cardStatus =
              card.status || (card.sigilUrl ? "complete" : "pending");

            return (
              <div
                key={card.number}
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-6 hover:border-amber-900/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-light mb-1">
                      {card.harmonicName}
                    </h3>
                    <p className="text-sm text-gray-500">Card {card.number}</p>
                  </div>

                  {cardStatus === "loading" && (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}

                  {cardStatus === "success" && (
                    <i className="fas fa-check-circle text-green-500 text-xl" />
                  )}

                  {cardStatus === "error" && (
                    <i className="fas fa-exclamation-circle text-red-500 text-xl" />
                  )}

                  {cardStatus === "complete" && (
                    <i className="fas fa-circle-check text-amber-500 text-xl" />
                  )}

                  {cardStatus === "pending" && (
                    <i className="fas fa-circle text-gray-600 text-xl" />
                  )}
                </div>

                {card.sigilUrl && (
                  <div className="mb-4 aspect-square bg-black rounded-lg overflow-hidden border border-gray-800">
                    <img
                      src={card.sigilUrl}
                      alt={`Sigil for ${card.harmonicName}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {!card.sigilUrl && cardStatus !== "loading" && (
                  <div className="mb-4 aspect-square bg-gray-950 rounded-lg border border-gray-800 flex items-center justify-center">
                    <i className="fas fa-image text-gray-700 text-4xl" />
                  </div>
                )}

                {cardStatus === "error" && card.error && (
                  <p className="text-xs text-red-400 mb-3">{card.error}</p>
                )}

                <button
                  onClick={() => regenerateSingleCard(card)}
                  disabled={isGenerating || cardStatus === "loading"}
                  className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:cursor-not-allowed text-white text-sm font-light rounded-lg transition-all duration-200"
                >
                  {cardStatus === "loading" ? "Generating..." : "Regenerate"}
                </button>
              </div>
            );
          })}
        </div>

        {cards.length === 0 && !error && (
          <div className="text-center py-16">
            <i className="fas fa-spinner fa-spin text-amber-500 text-4xl mb-4" />
            <p className="text-gray-400">Loading cards...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainComponent;