async function handler({ imageUrl, cardId }) {
  if (!imageUrl || !cardId) {
    return {
      error: "Missing required parameters: imageUrl and cardId are required",
      success: false,
    };
  }

  try {
    await sql("UPDATE major_arcana SET sigil_url = $1 WHERE card_number = $2", [
      imageUrl,
      cardId,
    ]);

    return {
      success: true,
      imageUrl: imageUrl,
      cardId: cardId,
      message: `Sigil URL updated successfully for card ${cardId}`,
    };
  } catch (error) {
    console.error(`Error updating sigil for card ${cardId}:`, error);
    return {
      error: error.message || "Failed to update sigil URL",
      success: false,
      cardId: cardId,
    };
  }
}
export async function POST(request) {
  return handler(await request.json());
}