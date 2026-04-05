"use client";
import React from "react";
import * as ChakraUI from '@chakra-ui/react';
import * as ShadcnUI from '@/design-libraries/shadcn-ui';


export default function Index() {
  return (function MainComponent({ initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [playingSound, setPlayingSound] = useState(null);
  const [audioElement, setAudioElement] = useState(null);
  const [loadingSoundIds, setLoadingSoundIds] = useState(new Set());

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const audio = new Audio();
    audio.addEventListener("ended", () => setPlayingSound(null));
    setAudioElement(audio);
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/search-freesound", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: debouncedQuery }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch results");
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setResults(data.results || []);
      } catch (err) {
        setError(err.message);
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  const handlePlay = async (soundId) => {
    try {
      if (playingSound === soundId) {
        audioElement.pause();
        setPlayingSound(null);
        return;
      }

      setLoadingSoundIds((prev) => new Set(prev).add(soundId));

      const response = await fetch("/api/get-sound", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ soundId }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (audioElement) {
        audioElement.src = data.sound.preview_url;
        await audioElement.play();
        setPlayingSound(soundId);
      }
    } catch (err) {
      console.error("Error playing sound:", err);
      setError("Failed to play sound");
    } finally {
      setLoadingSoundIds((prev) => {
        const next = new Set(prev);
        next.delete(soundId);
        return next;
      });
    }
  };

  const handleDownload = async (soundId) => {
    try {
      setLoadingSoundIds((prev) => new Set(prev).add(soundId));

      const response = await fetch("/api/get-sound", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ soundId }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      window.open(data.sound.download_url, "_blank");
    } catch (err) {
      console.error("Error initiating download:", err);
      setError("Failed to initiate download");
    } finally {
      setLoadingSoundIds((prev) => {
        const next = new Set(prev);
        next.delete(soundId);
        return next;
      });
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-[#0A0A0A] font-inter">
      <div className="mb-8">
        <h2 className="text-3xl md:text-5xl font-thin text-white mb-6 tracking-[-0.02em] text-center">
          SONIC
          <span className="block text-[#E2C17B]">EXPLORATION</span>
        </h2>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for harmonic frequencies..."
          className="w-full px-6 py-4 text-white bg-[#1A1A1A] border border-[#E2C17B]/20 focus:outline-none focus:border-[#E2C17B] transition-all duration-300 font-inter font-light tracking-[0.02em]"
          name="search"
        />
      </div>

      {error && (
        <div className="p-6 mb-8 text-[#E2C17B] bg-[#1A1A1A] border border-[#E2C17B]/20 font-inter font-light">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array.from({ length: 6 })].map((_, i) => (
            <div
              key={i}
              className="p-6 border border-[#E2C17B]/10 bg-[#1A1A1A] animate-pulse"
            >
              <div className="h-4 bg-[#E2C17B]/20 w-3/4 mb-4"></div>
              <div className="h-4 bg-[#E2C17B]/20 w-1/2 mb-4"></div>
              <div className="h-4 bg-[#E2C17B]/20 w-1/4"></div>
            </div>
          ))}
        </div>
      ) : results.length === 0 && query ? (
        <div className="text-center py-20">
          <p className="text-white/60 font-inter font-extralight text-lg tracking-[0.02em]">
            No harmonic frequencies found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((sound) => (
            <div
              key={sound.id}
              className="p-6 border border-[#E2C17B]/10 bg-[#1A1A1A] hover:border-[#E2C17B]/30 hover:translate-y-[-2px] transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-white font-inter font-extralight text-lg tracking-[-0.01em] line-clamp-2 group-hover:text-[#E2C17B] transition-colors duration-300">
                  {sound.name}
                </h3>
                <div className="flex space-x-3 ml-4">
                  <button
                    onClick={() => handlePlay(sound.id)}
                    disabled={loadingSoundIds.has(sound.id)}
                    className="p-3 text-white hover:text-[#E2C17B] hover:bg-[#E2C17B]/10 transition-all duration-300 disabled:opacity-50"
                    aria-label={
                      playingSound === sound.id ? "Pause sound" : "Play sound"
                    }
                  >
                    {loadingSoundIds.has(sound.id) ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : playingSound === sound.id ? (
                      <i className="fas fa-pause"></i>
                    ) : (
                      <i className="fas fa-play"></i>
                    )}
                  </button>
                  <button
                    onClick={() => handleDownload(sound.id)}
                    disabled={loadingSoundIds.has(sound.id)}
                    className="p-3 text-white hover:text-[#E2C17B] hover:bg-[#E2C17B]/10 transition-all duration-300 disabled:opacity-50"
                    aria-label="Download sound"
                  >
                    {loadingSoundIds.has(sound.id) ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      <i className="fas fa-download"></i>
                    )}
                  </button>
                </div>
              </div>
              <div className="text-sm text-[#E2C17B]/60 font-inter font-light tracking-[0.1em] uppercase">
                by {sound.username}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StoryComponent() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <MainComponent />
    </div>
  );
});
}