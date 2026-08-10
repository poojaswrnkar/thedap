export type HeroSlide = {
  id: string;
  tag: string;
  tagIcon: "dragon" | "mountain" | "om" | "glass";
  /** The oversized editorial name shown as the hero's centerpiece. */
  bigName: string;
  /** Short poetic line under the big name. */
  tagline: string;
  titleLines: { text: string; accent?: boolean }[];
  desc: string;
  meta: { icon: string; label: string }[];
  image: string;
  alt: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "bhutan",
    tag: "Land of Thunder Dragon",
    tagIcon: "dragon",
    bigName: "Bhutan",
    tagline: "Where mountains touch the sky",
    titleLines: [
      { text: "Discover" },
      { text: "Bhutan's", accent: true },
      { text: "Timeless Beauty" },
    ],
    desc: "Nestled in the Himalayas, where Gross National Happiness takes precedence over everything else on earth.",
    meta: [
      { icon: "clock", label: "7–10 Days" },
      { icon: "users", label: "Group & Private" },
      { icon: "star", label: "4.9 / 5" },
    ],
    image: "/assets/image/bhutanvideo-poster.jpg",
    alt: "Bhutan",
  },
  {
    id: "nepal",
    tag: "The Himalayan Kingdom",
    tagIcon: "mountain",
    bigName: "Nepal",
    tagline: "Ancient culture meets towering peaks",
    titleLines: [{ text: "Nepal's", accent: true }, { text: "Sacred" }, { text: "Mountains" }],
    desc: "Ancient culture meets towering peaks — a once-in-a-lifetime adventure soaring above the clouds.",
    meta: [
      { icon: "clock", label: "8–12 Days" },
      { icon: "hiking", label: "Trekking Tours" },
      { icon: "star", label: "4.8 / 5" },
    ],
    image: "/assets/image/nepal-poster.jpg",
    alt: "Nepal",
  },
  {
    id: "india",
    tag: "Incredible Diversity",
    tagIcon: "om",
    bigName: "India",
    tagline: "A thousand cultures, one soul",
    titleLines: [{ text: "The Soul of" }, { text: "India", accent: true }, { text: "Awaits You" }],
    desc: "Vibrant traditions, colorful festivals, and a rich heritage spread across a thousand cultures.",
    meta: [
      { icon: "clock", label: "5–14 Days" },
      { icon: "landmark", label: "Cultural Tours" },
      { icon: "star", label: "4.9 / 5" },
    ],
    image: "/assets/image/Jaipur.webp",
    alt: "India",
  },
  {
    id: "paris",
    tag: "City of Light",
    tagIcon: "glass",
    bigName: "Paris",
    tagline: "Every evening feels enchanted",
    titleLines: [{ text: "Enchanting" }, { text: "Evenings" }, { text: "in Paris", accent: true }],
    desc: "From the Eiffel Tower to charming boulevards — the most dreamy escape in all of Europe awaits.",
    meta: [
      { icon: "clock", label: "4–7 Days" },
      { icon: "heart", label: "Iconic views" },
      { icon: "star", label: "4.7 / 5" },
    ],
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=2400&q=85",
    alt: "Paris",
  },
];

export type Destination = {
  slug: string;
  name: string;
  region: string;
  desc: string;
  image: string;
  alt: string;
  href: string;
  featured?: boolean;
  badge?: { label: string; kind: "featured" | "new" | "popular" | "spiritual" };
  stats?: { icon: string; label: string }[];
};

