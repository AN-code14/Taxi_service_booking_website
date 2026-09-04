export type PackageStop = { name: string; description: string };
export type TourPackage = { slug: "north-goa" | "south-goa"; name: string; eyebrow: string; summary: string; stops: PackageStop[]; bestTime: string; prices: string[] };

export const packages: TourPackage[] = [
  { slug: "north-goa", name: "North Goa day tour", eyebrow: "The coast, old forts & sunset water", summary: "A full day of North Goa's essential views, from Aguada's ramparts to a slow boat cruise.", bestTime: "October to May is ideal for clear sea views and comfortable beach stops.", prices: ["₹2700", "₹2500", "₹3500", "₹4000"], stops: [
    { name: "Fort Aguada", description: "Walk the historic ramparts and look out across the Arabian Sea." },
    { name: "Dolphin Show", description: "A lively coastal stop for spotting dolphins and taking in the water." },
    { name: "Vagator Beach", description: "Red cliffs, laterite rock and a quieter stretch of North Goa coast." },
    { name: "Anjuna Beach", description: "A relaxed beach pause with Goa's unmistakable bohemian character." },
    { name: "Calangute Beach", description: "See the energy of Goa's best-known beach and its broad shoreline." },
    { name: "Boat Cruise", description: "Finish with music, river air and sunset views from the Mandovi." },
  ] },
  { slug: "south-goa", name: "South Goa day tour", eyebrow: "Heritage, temples & wide beaches", summary: "A considered route through Goa's cultural landmarks, finishing beside the long sands of Colva.", bestTime: "November to March brings gentle weather for heritage walks and beach time.", prices: ["₹2700", "₹2500", "₹3500", "₹4000"], stops: [
    { name: "Dona Paula", description: "Take in the peninsula viewpoint where the Mandovi meets the sea." },
    { name: "Miramar Beach", description: "A breezy golden-sand stop close to Panjim's riverside heart." },
    { name: "Old Goa Church", description: "Spend time with the remarkable baroque churches and living history." },
    { name: "Mangeshi Temple", description: "Visit one of Goa's most graceful and enduring temple complexes." },
    { name: "Shantadurga Temple", description: "A peaceful cultural stop surrounded by the Ponda countryside." },
    { name: "Colva Beach", description: "Unwind on South Goa's broad, palm-fringed coastline." },
  ] },
];

export const inclusions = ["A/C car", "Experienced driver", "Fuel", "Tolls"];
export const exclusions = ["Entry tickets", "Food and drinks", "Personal expenses", "Optional activities"];
