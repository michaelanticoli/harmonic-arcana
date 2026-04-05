async function handler() {
  try {
    const cards = await sql`
      SELECT 
        id,
        card_number,
        harmonic_name,
        sacred_geometry,
        quantum_property,
        frequency_domain,
        astronomical_body
      FROM major_arcana
      ORDER BY card_number
    `;

    if (!cards || cards.length === 0) {
      return { error: "No major arcana cards found in database" };
    }

    const results = [];
    let successCount = 0;
    let failureCount = 0;

    for (const card of cards) {
      try {
        const prompt = `Mystical sacred geometry sigil symbol, ${card.sacred_geometry} pattern, representing ${card.harmonic_name}, ${card.quantum_property} energy, minimalist geometric design, golden bronze metallic lines and sacred symbols on pure black background, occult mysticism, precise sacred geometry, ethereal glow, arcane symbolism, hermetic tradition, high contrast, centered composition, symmetrical mandala, esoteric knowledge visualization`;

        const negativePrompt = `text, words, letters, numbers, realistic, photographic, human figures, faces, animals, plants, colors other than gold bronze black, busy background, cluttered, messy, blurry, low quality, watermark`;

        const response = await fetch(
          "https://api.stability.ai/v2beta/stable-image/generate/ultra",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
              Accept: "image/*",
            },
            body: JSON.stringify({
              prompt: prompt,
              negative_prompt: negativePrompt,
              aspect_ratio: "1:1",
              output_format: "png",
              seed: card.card_number * 1111,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Stability API error: ${response.status} ${response.statusText}`
          );
        }

        const imageBuffer = await response.arrayBuffer();

        const uploadResult = await upload({ buffer: imageBuffer });

        if (uploadResult.error) {
          throw new Error(`Upload failed: ${uploadResult.error}`);
        }

        await sql`
          UPDATE major_arcana 
          SET sigil_url = ${uploadResult.url}
          WHERE id = ${card.id}
        `;

        successCount++;
        results.push({
          cardNumber: card.card_number,
          harmonicName: card.harmonic_name,
          sigilUrl: uploadResult.url,
          status: "success",
        });
      } catch (cardError) {
        failureCount++;
        results.push({
          cardNumber: card.card_number,
          harmonicName: card.harmonic_name,
          status: "failed",
          error: cardError.message,
        });
      }
    }

    return {
      message: `Sigil generation complete: ${successCount} successful, ${failureCount} failed`,
      totalCards: cards.length,
      successCount,
      failureCount,
      results,
    };
  } catch (error) {
    console.error("Sigil generation error:", error);
    return {
      error: "Failed to generate sigils",
      details: error.message,
    };
  }
}
export async function POST(request) {
  return handler(await request.json());
}