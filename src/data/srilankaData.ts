export interface DestinationItem {
  id: string;
  region: 'cultural' | 'highlands' | 'coast' | 'wildlife';
  name: string;
  subtitle: string;
  placeQuery: string;
  bestSeason: string;
  stayDuration: string;
  image: string;
  description: string;
  highlights: string[];
}

export interface TourPackage {
  id: string;
  category: 'classic' | 'highlands' | 'wildlife' | 'grand';
  title: string;
  days: number;
  nights: number;
  pricePerPersonUsd: number;
  image: string;
  routeSummary: string;
  stopQueries: string[];
  description: string;
  inclusions: string[];
}

export interface VehicleOption {
  id: string;
  name: string;
  category: string;
  passengers: number;
  luggage: number;
  baseTransferUsd: number;
  perKmUsd: number;
  dailyTourUsd: number;
  idealFor: string;
  features: string[];
}

export const COMPANY_INFO = {
  name: 'TRY LANKA TRAVELS',
  logoUrl: '/assets/aistudio/WhatsApp_Image_2026-11-22_at_10.08.55_PM_25e0ea81.jpeg',
  whatsappNumber: '94772051782',
  whatsappDisplay: '+94 77 205 1782',
  email: 'bookings@trylankatravels.com',
  officeCity: 'Colombo & Katunayake (BIA Airport Desk), Sri Lanka',
  licenseNote: 'SLTDA Registered Chauffeur-Guide & Private Transport Operator',
};

export const IMAGES = {
  heroSigiriya: '/src/assets/images/srilanka_hero_sigiriya_1795414662187.jpg',
  ellaTrain: '/src/assets/images/srilanka_ella_train_1795414658241.jpg',
  galleCoast: '/src/assets/images/srilanka_galle_coast_1795414659745.jpg',
  yalaSafari: '/src/assets/images/srilanka_yala_safari_1795414660823.jpg',
  luxuryTransport: '/src/assets/images/srilanka_luxury_transport_1795414658977.jpg',
};

// Note: Individual destination coordinates, addresses, and place IDs are resolved
// dynamically via Google Maps Platform Places API (New) at runtime.
export const QUICK_STOP_QUERIES: { id: string; label: string; query: string }[] = [
  { id: 'bia', label: 'BIA Airport (CMB)', query: 'Bandaranaike International Airport, Sri Lanka' },
  { id: 'colombo', label: 'Colombo', query: 'Colombo, Sri Lanka' },
  { id: 'sigiriya', label: 'Sigiriya', query: 'Sigiriya, Sri Lanka' },
  { id: 'kandy', label: 'Kandy', query: 'Kandy, Sri Lanka' },
  { id: 'nuwara-eliya', label: 'Nuwara Eliya', query: 'Nuwara Eliya, Sri Lanka' },
  { id: 'ella', label: 'Ella', query: 'Ella, Sri Lanka' },
  { id: 'yala', label: 'Yala Park', query: 'Yala National Park, Sri Lanka' },
  { id: 'mirissa', label: 'Mirissa', query: 'Mirissa, Sri Lanka' },
  { id: 'galle', label: 'Galle Fort', query: 'Galle Fort, Sri Lanka' },
  { id: 'trincomalee', label: 'Trincomalee', query: 'Trincomalee, Sri Lanka' },
];

