async function handler({ query }) {
  if (!query) {
    return {
      error: "Please provide a search query",
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
      `https://freesound.org/apiv2/search/text/?query=${encodeURIComponent(
        query
      )}&token=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    return {
      results: data.results,
      count: data.count,
      next: data.next,
      previous: data.previous,
    };
  } catch (error) {
    return {
      error: "Failed to search sounds",
    };
  }
}
export async function POST(request) {
  return handler(await request.json());
}