export const destinations: Destination[] = [
  {
    slug: "bhutan",
    name: "Bhutan",
    region: "South Asia",
    desc: "The Land of Thunder Dragon — ancient monasteries, mindful living, and untouched Himalayan beauty.",
    image: "/assets/image/Bhutan.jpg",
    alt: "Mist-covered monastery in Paro Valley, Bhutan",
    href: "/tours/bhutan",
    featured: true,
    badge: { label: "Featured", kind: "featured" },
    stats: [
      { icon: "mountain", label: "Himalayas" },
      { icon: "temp", label: "15°C" },
    ],
  },
  {
    slug: "nepal",
    name: "Nepal",
    region: "South Asia",
    desc: "Trek to Everest Base Camp or wander Kathmandu's ancient temples.",
    image: "/assets/image/Nepal.jpg",
    alt: "Sunrise over Annapurna range, Nepal",
    href: "/tours/nepal",
    badge: { label: "New", kind: "new" },
  },
  {
    slug: "paris",
    name: "Paris",
    region: "Europe",
    desc: "Art, cuisine, and timeless romance beneath the City of Lights.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80",
    alt: "Eiffel Tower at sunset, Paris",
    href: "/tours/paris",
    badge: { label: "Popular", kind: "popular" },
  },
  {
    slug: "india",
    name: "India",
    region: "South Asia",
    desc: "From Kerala's backwaters to Rajasthan's forts — a vibrant tapestry of culture.",
    image: "/assets/image/Jaipur.webp",
    alt: "Colorful Holi festival in India",
    href: "/tours/india",
  },
  {
    slug: "kedarnath",
    name: "Kedarnath",
    region: "Uttarakhand",
    desc: "A sacred Himalayan pilgrimage above the clouds — where devotion meets nature.",
    image: "/assets/image/Kedarnath_Temple_in_Rainy_season.jpg",
    alt: "Kedarnath temple with snow-capped peaks",
    href: "/tours/kedarnath",
    badge: { label: "Pilgrimage", kind: "spiritual" },
  },
];

export const services = [
  {
    n: "01",
    name: "Hotel Booking",
    desc: "From budget stays to luxury resorts — curated options worldwide for every preference and budget.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85",
    alt: "Luxury Hotel",
  },
  {
    n: "02",
    name: "Flight Booking",
    desc: "Best deals on domestic and international flights with flexible scheduling and seat options.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=85",
    alt: "Flight Booking",
  },
  {
    n: "03",
    name: "Family Getaways",
    desc: "Memorable and safe retreats crafted for the whole family — fun for every age group.",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200&q=85",
    alt: "Family Vacation",
  },
  {
    n: "04",
    name: "24/7 Support",
    desc: "Round-the-clock expert assistance wherever you are — we're always just a call away.",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=85",
    alt: "Customer Support",
  },
];

export const about = {
  label: "Who We Are",
  title: ["About", "Next Trip", "Expedition"],
  image: "/assets/image/people.png",
  alt: "Traveler on adventure",
  paragraphs: [
    "We provide extensive travel services to craft perfect holiday solutions. Driven by a passionate team, we assure exclusive itineraries, smart travel choices, and highly competitive prices.",
    "Every journey is personal — we listen, we plan, and we deliver experiences that go far beyond the ordinary.",
  ],
};

export const companyStats = [
  { num: "500+", label: "Happy Travellers", icon: "users" },
  { num: "30+", label: "Destinations", icon: "pin" },
  { num: "4.9", label: "Avg Rating", icon: "star" },
  { num: "10+", label: "Years Experience", icon: "award" },
] as const;

export const whyUs = {
  eyebrow: "Why Next Trip Expedition",
  headline: ["Travel the way", "it should feel."],
  benefits: [
    {
      title: "100% Tailored",
      desc: "No two trips are the same. Every itinerary is built around your pace, preferences and budget.",
    },
    {
      title: "Best Price Guarantee",
      desc: "We match any lower price you find — the best deals, always guaranteed. No hidden fees.",
    },
    {
      title: "24/7 On-Ground Support",
      desc: "A real expert is just a call away — before, during and after your trip.",
    },
    {
      title: "500+ Happy Travellers",
      desc: "Rated 4.9/5. Our travellers come back — and send their families too.",
    },
  ],
};

export type Trip = {
  type: string;
  typeIcon: "plane" | "car" | "bus" | "train" | "hiking";
  from: { city: string; image: string };
  to: { city: string; image: string };
  meta: { icon: string; label: string }[];
};

