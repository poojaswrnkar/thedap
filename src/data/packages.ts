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
    image: "https://images.unsplash.com/photo-1742539327294-a050227d15b7?w=1400&q=85&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1400&q=85&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1545562083-c583d014b4f2?w=1400&q=85&auto=format&fit=crop",
    href: "/tours/india",
    rating: 4.9,
    badge: "Popular",
    priceFrom: 34999,
    priceNow: 27999,
  },
];

export function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}
