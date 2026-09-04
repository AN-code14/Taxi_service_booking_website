export type Vehicle = {
  id: "sedan" | "hatchback" | "muv" | "suv";
  name: string;
  capacity: string;
  ac: string;
  price: string;
  use: string;
  description: string;
};

export const vehicles: Vehicle[] = [
  { id: "sedan", name: "Sedan", capacity: "4 seats", ac: "A/C & Non-A/C", price: "₹2700", use: "Best for airport transfers", description: "A calm, comfortable choice for couples, families and point-to-point rides." },
  { id: "hatchback", name: "Hatchback", capacity: "4 seats", ac: "A/C & Non-A/C", price: "₹2500", use: "Best for easy city rides", description: "Nimble and economical for getting around Goa's lanes, markets and beaches." },
  { id: "muv", name: "MUV", capacity: "6+1 seats", ac: "A/C", price: "₹3500", use: "Best for family outings and group rides", description: "Extra room for luggage, family travel and comfortable full-day Goa itineraries." },
  { id: "suv", name: "SUV", capacity: "7+1 seats", ac: "A/C", price: "₹4000", use: "Best for groups and tours", description: "Extra room for families, luggage and a full day discovering both coasts." },
];