export const DESTINATIONS: DestinationItem[] = [
  {
    id: 'sigiriya',
    region: 'cultural',
    name: 'Sigiriya & Cultural Triangle',
    subtitle: 'Ancient Sky Fortress · Matale District',
    placeQuery: 'Sigiriya, Sri Lanka',
    bestSeason: 'Jan – Sep',
    stayDuration: '2 Nights',
    image: IMAGES.heroSigiriya,
    description:
      'Ascend the 5th-century granite citadel of King Kashyapa rising straight out of emerald jungle, paired with Dambulla Golden Cave Temple and Polonnaruwa ruins.',
    highlights: ['Sunrise Lion Rock Climb', 'Pidurangala Panorama', 'Minneriya Elephant Gathering'],
  },
  {
    id: 'ella',
    region: 'highlands',
    name: 'Ella & Ceylon Tea Highlands',
    subtitle: 'Cloud Forests & Scenic Rail · Uva Province',
    placeQuery: 'Ella, Sri Lanka',
    bestSeason: 'Dec – May',
    stayDuration: '2 – 3 Nights',
    image: IMAGES.ellaTrain,
    description:
      'Ride the iconic blue highland train from Kandy through misty terraced tea estates, walk the stone Nine Arch Bridge, and hike Little Adam’s Peak at dawn.',
    highlights: ['Nine Arch Bridge', 'Kandy to Ella Train', 'Estate Tea Tasting'],
  },
  {
    id: 'yala',
    region: 'wildlife',
    name: 'Yala & Southern Safaris',
    subtitle: 'Leopards & Wild Elephants · Southern Dry Zone',
    placeQuery: 'Yala National Park, Sri Lanka',
    bestSeason: 'Feb – Jul',
    stayDuration: '2 Nights',
    image: IMAGES.yalaSafari,
    description:
      'Venture into coastal scrub forest and golden lagoons at first light in a private 4x4 safari jeep with veteran naturalists tracking Sri Lankan leopards and elephant herds.',
    highlights: ['Private Dawn 4x4 Jeep', 'Leopard & Sloth Bear Zones', 'Udawalawe Elephant Transit'],
  },
  {
    id: 'galle',
    region: 'coast',
    name: 'Galle Fort & Mirissa Coast',
    subtitle: 'Colonial Ramparts & Indian Ocean · South Coast',
    placeQuery: 'Galle Fort, Sri Lanka',
    bestSeason: 'Nov – Apr',
    stayDuration: '3 Nights',
    image: IMAGES.galleCoast,
    description:
      'Stroll cobblestone coral ramparts lined with spice merchants and Dutch-era mansions, then unwind along palm-fringed southern coves with seasonal blue whale watching.',
    highlights: ['Galle Lighthouse Sunset', 'Mirissa Whale Watching', 'Unawatuna & Weligama Surf'],
  },
];

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'classic-ceylon-7',
    category: 'classic',
    title: '01. Classic Ceylon Heritage & Hills',
    days: 7,
    nights: 6,
    pricePerPersonUsd: 690,
    image: IMAGES.heroSigiriya,
    routeSummary: 'Airport · Sigiriya · Kandy · Nuwara Eliya · Ella · Colombo',
    stopQueries: [
      'Bandaranaike International Airport, Sri Lanka',
      'Sigiriya, Sri Lanka',
      'Kandy, Sri Lanka',
      'Ella, Sri Lanka',
      'Colombo, Sri Lanka',
    ],
    description:
      'Our signature one-week island introduction blending ancient rock fortresses, the Temple of the Sacred Tooth Relic, misty Ceylon tea hills, and private door-to-door transport.',
    inclusions: ['Private AC vehicle & chauffeur-guide', 'Boutique 4-star stays with breakfast', 'Scenic hill-country train tickets'],
  },
  {
    id: 'highlands-wildlife-coast-10',
    category: 'wildlife',
    title: '02. Highlands, Safari & Southern Coast',
    days: 10,
    nights: 9,
    pricePerPersonUsd: 980,
    image: IMAGES.yalaSafari,
    routeSummary: 'Airport · Sigiriya · Kandy · Ella · Yala · Mirissa · Galle',
    stopQueries: [
      'Bandaranaike International Airport, Sri Lanka',
      'Sigiriya, Sri Lanka',
      'Kandy, Sri Lanka',
      'Ella, Sri Lanka',
      'Yala National Park, Sri Lanka',
      'Galle Fort, Sri Lanka',
    ],
    description:
      'The complete Sri Lanka arc: morning ruins in the Cultural Triangle, emerald mountain valleys, a private Yala leopard safari, and three unhurried days on the southern coast.',
    inclusions: ['Private touring van & English chauffeur', 'Yala 4x4 morning safari jeep', 'Handpicked eco-lodges & beach villas'],
  },
  {
    id: 'tea-trails-rail-5',
    category: 'highlands',
    title: '03. Mist, Tea & Scenic Rail Escape',
    days: 5,
    nights: 4,
    pricePerPersonUsd: 495,
    image: IMAGES.ellaTrain,
    routeSummary: 'Colombo · Kandy · Nuwara Eliya · Ella · Galle Fort',
    stopQueries: [
      'Colombo, Sri Lanka',
      'Kandy, Sri Lanka',
      'Nuwara Eliya, Sri Lanka',
      'Ella, Sri Lanka',
      'Galle Fort, Sri Lanka',
    ],
    description:
      'Designed for slow travelers and photographers: botanical gardens, colonial tea bungalows, waterfalls, and the legendary hill-country railway without rushing a single mile.',
    inclusions: ['Reserved scenic train seats', 'Luggage transfer by private vehicle', 'Plantation bungalow & tea factory visit'],
  },
  {
    id: 'grand-island-14',
    category: 'grand',
    title: '04. Grand Sri Lanka Coast-to-Coast',
    days: 14,
    nights: 13,
    pricePerPersonUsd: 1420,
    image: IMAGES.galleCoast,
    routeSummary: 'Airport · Sigiriya · Trincomalee · Kandy · Ella · Yala · Galle',
    stopQueries: [
      'Bandaranaike International Airport, Sri Lanka',
      'Sigiriya, Sri Lanka',
      'Trincomalee, Sri Lanka',
      'Kandy, Sri Lanka',
      'Ella, Sri Lanka',
      'Yala National Park, Sri Lanka',
      'Galle Fort, Sri Lanka',
    ],
    description:
      'An unhurried two-week expedition from northern dry-zone heritage and tranquil eastern lagoons to central cloud forests, wildlife reserves, and southern ocean forts.',
    inclusions: ['Dedicated chauffeur-guide for 14 days', 'All expressway tolls & fuel included', 'Customizable boutique & luxury hotels'],
  },
];

