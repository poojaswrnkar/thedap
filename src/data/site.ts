export const site = {
  name: "Next Trip Expedition",
  tagline: "We Make Awesome Tours",
  url: "https://www.nextripexpedition.com",
  logo: "/assets/image/travel-logo.png",
  description:
    "Explore Bhutan, Nepal and India with Next Trip Expedition. Book customized tours, flights, hotels & holiday packages at the best price.",
  keywords: [
    "travel agency India",
    "Bhutan tour",
    "Nepal trekking",
    "India tours",
    "holiday packages",
    "travel booking",
    "tour operator",
  ],
  contact: {
    phone: "9654659085",
    phoneIntl: "+91 9654659085",
    phoneHref: "tel:9654659085",
    hours: "(7 days, 9AM–7PM)",
    workingHours: ["Mon – Sun", "9:00 AM – 7:00 PM"],
    email: "nextripexpedition@gmail.com",
    address: ["Sector-70, Noida,", "Uttar Pradesh – 201301"],
    addressShort: "Sector-70, Noida, UP",
    postal: {
      streetAddress: "Sector-70",
      addressLocality: "Noida",
      addressRegion: "Uttar Pradesh",
      postalCode: "201301",
      addressCountry: "IN",
    },
  },
  socials: [
    { label: "Facebook", href: "#", icon: "facebook" },
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "Twitter", href: "#", icon: "twitter" },
    { label: "YouTube", href: "#", icon: "youtube" },
  ],
} as const;

export const navLinks = [
  { label: "Destinations", href: "/#destinations", icon: "map" },
  { label: "Services", href: "/#services", icon: "bell" },
  { label: "About", href: "/#about", icon: "info" },
  { label: "Contact", href: "/#contact", icon: "mail" },
] as const;

export const footerNav = [
  { label: "Home", href: "/#home" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Services", href: "/#services" },
  { label: "About Us", href: "/#about" },
  { label: "Packages", href: "/#packages" },
] as const;

export const footerDestinations = [
  { label: "India", href: "/tours/india" },
  { label: "Nepal", href: "/tours/nepal" },
  { label: "Bhutan", href: "/tours/bhutan" },
] as const;
