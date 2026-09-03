export const site = {
  name: "RSK Tours and Travels",
  tagline: "Your trusted taxi service in Goa",
  phone: "7318387987",
  whatsapp: "8830576443",
  email: "rsk",
  address: "{{GOA_BUSINESS_ADDRESS}}",
  mapEmbed: "{{GOOGLE_MAP_EMBED_URL}}",
  hours: "Available 24/7 for advance bookings",
  serviceArea: "North Goa, South Goa and airport transfers",
  googleInteractions: "257+",
};

export function whatsappLink(message = "Hello RSK Tours and Travels, I would like to enquire about a ride in Goa.", number = site.whatsapp) {
  return `https://wa.me/${number.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
}

export function phoneLink() {
  return `tel:${site.phone.replace(/[^+0-9]/g, "")}`;
}
