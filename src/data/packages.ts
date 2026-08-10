/**
 * Illustrative package pricing for the shoppable cards on the homepage.
 * These figures are placeholders to demonstrate the pricing-card UI —
 * swap in the client's actual per-package rates before this goes live.
 */
export type Package = {
  slug: string;
  name: string;
  title: string;
  duration: string;
  desc: string;
  image: string;
  href: string;
  rating: number;
  badge: string;
  priceFrom: number;
  priceNow: number;
};

export const packages: Package[] = [
  {
    slug: "bhutan",
    name: "Bhutan",
    title: "Kingdom of Happiness Explorer",
    duration: "7 Days & 6 Nights",
    desc: "Paro, Thimphu and Punakha — monasteries, mountain passes, and the Tiger's Nest.",
    image: "/assets/image/Bhutan.jpg",
    href: "/tours/bhutan",
    rating: 4.9,
    badge: "Bestseller",
    priceFrom: 89999,
    priceNow: 74999,
  },
  {
    slug: "nepal",
    name: "Nepal",
    title: "Himalayan Trails & Temples",
    duration: "8 Days & 7 Nights",
    desc: "Kathmandu's temples, Chitwan's jungle, and Pokhara's lakeside calm.",
    image: "/assets/image/Nepal.jpg",
    href: "/tours/nepal",
    rating: 4.8,
    badge: "New",
    priceFrom: 64999,
    priceNow: 52999,
  },
  {
    slug: "india",
    name: "India",
    title: "Golden Triangle Heritage Trail",
    duration: "6 Days & 5 Nights",
    desc: "Delhi, Agra and Jaipur — the Taj Mahal, forts, and royal Rajasthan.",
    image: "/assets/image/Jaipur.webp",
    href: "/tours/india",
    rating: 4.9,
    badge: "Popular",
    priceFrom: 34999,
    priceNow: 27999,
  },
  {
    slug: "kedarnath",
    name: "Kedarnath",
    title: "Sacred Himalayan Pilgrimage",
    duration: "5 Days & 4 Nights",
    desc: "A devotional journey above the clouds to one of the twelve Jyotirlingas.",
    image: "/assets/image/Kedarnath_Temple_in_Rainy_season.jpg",
    href: "/tours/kedarnath",
    rating: 5.0,
    badge: "Pilgrimage",
    priceFrom: 24999,
    priceNow: 19999,
  },
  {
    slug: "paris",
    name: "Paris",
    title: "Romance in the City of Lights",
    duration: "5 Days & 4 Nights",
    desc: "The Eiffel Tower, the Seine, and charming boulevards at every turn.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80",
    href: "/tours/paris",
    rating: 4.7,
    badge: "Featured",
    priceFrom: 179999,
    priceNow: 149999,
  },
];

export function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}
