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
    image: "https://images.unsplash.com/photo-1742539327294-a050227d15b7?w=2400&q=85&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=2400&q=85&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1545562083-c583d014b4f2?w=2400&q=85&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=2400&q=85&auto=format&fit=crop",
    alt: "Paris",
  },
];

export type StatementBeat = {
  /** The one-word imperative. The full stop is added by the section. */
  word: string;
  /** One supporting line — keep it to a single breath, 8–12 words. */
  line: string;
  image: string;
  alt: string;
  /** `object-position` for the full-bleed crop, e.g. "center 40%". */
  focus?: string;
  /** Optional muted loop. Falls back to `image` on phones, on Save-Data,
   *  on slow connections and for reduced motion. */
  video?: { src: string; poster: string };
};

/**
 * The mood section between the hero and the destinations. Words, lines and
 * imagery are all edited here — the section renders whatever is in this
 * array, in this order, however many entries it has.
 */
export const brandStatement: { eyebrow: string; beats: StatementBeat[] } = {
  eyebrow: "Why we travel",
  beats: [
    {
      word: "Witness",
      line: "A sunrise no photograph has ever done justice.",
      image: "/assets/image/bhutan-scape.png",
      alt: "Golden morning light over the Punakha valley, Bhutan",
      focus: "center 40%",
    },
    {
      word: "Create",
      line: "The stories you'll still be telling twenty years from now.",
      image: "/assets/image/Annapurna.png",
      alt: "Trekkers on the trail beneath the Annapurna range, Nepal",
      focus: "center 45%",
    },
    {
      word: "Listen",
      line: "Temple bells, market chatter, a language you don't yet speak.",
      image: "/assets/image/Kathmandu.png",
      alt: "Kathmandu Durbar Square alive with people at midday",
    },
    {
      word: "Savour",
      line: "Long lunches, warm spice, and nowhere to be afterwards.",
      // Cropped wide at source — the original is portrait, and letting the
      // browser crop a portrait to full-bleed leaves an unreadable close-up.
      image:
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=2400&h=1200&q=85&auto=format&fit=crop",
      alt: "Bowls of curry and rice shared around a table",
    },
    {
      word: "Breathe",
      line: "Thin mountain air, and nothing at all on the schedule.",
      image: "/assets/image/Pokhara.png",
      alt: "Still morning on Phewa Lake, Pokhara",
      focus: "center 60%",
    },
  ],
};

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
    image: "https://images.unsplash.com/photo-1742539327294-a050227d15b7?w=1400&q=85&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1400&q=85&auto=format&fit=crop",
    alt: "Sunrise over Annapurna range, Nepal",
    href: "/tours/nepal",
    badge: { label: "New", kind: "new" },
  },
  {
    slug: "india",
    name: "India",
    region: "South Asia",
    desc: "From Kerala's backwaters to Rajasthan's forts — a vibrant tapestry of culture.",
    image: "https://images.unsplash.com/photo-1545562083-c583d014b4f2?w=1400&q=85&auto=format&fit=crop",
    alt: "Colorful Holi festival in India",
    href: "/tours/india",
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
  image: "https://images.unsplash.com/photo-1576737064520-f45d313d17ff?w=1400&q=85&auto=format&fit=crop",
  alt: "Flatlay of a vintage camera, passport, map and travel journal",
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

export type ProgramCategory = {
  /** Bold lead-in — the name of the circuit or experience. */
  title: string;
  /** One line of what it covers. */
  desc: string;
};

export type ProgramGroup = {
  label: string;
  icon:
    | "classic"
    | "specialty"
    | "trekking"
    | "aerial"
    | "pilgrimage"
    | "wildlife"
    | "festival"
    | "luxury"
    | "active";
  items: ProgramCategory[];
};

export type TripProgram = {
  id: string;
  name: string;
  /** Short line under the country name on its banner. */
  tagline: string;
  image: string;
  alt: string;
  /** The country's own tour page, where one exists. */
  href?: string;
  groups?: ProgramGroup[];
  /** Used instead of `groups` where nothing is off the shelf. */
  bespoke?: { headline: string; intro: string; body: string; places: string[] };
};

/**
 * What we actually run, by country, in the order the homepage shows them.
 * Adding a category is one entry in `items`; adding a country is one entry
 * here and it picks up its own tab.
 */
export const tripPrograms: TripProgram[] = [
  {
    id: "india",
    name: "India",
    tagline: "A thousand cultures, one soul",
    image:
      "https://images.unsplash.com/photo-1545562083-c583d014b4f2?w=2000&q=85&auto=format&fit=crop",
    alt: "The Taj Mahal reflected in its watercourse at dawn, Agra",
    href: "/tours/india",
    groups: [
      {
        label: "Classic & Iconic Circuits",
        icon: "classic",
        items: [
          {
            title: "The Golden Triangle & Beyond",
            desc: "Delhi, Agra, Jaipur — extending to Varanasi or Udaipur.",
          },
          {
            title: "South India Cultural Highlights",
            desc: "Tamil Nadu's temple architecture paired with Kerala's backwaters and spice plantations.",
          },
          {
            title: "Leh-Ladakh, Himachal, Sikkim & Darjeeling",
            desc: "For scenic and mountain landscapes.",
          },
        ],
      },
      {
        label: "Specialty & Experiential Journeys",
        icon: "specialty",
        items: [
          {
            title: "Palace, Heritage & Luxury",
            desc: "Staying in converted royal palaces, heritage havelis, or taking luxury trains (e.g. Maharajas' Express).",
          },
          {
            title: "Wildlife & Conservation Safaris",
            desc: "Jeep safaris in Ranthambore, Bandhavgarh, Panna, or Jim Corbett for wildlife enthusiasts.",
          },
          {
            title: "Spiritual & Wellness Retreats",
            desc: "Authentic Ayurveda in Kerala, yoga immersions in Rishikesh, or sacred spiritual trails along the Ganges.",
          },
          {
            title: "Living Culture, Crafts & Rural India",
            desc: "Artisan visits (craft villages, textile weaving, pottery), community-led tourism, and rural artisan initiatives.",
          },
          {
            title: "Culinary & Spice Routes",
            desc: "Chef-led street food walks, regional cooking masterclasses, and spice garden tours.",
          },
        ],
      },
    ],
  },
  {
    id: "nepal",
    name: "Nepal",
    tagline: "Ancient culture meets towering peaks",
    image:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=2000&q=85&auto=format&fit=crop",
    alt: "Sunrise over the Annapurna range, Nepal",
    href: "/tours/nepal",
    groups: [
      {
        label: "Classic Cultural & Scenic Highlights",
        icon: "classic",
        items: [
          {
            title: "The Golden Triangle of Nepal",
            desc: "Kathmandu Valley (Patan, Bhaktapur, Swayambhunath), Pokhara (Phewa Lake, Sarangkot views) and Chitwan National Park.",
          },
          {
            title: "Lumbini & Sacred Buddhist Circuit",
            desc: "Birthplace of Lord Buddha, ancient monasteries, and tranquility trails.",
          },
          {
            title: "Hill Stations & Mountain Views",
            desc: "Nagarkot, Dhulikhel and Bandipur for panoramic Himalayan views without demanding multi-day treks.",
          },
        ],
      },
      {
        label: "Trekking & Mountain Expeditions",
        icon: "trekking",
        items: [
          {
            title: "Iconic Himalayan Treks",
            desc: "Everest Base Camp (EBC), Annapurna Circuit, and Annapurna Base Camp (ABC) for active global trekkers.",
          },
          {
            title: "Soft & Short Treks",
            desc: "Ghorepani Poon Hill or Annapurna Foothills (4–7 days) for families or travellers wanting high views with moderate effort.",
          },
          {
            title: "Offbeat & Remote Trails",
            desc: "Langtang Valley, Manaslu Circuit, or Upper Mustang for experienced travellers seeking fewer crowds.",
          },
        ],
      },
      {
        label: "Luxury Escapes & Aerial Tours",
        icon: "aerial",
        items: [
          {
            title: "Heli-Tours & Mountain Flights",
            desc: "One-hour scenic Everest flights from Kathmandu, or helicopter breakfasts at Everest Base Camp / Kala Patthar.",
          },
          {
            title: "Boutique & Heritage Stays",
            desc: "Luxury lodges in Dhulikhel, luxury camps in Pokhara, and high-end mountain resorts with private views.",
          },
        ],
      },
      {
        label: "Pilgrimage & Spiritual Journeys",
        icon: "pilgrimage",
        items: [
          {
            title: "Muktinath & Pashupatinath Yatra",
            desc: "High-demand routes for pilgrims and heritage travellers, by charter helicopter or overland transfer.",
          },
          {
            title: "Monastery Immersion & Meditation",
            desc: "Yoga retreats in Pokhara and monastery stays with morning chanting and mindfulness sessions.",
          },
        ],
      },
      {
        label: "Wildlife Safaris & Soft Adventure",
        icon: "wildlife",
        items: [
          {
            title: "Subtropical Jungle Safaris",
            desc: "One-horned rhino and Royal Bengal tiger tracking in Chitwan or Bardia National Park — jeep, canoe and walking safaris.",
          },
          {
            title: "Thrill & White-Water Rafting",
            desc: "Trishuli or Bhote Koshi rafting, paragliding in Pokhara, and zip-lining.",
          },
        ],
      },
    ],
  },
  {
    id: "bhutan",
    name: "Bhutan",
    tagline: "Where mountains touch the sky",
    image:
      "https://images.unsplash.com/photo-1742539327294-a050227d15b7?w=2000&q=85&auto=format&fit=crop",
    alt: "Mist-covered monastery in Paro Valley, Bhutan",
    href: "/tours/bhutan",
    groups: [
      {
        label: "Classic Cultural Highlights",
        icon: "classic",
        items: [
          {
            title: "Essential Bhutan — Paro, Thimphu & Punakha",
            desc: "Iconic Tiger's Nest (Paro Taktsang), Punakha Dzong, the Suspension Bridge, Buddha Dordenma and Tashichho Dzong.",
          },
          {
            title: "Western & Central Valleys — Phobjikha & Bumthang",
            desc: "Black-necked crane habitat in Phobjikha Valley, the ancient temples of Bumthang, and traditional farmstays.",
          },
        ],
      },
      {
        label: "Cultural Festivals & Tsechus",
        icon: "festival",
        items: [
          {
            title: "Festival Tours — Paro, Thimphu & Punakha Tshechus",
            desc: "Colourful masked dances (Cham), spiritual blessings, the unfurling of giant Thangka tapestries (Thongdrel), and authentic local dress traditions.",
          },
        ],
      },
      {
        label: "Ultra-Luxury & Wellness Retreats",
        icon: "luxury",
        items: [
          {
            title: "Luxury Valleys Circuit",
            desc: "Featured stays at Six Senses, Amankora, Como Uma or Le Méridien, with private transfers, personalised blessings by monks, and private hot-stone baths.",
          },
          {
            title: "Himalayan Wellness & Mindfulness",
            desc: "Traditional Sowa Rigpa herbal therapy, Dotsho (Bhutanese hot-stone baths), outdoor yoga over mountain valleys, and meditation in monasteries.",
          },
        ],
      },
      {
        label: "Active & Experiential Travel",
        icon: "active",
        items: [
          {
            title: "Gross National Happiness & Rural Living",
            desc: "Farmstay visits, butter tea brewing, archery lessons (the national sport), and meetings with local monks and artisans.",
          },
          {
            title: "Mountain Biking & White-Water Rafting",
            desc: "Gentle rafting along the Pho Chhu and Mo Chhu rivers in Punakha.",
          },
        ],
      },
    ],
  },
  {
    id: "beyond",
    name: "Beyond South Asia",
    tagline: "Every journey is uniquely yours",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?w=2000&q=85&auto=format&fit=crop",
    alt: "Golden temple rooftops under a bright sky in Thailand",
    bespoke: {
      headline: "Beyond South Asia, Every Journey is Uniquely Yours.",
      intro: "For international destinations including Vietnam, Bali, Thailand & beyond:",
      body: "We craft fully customized itineraries tailored to your exact preferences, travel style and pace. Let us know your dream destination, and our travel specialists will curate a personalized travel program tailored specifically for you.",
      places: ["Vietnam", "Bali", "Thailand", "& Beyond"],
    },
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

export const destinationOptions = ["Bhutan", "Nepal", "India", "Other"];

export const marqueeWords = [
  "Bhutan",
  "Nepal",
  "India",
  "Pokhara",
  "Thimphu",
  "Varanasi",
  "Darjeeling",
  "Goa",
  "Bali",
];
