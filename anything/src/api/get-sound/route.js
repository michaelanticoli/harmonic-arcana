async function handler({ soundId }) {
  if (!soundId) {
    return {
      error: "Please provide a sound ID",
    };
  }

  try {
    const apiKey = process.env.FREESOUND_API_KEY;
    if (!apiKey) {
      return {
        error: "API key not configured",
      };
    }

    const response = await fetch(
      `https://freesound.org/apiv2/sounds/${soundId}/?token=${apiKey}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        return {
          error: "Sound not found",
        };
      }
      throw new Error(`API returned ${response.status}`);
    }

    const sound = await response.json();

    return {
      sound: {
        id: sound.id,
        name: sound.name,
        description: sound.description,
        duration: sound.duration,
        username: sound.username,
        license: sound.license,
        preview_url: sound.previews?.["preview-hq-mp3"],
        download_url: sound.download,
        waveform_url: sound.images?.waveform_m,
        spectral_url: sound.images?.spectral_m,
        num_downloads: sound.num_downloads,
        avg_rating: sound.avg_rating,
        num_ratings: sound.num_ratings,
        tags: sound.tags,
      },
    };
  } catch (error) {
    console.error("Error fetching sound:", error);
    return {
      error: "Failed to fetch sound details",
    };
  }
}
export async function POST(request) {
  return handler(await request.json());
}