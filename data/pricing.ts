export const localHireRates = {
  sedan: "₹2700",
  hatchback: "₹2500",
  muv: "₹3500",
  suv: "₹4000",
} as const;

export const extraKmPricingNote = "8 hours / 80 km included — ₹20 per extra km";

export const airportPickupDropRates = {
  hatchback: "₹2500",
  sedan: "₹2700",
  muv: "₹3500",
  suv: "₹4000",
} as const;

export const localHireVehicleOrder = ["sedan", "hatchback", "muv", "suv"] as const;
export const airportVehicleOrder = ["hatchback", "sedan", "muv", "suv"] as const;
