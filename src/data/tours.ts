export type City = {
  kicker: string;
  name: string;
  desc: string;
  highlights: string[];
  image: string;
};

export type Day = {
  day: string;
  title: string;
  subtitle: string;
  note: string;
  image: string;
};

export type Tour = {
  slug: string;
  name: string;
  /** Set when the original site had no dedicated page for this destination. */
  preview?: boolean;
  meta: { title: string; description: string };
  hero: {
    titleLines: string[];
    highlight: string;
    subtitle: string;
    video?: string;
    poster: string;
  };
  intro: {
    label: string;
    titleGold: string;
    titleBlue: string;
    heading: string;
    paragraphs: string[];
    image: string;
    stats: { value: string; label: string }[];
  };
  citiesSection: { label: string; titleGold: string; titleBlue: string; subtitle: string };
  cities: City[];
  itinerary: Day[];
  tripsIntro: { label: string; titleGold: string; titleBlue: string; subtitle: string };
};

export const tours: Tour[] = [
  {
    slug: "bhutan",
    name: "Bhutan",
    meta: {
      title: "Explore Bhutan — Luxury Tours & Himalayan Adventures",
      description:
        "Discover Bhutan with Next Trip Expedition — Tiger's Nest, Thimphu, Paro, Punakha and Jakar on curated Himalayan itineraries.",
    },
    hero: {
      titleLines: ["Never Stop Looking for"],
      highlight: "New Emotions",
      subtitle:
        "Ignite curiosity, unlock unforgettable journeys, and create memories that last a lifetime.",
      video: "/assets/image/bhutanvideo.mp4",
      poster: "/assets/image/bhutanvideo-poster.jpg",
    },
    intro: {
      label: "About Bhutan",
      titleGold: "A Kingdom",
      titleBlue: "Preserved in Time",
      heading: "Traditions & Culture",
      paragraphs: [
        "Traditions are fiercely guarded and the claws of excessive commercialization or so-called development are kept at bay. The dense jungles, gigantic mountain passes, verdant valleys, endearing little hamlets, rolling farmlands and rice-terraced hill slopes make the heart sing with joy.",
        "The landscape is punctuated by dzongs (fortresses), chortens (shrines) and other captivating bits of local architecture. Just one of the many such sights is the Tiger's Nest – this white-washed monastery perilously clings to a rock face at a vertiginous height overlooking deep yawning valleys.",
      ],
      image: "https://images.unsplash.com/photo-1743402064016-0f53da373724?w=1400&q=85&auto=format&fit=crop",
      stats: [
        { value: "72%", label: "Forest Cover" },
        { value: "#1", label: "Happy Nation" },
        { value: "7,000m", label: "Peak Altitude" },
        { value: "Snowman", label: "Hardest Trek" },
      ],
    },
    citiesSection: {
      label: "Explore Key Cities",
      titleGold: "Discover Bhutan's",
      titleBlue: "Destinations",
      subtitle: "Discover the unique charm of each destination across this mystical kingdom",
    },
    cities: [
      {
        kicker: "Capital City",
        name: "Thimphu",
        desc: "Bhutan's capital, Thimphu, is one of the world's most scenic capitals. It's also a great place to experience Bhutanese culture, with its traditional arts and crafts, architecture, and cuisine.",
        highlights: ["Buddha Dordenma", "Memorial Chorten", "Weekend Market"],
        image: "https://images.unsplash.com/photo-1553027803-884b4628863f?w=1200&q=85&auto=format&fit=crop",
      },
      {
        kicker: "Gateway",
        name: "Paro",
        desc: "Paro is known for its scenery and the world-famous cliffside Taktsang Monastery or the Tiger's Nest. Travellers can go for local shopping, hike through the Chele La Pass and enjoy the spectacular views of the valley.",
        highlights: ["Tiger's Nest", "Chele La Pass", "Paro Dzong"],
        image: "https://images.unsplash.com/photo-1742539327294-a050227d15b7?w=1200&q=85&auto=format&fit=crop",
      },
      {
        kicker: "Historic",
        name: "Punakha",
        desc: "Punakha is a beautiful valley town in Bhutan famous for its 17th-century Punakha Dzong, an ancient fortress and a cultural epicentre that hosts the Punakha Tshechu festival.",
        highlights: ["Punakha Dzong", "Tshechu Festival", "Winter Trek"],
        image: "https://images.unsplash.com/photo-1608236475016-1dcc7a260326?w=1200&q=85&auto=format&fit=crop",
      },
      {
        kicker: "Valley",
        name: "Jakar",
        desc: "Surrounded by mountains, Jakar offers breathtaking views and a peaceful environment in the beautiful valley of Bumthang, also known as the Switzerland of the east.",
        highlights: ["Bumthang Valley", "Mountain Views", "Peaceful Retreat"],
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
      },
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Arrive Paro",
        subtitle: "Welcome to the Kingdom of Bhutan",
        note: "Your journey begins here",
        image: "/assets/image/timeline-travel/Arrive-Paro.jpg",
      },
      {
        day: "Day 02",
        title: "In Paro",
        subtitle: "Hike to Taktsang (Tiger's Nest)",
        note: "Sacred mountain monastery",
        image: "/assets/image/timeline-travel/InParo (2).jpg",
      },
      {
        day: "Day 03",
        title: "Drive to Thimphu",
        subtitle: "Scenic mountain drive",
        note: "Through the heart of Bhutan",
        image: "/assets/image/timeline-travel/Thimphudrive.jpg",
      },
      {
        day: "Day 04",
        title: "In Thimphu",
        subtitle: "Visit Buddha Dordenma & Memorial Chorten",
        note: "Spiritual awakening",
        image: "/assets/image/timeline-travel/InThimphu.jpg",
      },
      {
        day: "Day 05",
        title: "Drive to Punakha",
        subtitle: "Crossing Dochula Pass",
        note: "108 chortens await",
        image: "/assets/image/timeline-travel/DrivetoPunakha.jpg",
      },
      {
        day: "Day 06",
        title: "In Punakha",
        subtitle: "Explore Punakha Dzong",
        note: "Palace of Great Happiness",
        image: "/assets/image/timeline-travel/in-Punakha.jpg",
      },
      {
        day: "Day 07",
        title: "Drive to Dhulikhel",
        subtitle: "Border crossing to Nepal",
        note: "Himalayan panoramic views",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200",
      },
      {
        day: "Day 08",
        title: "Drive back to Kathmandu",
        subtitle: "Explore Kathmandu Valley",
        note: "City of temples",
        image: "/assets/image/timeline-travel/Thimphudrive.jpg",
      },
      {
        day: "Day 09",
        title: "Fly back to Delhi",
        subtitle: "Safe travels home",
        note: "Until we meet again",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200",
      },
    ],
    tripsIntro: {
      label: "Routes & Packages",
      titleGold: "Popular",
      titleBlue: "Trips",
      subtitle: "Handpicked journeys crafted for seamless travel and unforgettable moments.",
    },
  },
  {
    slug: "nepal",
    name: "Nepal",
    meta: {
      title: "Explore Nepal — Himalayan Adventures, Trekking & Cultural Tours",
      description:
        "Discover Nepal with Next Trip Expedition — Kathmandu, Pokhara, Chitwan and the Annapurna Circuit on curated Himalayan itineraries.",
    },
    hero: {
      titleLines: ["Where Mountains Meet"],
      highlight: "Your Dreams",
      subtitle: "Uncover timeless beauty, embrace adventure, and create stories worth telling.",
      video: "/assets/image/nepal.mp4",
      poster: "/assets/image/nepal-poster.jpg",
    },
    intro: {
      label: "About Nepal",
      titleGold: "Tranquillity",
      titleBlue: "in the Heart of Mountains",
      heading: "History & Culture",
      paragraphs: [
        "With a monarchy presiding until 2006, Nepal's history has been one of conflict and strife, with its economy today, largely dependent on tourism. From the bustling capital of Kathmandu with its rich architecture to the forested Terai belt where the one-horned rhino roam, from the terraced farmlands to the river-carved valleys, from the scenic mountain-towns in the mid-Himalayas to the Mt. Everest Base Camp – Nepal offers a wide range of options for every traveler.",
        "The wildlife in Nepal caters to some of the world's endangered animals, including the snow leopard, red panda, and Asiatic black bear. With so much to offer, it is no wonder that Nepal is one of the most popular tourist destinations in the world.",
      ],
      image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1400&q=85&auto=format&fit=crop",
      stats: [
        { value: "8,848m", label: "Mt. Everest" },
        { value: "#1", label: "Rhino Sanctuary" },
        { value: "1000+", label: "Temples" },
        { value: "EBC", label: "Base Camp Trek" },
      ],
    },
    citiesSection: {
      label: "Explore Key Cities",
      titleGold: "Discover Nepal's",
      titleBlue: "Destinations",
      subtitle: "Discover the unique charm of each destination across this mystical kingdom",
    },
    cities: [
      {
        kicker: "Capital City",
        name: "Kathmandu",
        desc: "Travellers can explore the museums and art galleries in the capital city of Kathmandu or take a walk through the beautiful monasteries and stupas to spend a moment in peace. The city has a unique charm with traditional local flavours of hospitality received from humble Nepali people that make the local experience feel magical.",
        highlights: ["Museums & Galleries", "Monasteries", "Traditional Culture"],
        image: "https://images.unsplash.com/photo-1776620544426-5298d9dfaf5f?w=1200&q=85&auto=format&fit=crop",
      },
      {
        kicker: "Lakeside",
        name: "Pokhara",
        desc: "Surrounded by mountains and lakes, Pokhara offers a wide range of outdoor activities like paragliding, rafting, trekking, and serene nature walks. The popular attractions of Pokhara are the Phewa lake, Poon Hill, and Devi's Falls!",
        highlights: ["Phewa Lake", "Poon Hill", "Paragliding"],
        image: "https://images.unsplash.com/photo-1735533441842-33c5e47b22ae?w=1200&q=85&auto=format&fit=crop",
      },
      {
        kicker: "Wildlife",
        name: "Chitwan",
        desc: "Chitwan National Park is a beautiful valley town in Nepal famous for its wildlife including the one-horned rhinoceros, Bengal tigers, and diverse bird species. Jungle safaris and elephant rides are the highlights of this exceptional national park.",
        highlights: ["Jungle Safari", "Rhino Sightings", "Elephant Ride"],
        image: "https://images.unsplash.com/photo-1534215782964-d58601aa091c?w=1200&q=85&auto=format&fit=crop",
      },
      {
        kicker: "Trekking",
        name: "Annapurna Circuit",
        desc: "Annapurna Circuit trek is one of the most popular treks in Nepal. It offers various landscapes, from subtropical jungles to semiarid deserts. Hiking up the hilly terrains, halting at local houses for a quick tea, and enjoying the breathtaking valley views after reaching the top is nothing less than a lifetime experience.",
        highlights: ["Mountain Views", "Diverse Landscapes", "Tea Houses"],
        image: "https://images.unsplash.com/photo-1701517857774-ce9c3c07bd39?w=1200&q=85&auto=format&fit=crop",
      },
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Arrive Kathmandu",
        subtitle: "Welcome to Nepal",
        note: "Your journey begins here",
        image: "/assets/image/nepal/ArriveKathmandu.jpg",
      },
      {
        day: "Day 02",
        title: "In Kathmandu",
        subtitle: "Explore temples & stupas",
        note: "City of temples",
        image: "/assets/image/nepal/In-Kathmandu.jpg",
      },
      {
        day: "Day 03",
        title: "Drive to Chitwan",
        subtitle: "Journey to the jungle",
        note: "Wildlife awaits",
        image: "/assets/image/nepal/Drive to Chitwan.jpeg",
      },
      {
        day: "Day 04",
        title: "In Chitwan",
        subtitle: "Jungle safari & wildlife",
        note: "One-horned rhinos",
        image: "/assets/image/nepal/InChitwan.jpg",
      },
      {
        day: "Day 05",
        title: "Drive to Pokhara",
        subtitle: "Scenic mountain drive",
        note: "Lakeside paradise",
        image: "/assets/image/nepal/DrivetoPokhara.jpg",
      },
      {
        day: "Day 06",
        title: "In Pokhara",
        subtitle: "Explore Phewa Lake",
        note: "Mountain reflections",
        image: "/assets/image/nepal/InPokhara.jpg",
      },
      {
        day: "Day 07",
        title: "Drive to Dhulikhel",
        subtitle: "Mountain town views",
        note: "Himalayan panorama",
        image: "/assets/image/nepal/DrivetoPokhara.jpg",
      },
      {
        day: "Day 08",
        title: "Drive back to Kathmandu",
        subtitle: "Final exploration",
        note: "Last moments in Nepal",
        image: "/assets/image/nepal/DrivebacktoKathmandu.jpg",
      },
      {
        day: "Day 09",
        title: "Departure",
        subtitle: "Safe travels home",
        note: "Until we meet again",
        image: "/assets/image/nepal/Departure.png",
      },
    ],
    tripsIntro: {
      label: "Routes & Packages",
      titleGold: "Popular",
      titleBlue: "Trips",
      subtitle: "Handpicked journeys crafted for seamless travel and unforgettable moments.",
    },
  },
  {
    slug: "india",
    name: "India",
    meta: {
      title: "Explore India — Cultural Tours, Heritage & Incredible Experiences",
      description:
        "Discover India with Next Trip Expedition — Sikkim & Darjeeling, Rajasthan, Kashmir and Ladakh on curated heritage itineraries.",
    },
    hero: {
      titleLines: ["Explore the Heart of"],
      highlight: "Incredible India",
      subtitle: "Let every destination spark new emotions and lifelong memories.",
      video: "/assets/image/india.mp4",
      poster: "/assets/image/india-poster.jpg",
    },
    intro: {
      label: "About India",
      titleGold: "Tranquillity",
      titleBlue: "in the Heart of Mountains",
      heading: "Rich Culture & Heritage",
      paragraphs: [
        "India has fascinated many tourists across the globe with her secularism and her culture. The scenic landscape, hill stations, historical sites, architecture and monuments, beaches, and enchanting backwater, places of religious interest make India a preferred destination for tourists from all over the world.",
        "Many people from all over the country are attracted to India because of its scenic beauty which spreads from Kashmir in the North to Kanyakumari in the South and Arunachal Pradesh in the East to Gujarat in the West, and multiculturalism.",
      ],
      image: "https://images.unsplash.com/photo-1545562083-c583d014b4f2?w=1400&q=85&auto=format&fit=crop",
      stats: [
        { value: "38", label: "UNESCO Sites" },
        { value: "8,586m", label: "Kanchenjunga" },
        { value: "2000+", label: "Years of History" },
        { value: "#1", label: "Cuisine Diversity" },
      ],
    },
    citiesSection: {
      label: "Explore Key Destinations",
      titleGold: "Discover India's",
      titleBlue: "Wonders",
      subtitle: "Discover the unique charm of each destination across this incredible country",
    },
    cities: [
      {
        kicker: "Himalayan",
        name: "Sikkim/Darjeeling",
        desc: "Nestled in the eastern Himalayas, the combined enchantment of Sikkim and Darjeeling awaits travelers seeking a journey through the pristine beauty of the mountains. This tour offers a unique blend of natural splendor, cultural richness, and colonial charm, making it a Himalayan escapade like no other.",
        highlights: ["Tea Gardens", "Mountain Views", "Buddhist Monasteries"],
        image: "https://images.unsplash.com/photo-1746175832129-fddb132c075c?w=1200&q=85&auto=format&fit=crop",
      },
      {
        kicker: "Royal",
        name: "Rajasthan",
        desc: "Rajasthan, the jewel in India's crown, is a land of legends, rich history, and timeless beauty. It's a place where the past seamlessly blends with the present, creating a tapestry of culture, architecture, and traditions that have endured for centuries. Welcome to Classical Rajasthan, a region that transports you back in time while captivating you with its modern vibrancy.",
        highlights: ["Majestic Forts", "Royal Palaces", "Desert Safari"],
        image: "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?w=1200&q=85&auto=format&fit=crop",
      },
      {
        kicker: "Paradise",
        name: "Kashmir",
        desc: 'Nestled in the northernmost part of India lies a place often referred to as "Paradise on Earth" - Kashmir. With its breathtaking natural beauty, pristine landscapes, and a rich cultural heritage, a Kashmir tour promises an experience that is nothing short of enchanting. This heavenly region has been a magnet for travelers and poets for centuries, and once you set foot here, you\'ll understand why.',
        highlights: ["Dal Lake", "Houseboats", "Ski Resorts"],
        image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=1200&q=85&auto=format&fit=crop",
      },
      {
        kicker: "Adventure",
        name: "Ladakh",
        desc: 'Ladakh, often referred to as the "Land of High Passes," is a destination that defies the ordinary and invites the adventurous spirit. Tucked away in the northern reaches of India, Ladakh is a rugged paradise where stark desert landscapes meet towering snow-capped peaks. A Ladakh tour promises a journey into an enchanting Himalayan wonderland.',
        highlights: ["High Passes", "Buddhist Culture", "Pangong Lake"],
        image: "https://images.unsplash.com/photo-1635255506105-b74adbd94026?w=1200&q=85&auto=format&fit=crop",
      },
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Arrive Delhi",
        subtitle: "Welcome to Incredible India",
        note: "Your journey begins here",
        image: "/assets/image/india/Arrive-Delhi.png",
      },
      {
        day: "Day 02",
        title: "Delhi Sightseeing",
        subtitle: "Explore the capital",
        note: "Red Fort, Qutub Minar",
        image: "/assets/image/india/DelhiSightseeing.png",
      },
      {
        day: "Day 03",
        title: "Drive to Agra",
        subtitle: "Yamuna Expressway",
        note: "City of Taj Mahal",
        image: "/assets/image/india/DrivetoAgra.png",
      },
      {
        day: "Day 04",
        title: "Agra & Fatehpur",
        subtitle: "Taj Mahal & Red Fort",
        note: "Mughal architecture",
        image: "/assets/image/india/Agra&Fatehpur.png",
      },
      {
        day: "Day 05",
        title: "Drive to Jaipur",
        subtitle: "Pink City awaits",
        note: "Royal Rajasthan",
        image: "/assets/image/india/drive-Jaipur.png",
      },
      {
        day: "Day 06",
        title: "Jaipur City Tour",
        subtitle: "Amber Fort, Hawa Mahal",
        note: "Royal heritage",
        image: "/assets/image/india/Jaipur-city.png",
      },
      {
        day: "Day 07",
        title: "Jaipur Local",
        subtitle: "City Palace, Jantar Mantar",
        note: "Astronomical marvels",
        image: "/assets/image/india/Jaipur-Local.png",
      },
      {
        day: "Day 08",
        title: "Drive back to Delhi",
        subtitle: "Final shopping",
        note: "Last moments in India",
        image: "/assets/image/india/drive-delhi.png",
      },
      {
        day: "Day 09",
        title: "Departure",
        subtitle: "Safe travels home",
        note: "Until we meet again",
        image: "/assets/image/india/Departure.png",
      },
    ],
    tripsIntro: {
      label: "Routes & Packages",
      titleGold: "Popular",
      titleBlue: "Trips",
      subtitle: "Handpicked journeys crafted for seamless travel and unforgettable moments.",
    },
  },
];

export function getTour(slug: string) {
  return tours.find((t) => t.slug === slug);
}

export const tourSlugs = tours.map((t) => t.slug);