export const tripTabs: { id: string; label: string; icon: "dragon" | "mountain" | "om"; trips: Trip[] }[] = [
  {
    id: "bhutan",
    label: "From Bhutan",
    icon: "dragon",
    trips: [
      {
        type: "Flight",
        typeIcon: "plane",
        from: { city: "Bhutan", image: "/assets/image/monument/bhutan.jpg" },
        to: { city: "Delhi", image: "/assets/image/monument/delhi.jpg" },
        meta: [
          { icon: "clock", label: "2h 30m" },
          { icon: "calendar", label: "Daily" },
        ],
      },
      {
        type: "Flight",
        typeIcon: "plane",
        from: { city: "Bhutan", image: "/assets/image/monument/bhutan.jpg" },
        to: { city: "Bali", image: "/assets/image/monument/Bali.jpg" },
        meta: [
          { icon: "clock", label: "8h 15m" },
          { icon: "rotate", label: "3x/week" },
        ],
      },
      {
        type: "Road Trip",
        typeIcon: "car",
        from: { city: "Bhutan", image: "/assets/image/monument/bhutan.jpg" },
        to: { city: "Darjeeling", image: "/assets/image/monument/Darjeeling.jpg" },
        meta: [
          { icon: "clock", label: "6h Drive" },
          { icon: "mountain", label: "Scenic" },
        ],
      },
      {
        type: "Flight",
        typeIcon: "plane",
        from: { city: "Bhutan", image: "/assets/image/monument/bhutan.jpg" },
        to: { city: "Goa", image: "/assets/image/monument/Goa.jpg" },
        meta: [
          { icon: "clock", label: "4h 10m" },
          { icon: "sun", label: "Seasonal" },
        ],
      },
    ],
  },
  {
    id: "nepal",
    label: "To Nepal",
    icon: "mountain",
    trips: [
      {
        type: "Overland",
        typeIcon: "bus",
        from: { city: "Delhi", image: "/assets/image/monument/delhi.jpg" },
        to: { city: "Nepal", image: "/assets/image/monument/nepal.jpg" },
        meta: [
          { icon: "clock", label: "12h" },
          { icon: "road", label: "Direct" },
        ],
      },
      {
        type: "Flight",
        typeIcon: "plane",
        from: { city: "Bangkok", image: "/assets/image/monument/Bangkok.jpg" },
        to: { city: "Nepal", image: "/assets/image/monument/nepal.jpg" },
        meta: [
          { icon: "clock", label: "3h 15m" },
          { icon: "plane", label: "Daily" },
        ],
      },
    ],
  },
  {
    id: "india",
    label: "Across India",
    icon: "om",
    trips: [
      {
        type: "Train",
        typeIcon: "train",
        from: { city: "Delhi", image: "/assets/image/monument/delhi.jpg" },
        to: { city: "Agra & Jaipur", image: "/assets/image/monument/agara.jpg" },
        meta: [
          { icon: "clock", label: "6 Days" },
          { icon: "landmark", label: "Heritage" },
        ],
      },
      {
        type: "Pilgrimage",
        typeIcon: "hiking",
        from: { city: "Delhi", image: "/assets/image/monument/delhi.jpg" },
        to: { city: "Kedarnath", image: "/assets/image/Kedarnath_Temple_in_Rainy_season.jpg" },
        meta: [
          { icon: "clock", label: "7 Days" },
          { icon: "mountain", label: "Sacred" },
        ],
      },
    ],
  },
];

export const dreamingSlides = [
  { label: "City", image: "/assets/image/Destination/CityDestination.png", alt: "City Destination" },
  { label: "Mountain", image: "/assets/image/Destination/Mountain-Destination.png", alt: "Mountain Destination" },
  { label: "Beach", image: "/assets/image/Destination/Beach-Destination.png", alt: "Beach Destination" },
  { label: "Heritage", image: "/assets/image/Destination/Heritage-Destination.png", alt: "Heritage Destination" },
  { label: "Island", image: "/assets/image/Destination/Island-Destination.png", alt: "Island Destination" },
];

export const dreamingFeatures = [
  "Explore Your Options",
  "Customize Your Experience",
  "Expert Support",
  "Travel with Confidence",
];

export const ctaBanner = {
  title: ["Never Stop Looking for", "New Emotions"],
  sub: "Ignite curiosity, unlock unforgettable journeys, and create memories that last a lifetime.",
  video: "/assets/image/travel.mp4",
};

export const destinationOptions = ["Bhutan", "Nepal", "India", "Paris", "Kedarnath", "Other"];

export const marqueeWords = [
  "Bhutan",
  "Nepal",
  "India",
  "Paris",
  "Kedarnath",
  "Pokhara",
  "Thimphu",
  "Varanasi",
  "Darjeeling",
  "Goa",
  "Bali",
];
