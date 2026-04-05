async function handler() {
  try {
    const cards = await sql`
      SELECT 
        card_number,
        traditional_name,
        harmonic_name,
        frequency_domain,
        sacred_geometry,
        quantum_property,
        musical_note,
        color_wavelength,
        astronomical_body,
        vibrational_state,
        sigil_url
      FROM major_arcana
      ORDER BY card_number
    `;

    const formattedCards = cards.map((card) => ({
      number: card.card_number,
      traditionalName: card.traditional_name,
      harmonicName: card.harmonic_name,
      frequency: card.frequency_domain,
      geometry: card.sacred_geometry,
      quantum: card.quantum_property,
      note: card.musical_note,
      wavelength: card.color_wavelength,
      astro: card.astronomical_body,
      vibration: card.vibrational_state,
      sigilUrl: card.sigil_url,
    }));

    return { cards: formattedCards };
  } catch (error) {
    console.error("Error fetching major arcana:", error);
    return { error: "Failed to fetch cards" };
  }
}
export async function POST(request) {
  return handler(await request.json());
}