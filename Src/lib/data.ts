export type Product = {
  // identity
  id: string;
  slug: string;
  // display
  name: string;
  title: string; // alias of name, kept for existing imports
  category: string;
  shortDescription: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: string;
  amazonUrl: string;
  featured?: boolean;
  trending?: boolean;
  pros: string[];
  cons: string[];
  specs: { label: string; value: string }[];
};

export type Category = { slug: string; name: string; icon: string; count: number };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  category: "Review" | "Comparison" | "Top 10";
  author: { name: string; role: string; avatar: string };
  date: string;
  readTime: string;
  content: string;
  relatedProducts?: string[];
};

const img = (id: string, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

// ---------------------------------------------------------------------------
// PRODUCTS
// ---------------------------------------------------------------------------
// To add a new product, append an object below. Required fields:
//   id, slug, name, category, shortDescription, description, image,
//   rating, reviewCount, price, amazonUrl, pros, cons, specs
// `amazonUrl` is automatically tagged with your Amazon Associates ID by
// withAffiliateTag() at render time — store the clean product URL here.
// ---------------------------------------------------------------------------

type ProductInput = Omit<Product, "title"> & { title?: string };

const defineProducts = (list: ProductInput[]): Product[] =>
  list.map((p) => ({ ...p, title: p.title ?? p.name }));

export const products: Product[] = defineProducts([
  {
    id: "B0F98W66B7",
    slug: "wireless-earbuds-iphone-white",
    name: "Wireless Earbuds for iPhone — ENC Noise Cancelling, 40H Playback",
    category: "audio",
    shortDescription:
      "Bluetooth 5.3 in-ear buds with ENC noise cancelling and 40-hour battery life.",
    description:
      "Lightweight wireless earbuds tuned for iPhone with Bluetooth 5.3, ENC call noise cancelling, HiFi bass and a 40-hour playback charging case. Compatible with iPhone 17/16/15, iPad, PC, laptop and Nintendo Switch.",
    image: img("1606220588913-b3aacb4d2f46"),
    rating: 4.5,
    reviewCount: 1280,
    price: "$29.99",
    amazonUrl: "https://www.amazon.com/dp/B0F98W66B7",
    featured: true,
    trending: true,
    pros: ["40-hour total battery", "ENC clear calls", "Universal compatibility"],
    cons: ["No active noise cancelling", "Plastic finish"],
    specs: [
      { label: "Bluetooth", value: "5.3" },
      { label: "Battery", value: "Up to 40h with case" },
      { label: "Mic", value: "ENC dual-mic" },
      { label: "Compatibility", value: "iPhone / Android / PC" },
    ],
  },
  {
    id: "B0G6B1BKGG",
    slug: "foxotin-earbuds-led-display",
    name: "foxotin Wireless Earbuds — LED Display, 48H Playback, IP7",
    category: "audio",
    shortDescription:
      "Bluetooth 5.3 earbuds with built-in mic, LED battery display and IP7 waterproofing.",
    description:
      "Sports-ready true wireless earbuds with a 48-hour LED charging case, built-in microphone and IP7 water resistance. Comfortable secure fit for workouts, commuting and calls on iPhone, Android or laptop.",
    image: img("1590658268037-6bf12165a8df"),
    rating: 4.4,
    reviewCount: 860,
    price: "$25.99",
    amazonUrl: "https://www.amazon.com/dp/B0G6B1BKGG",
    featured: true,
    pros: ["IP7 waterproof", "LED battery display", "Lightweight sport fit"],
    cons: ["Touch controls take practice"],
    specs: [
      { label: "Bluetooth", value: "5.3" },
      { label: "Battery", value: "Up to 48h with case" },
      { label: "Water rating", value: "IP7" },
      { label: "Charging", value: "USB-C" },
    ],
  },
  {
    id: "B0F8VT7XYQ",
    slug: "usb-c-headphones-iphone",
    name: "USB-C Wired Headphones for iPhone 17/16 — Noise Cancelling",
    category: "audio",
    shortDescription:
      "Wired USB-C earbuds with inline mic, remote and noise-cancelling design.",
    description:
      "Plug-and-play USB-C earphones tuned for iPhone 17/16/15 Pro Max, iPad, Galaxy S/Note series and Pixel. Inline remote with microphone, balanced bass and a tangle-resistant cable.",
    image: img("1583394838336-acd977736f90"),
    rating: 4.3,
    reviewCount: 540,
    price: "$15.99",
    amazonUrl: "https://www.amazon.com/dp/B0F8VT7XYQ",
    pros: ["No charging required", "Inline mic & remote", "Wide device support"],
    cons: ["Wired-only"],
    specs: [
      { label: "Connector", value: "USB-C" },
      { label: "Mic", value: "Inline w/ remote" },
      { label: "Driver", value: "10mm dynamic" },
      { label: "Cable", value: "1.2m TPE" },
    ],
  },
  {
    id: "B0H3YXQNKL",
    slug: "kiptumtek-smart-watch",
    name: "KIPTUMTEK Smart Watch — 1.83\" HD, Bluetooth Calling, IP67",
    category: "wearables",
    shortDescription:
      "1.83\" HD touchscreen smartwatch with Bluetooth calling, fitness and sleep tracking.",
    description:
      "Full-featured smartwatch for women and men with a bright 1.83\" HD touchscreen, Bluetooth calling, sleep and fitness tracking, IP67 water resistance and multi-sport modes. Works with Android and iOS.",
    image: img("1523275335684-37898b6baf30"),
    rating: 4.4,
    reviewCount: 1120,
    price: "$39.99",
    amazonUrl: "https://www.amazon.com/dp/B0H3YXQNKL",
    featured: true,
    trending: true,
    pros: ["Bluetooth calling", "Bright 1.83\" display", "Affordable price"],
    cons: ["No third-party apps"],
    specs: [
      { label: "Display", value: "1.83\" HD touchscreen" },
      { label: "Water rating", value: "IP67" },
      { label: "Calling", value: "Bluetooth answer/dial" },
      { label: "Compatibility", value: "Android / iOS" },
    ],
  },
  {
    id: "B0GTZ8YCCQ",
    slug: "alexa-smart-watch-1-85",
    name: "Smart Watch with Alexa Built-in — 1.85\" HD, IP68, 7-Day Battery",
    category: "wearables",
    shortDescription:
      "Alexa-enabled smartwatch with Bluetooth calls, 120+ sport modes and 7-day battery.",
    description:
      "Alexa Built-in smartwatch with a 1.85\" HD touchscreen, Bluetooth calling, 120+ sport modes, IP68 rating, 24/7 heart rate and sleep monitoring, and up to 7 days of battery life. Compatible with Android and iOS.",
    image: img("1611591437281-460bfbe1220a"),
    rating: 4.5,
    reviewCount: 2430,
    price: "$49.99",
    amazonUrl: "https://www.amazon.com/dp/B0GTZ8YCCQ",
    trending: true,
    pros: ["Alexa built-in", "7-day battery", "IP68 waterproof"],
    cons: ["Alexa requires phone connection"],
    specs: [
      { label: "Display", value: "1.85\" HD" },
      { label: "Battery", value: "Up to 7 days" },
      { label: "Water rating", value: "IP68" },
      { label: "Sport modes", value: "120+" },
    ],
  },
  {
    id: "B0D7N342KB",
    slug: "gir-5-piece-silicone-utensils",
    name: "GIR 5-Piece Silicone Kitchen Utensils Set — Royal Blue",
    category: "kitchen",
    shortDescription:
      "Non-toxic, heat-resistant silicone cooking set: spatula, ladle, spoon and more.",
    description:
      "GIR's 5-piece silicone kitchen utensils set is food-grade, heat resistant and dishwasher safe. Includes a rubber spatula, ladle and spoon designed for nonstick cookware and everyday cooking and baking.",
    image: img("1556909114-f6e7ad7d3136"),
    rating: 4.7,
    reviewCount: 980,
    price: "$59.00",
    amazonUrl: "https://www.amazon.com/dp/B0D7N342KB",
    featured: true,
    pros: ["Food-grade silicone", "Heat resistant", "Dishwasher safe"],
    cons: ["Premium price"],
    specs: [
      { label: "Pieces", value: "5" },
      { label: "Material", value: "Food-grade silicone" },
      { label: "Heat resistance", value: "Up to 550°F" },
      { label: "Care", value: "Dishwasher safe" },
    ],
  },
  {
    id: "B0F71K6FML",
    slug: "gir-10-piece-silicone-utensils",
    name: "GIR 10-Piece Silicone Essentials Kitchen Utensils Set",
    category: "kitchen",
    shortDescription:
      "10-piece non-toxic silicone set for nonstick cookware — ladle, spatula, flip and more.",
    description:
      "Get It Right's 10-piece silicone essentials covers nearly every cooking task: ladle, spatulas, flip, spoon and spoonula. Non-toxic, heat resistant and built to last on nonstick cookware.",
    image: img("1585515320310-259814833e62"),
    rating: 4.8,
    reviewCount: 420,
    price: "$120.00",
    amazonUrl: "https://www.amazon.com/dp/B0F71K6FML",
    pros: ["Comprehensive 10-piece set", "Nonstick safe", "Pro-grade quality"],
    cons: ["Higher price than basic sets"],
    specs: [
      { label: "Pieces", value: "10" },
      { label: "Material", value: "Food-grade silicone" },
      { label: "Use", value: "Nonstick cookware safe" },
      { label: "Care", value: "Dishwasher safe" },
    ],
  },
  {
    id: "B0F28W5M4S",
    slug: "amazon-basics-silicone-utensils-14",
    name: "Amazon Basics 14-Piece Silicone Cooking Utensils Set",
    category: "kitchen",
    shortDescription:
      "14-piece BPA-free silicone utensil set with wooden handles and holder.",
    description:
      "An affordable, complete kitchen starter: 14 BPA-free silicone utensils with wooden handles, plus a matching utensil holder. Linen gray finish that fits any kitchen.",
    image: img("1556910103-1c02745aae4d"),
    rating: 4.6,
    reviewCount: 5640,
    price: "$34.99",
    amazonUrl: "https://www.amazon.com/dp/B0F28W5M4S",
    trending: true,
    pros: ["14 pieces + holder", "BPA-free", "Great value"],
    cons: ["Wooden handles need hand-washing"],
    specs: [
      { label: "Pieces", value: "14 + holder" },
      { label: "Material", value: "Silicone + wood" },
      { label: "BPA", value: "BPA-free" },
      { label: "Color", value: "Linen gray" },
    ],
  },
]);

// ---------------------------------------------------------------------------
// CATEGORIES (counts derived from products)
// ---------------------------------------------------------------------------
const categoryMeta: { slug: string; name: string; icon: string }[] = [
  { slug: "audio", name: "Audio", icon: "🎧" },
  { slug: "wearables", name: "Wearables", icon: "⌚" },
  { slug: "kitchen", name: "Kitchen", icon: "🍳" },
];

export const categories: Category[] = categoryMeta.map((c) => ({
  ...c,
  count: products.filter((p) => p.category === c.slug).length,
}));

// ---------------------------------------------------------------------------
// BLOG POSTS
// ---------------------------------------------------------------------------
export const posts: Post[] = [
  {
    slug: "best-budget-wireless-earbuds-2026",
    title: "The Best Budget Wireless Earbuds of 2026",
    excerpt:
      "We tested affordable true-wireless earbuds for sound, battery and call quality. Here are the picks that punch above their price.",
    cover: img("1505740420928-5e560c06d30e"),
    category: "Top 10",
    author: { name: "Alex Rivera", role: "Audio Editor", avatar: img("1599566150163-29194dcaad36", 200, 200) },
    date: "Mar 4, 2026",
    readTime: "9 min read",
    content:
      "You no longer need to spend $200 to get great wireless earbuds. Our top affordable pick pairs ENC call noise cancelling with a 40-hour battery case, while the runner-up adds an LED display and IP7 waterproofing for workouts.",
    relatedProducts: ["wireless-earbuds-iphone-white", "foxotin-earbuds-led-display"],
  },
  {
    slug: "best-smartwatches-under-50",
    title: "Best Smartwatches Under $50 in 2026",
    excerpt:
      "Bluetooth calling, fitness tracking and week-long battery — all for less than a tank of gas.",
    cover: img("1517336714731-489689fd1ca8"),
    category: "Comparison",
    author: { name: "Maya Chen", role: "Senior Reviewer", avatar: img("1494790108377-be9c29b29330", 200, 200) },
    date: "Feb 18, 2026",
    readTime: "7 min read",
    content:
      "Two standout smartwatches dominate the under-$50 segment this year. One offers a crisp 1.83\" display with Bluetooth calling; the other adds Alexa built-in and a 7-day battery. Here's how to choose.",
    relatedProducts: ["kiptumtek-smart-watch", "alexa-smart-watch-1-85"],
  },
  {
    slug: "silicone-utensils-buying-guide",
    title: "Silicone Kitchen Utensils: A 2026 Buying Guide",
    excerpt:
      "Heat resistant, nonstick-safe and dishwasher friendly — here's what to look for and which sets we recommend.",
    cover: img("1556909114-f6e7ad7d3136"),
    category: "Top 10",
    author: { name: "Priya Shah", role: "Home Lead", avatar: img("1438761681033-6461ffad8d80", 200, 200) },
    date: "Jan 22, 2026",
    readTime: "10 min read",
    content:
      "From budget 14-piece sets to premium 10-piece pro kits, silicone utensils have replaced wooden spoons in many kitchens. We break down which sets are worth the upgrade.",
    relatedProducts: [
      "amazon-basics-silicone-utensils-14",
      "gir-5-piece-silicone-utensils",
      "gir-10-piece-silicone-utensils",
    ],
  },
];

// ---------------------------------------------------------------------------
// LOOKUPS
// ---------------------------------------------------------------------------
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const getProductsByCategory = (slug: string) =>
  products.filter((p) => p.category === slug);