export const VEHICLES: VehicleOption[] = [
  {
    id: 'sedan',
    name: 'Hybrid Executive Sedan',
    category: 'Toyota Prius / Axio Hybrid',
    passengers: 3,
    luggage: 3,
    baseTransferUsd: 18,
    perKmUsd: 0.48,
    dailyTourUsd: 65,
    idealFor: 'Couples & solo airport transfers',
    features: ['Dual-zone AC', 'Bottled water & Wi-Fi', 'English-speaking driver', 'Highway tolls transparent'],
  },
  {
    id: 'kdh-van',
    name: 'Luxury KDH High-Roof Van',
    category: 'Toyota HiAce KDH Super GL',
    passengers: 8,
    luggage: 8,
    baseTransferUsd: 26,
    perKmUsd: 0.68,
    dailyTourUsd: 88,
    idealFor: 'Families & small touring groups',
    features: ['Reclining captain seats', 'Rear AC & USB charging', 'Extra luggage bay', 'SLTDA chauffeur-guide'],
  },
  {
    id: 'suv',
    name: '4x4 Highland & Safari SUV',
    category: 'Toyota Land Cruiser Prado / Montero',
    passengers: 4,
    luggage: 4,
    baseTransferUsd: 34,
    perKmUsd: 0.85,
    dailyTourUsd: 115,
    idealFor: 'Luxury mountain estates & scenic passes',
    features: ['Elevated panoramic view', 'Plush leather cabin', 'Mountain torque comfort', 'Priority airport meet & greet'],
  },
  {
    id: 'mini-coach',
    name: '29-Seater Tourist Mini Coach',
    category: 'Toyota Coaster / Rosa AC Coach',
    passengers: 26,
    luggage: 24,
    baseTransferUsd: 55,
    perKmUsd: 1.25,
    dailyTourUsd: 165,
    idealFor: 'Corporate retreats & extended families',
    features: ['PA guide microphone', 'Dedicated luggage boot', 'Cooler box onboard', 'Driver & assistant crew'],
  },
];

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(subject: string, body: string): string {
  return `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
