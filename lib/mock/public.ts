export type QuickFilter = string;

export interface FeaturedCategory {
  id: string;
  title: string;
  stats: string;
  icon: "electronics" | "fashion" | "home" | "sports" | "beauty" | "gaming";
  summary?: string;
  regions?: string[];
}

export interface FeaturedStore {
  id: string;
  name: string;
  rating: number;
  description: string;
  domain: string;
  imageUrl: string;
}

export interface BestSellerProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  previousPrice?: number;
  tag?: string;
  imageUrl: string;
  summary?: string;
  momentum?: "surging" | "steady" | "emerging";
  signals?: string[];
}

export const quickFilters: QuickFilter[] = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Sports",
  "Beauty",
];

export const featuredCategories: FeaturedCategory[] = [
  {
    id: "cat-electronics",
    title: "Electronics",
    stats: "2.5k+ products",
    icon: "electronics",
    summary:
      "Components, PCB assemblies, and consumer tech seeing sustained demand across regions.",
    regions: ["China", "South Korea", "USA"],
  },
  {
    id: "cat-fashion",
    title: "Fashion",
    stats: "1.8k+ products",
    icon: "fashion",
    summary:
      "Trend-forward apparel collections and sustainable basics for omnichannel retailers.",
    regions: ["Bangladesh", "Vietnam", "Turkey"],
  },
  {
    id: "cat-home",
    title: "Home",
    stats: "950+ products",
    icon: "home",
    summary:
      "Modern furniture, decor, and smart home essentials curated for growing lifestyle brands.",
    regions: ["Poland", "Indonesia", "USA"],
  },
  {
    id: "cat-sports",
    title: "Sports",
    stats: "720+ products",
    icon: "sports",
    summary:
      "Performance gear, connected fitness devices, and activewear ready for rapid restock.",
    regions: ["Germany", "USA", "Brazil"],
  },
  {
    id: "cat-beauty",
    title: "Beauty",
    stats: "1.2k+ products",
    icon: "beauty",
    summary:
      "Clean beauty lines, personal care SKUs, and spa-grade treatments scaling distribution.",
    regions: ["France", "South Korea", "Canada"],
  },
  {
    id: "cat-gaming",
    title: "Gaming",
    stats: "640+ products",
    icon: "gaming",
    summary:
      "Peripherals, accessories, and console-ready hardware fueling the gaming boom.",
    regions: ["Japan", "USA", "United Kingdom"],
  },
];

export const featuredStores: FeaturedStore[] = [
  {
    id: "store-techhub",
    name: "TechHub Electronics",
    rating: 4.8,
    description:
      "Premium electronics and gadgets with fast shipping and excellent customer service.",
    domain: "techhub.store",
    imageUrl:
      "https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "store-fashion-forward",
    name: "Fashion Forward",
    rating: 4.6,
    description:
      "Trendy fashion for men and women. Latest collections from top brands worldwide.",
    domain: "fashionforward.store",
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "store-home-harmony",
    name: "Home Harmony",
    rating: 4.9,
    description:
      "Beautiful home decor and furniture to transform your living space into a sanctuary.",
    domain: "homeharmony.store",
    imageUrl:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "store-zenith",
    name: "Zenith Devices",
    rating: 4.7,
    description:
      "Industry-grade IoT solutions used by cold-chain operators and pharma distributors.",
    domain: "zenithdevices.store",
    imageUrl:
      "https://images.unsplash.com/photo-1581092580331-84b0dbba0020?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "store-evergreen",
    name: "Evergreen Supplies",
    rating: 4.9,
    description:
      "Sustainable packaging and logistics-ready consumables for fast-scaling DTC brands.",
    domain: "evergreen.store",
    imageUrl:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&q=80",
  },
];

export const bestSellerProducts: BestSellerProduct[] = [
  {
    id: "bs-headphones",
    name: "Premium Wireless Headphones",
    brand: "TechHub Electronics",
    category: "Consumer Electronics",
    price: 79.99,
    previousPrice: 99.99,
    tag: "-20%",
    imageUrl:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=420&q=80",
    summary:
      "Noise-cancelling wireless headsets with bulk pricing for retail and corporate gifting.",
    momentum: "surging",
    signals: [
      "18% uplift in wholesale orders this quarter",
      "Backed by 2-year manufacturer warranty",
      "Strong margins across EU and NA markets",
    ],
  },
  {
    id: "bs-dress",
    name: "Summer Casual Dress",
    brand: "Fashion Forward",
    category: "Apparel & Footwear",
    price: 45,
    tag: "New",
    imageUrl:
      "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=420&q=80",
    summary:
      "Eco-friendly fabric blend available in multiple colourways with low MOQs.",
    momentum: "steady",
    signals: [
      "High conversion from boutique retailers",
      "Sustainable materials with certifications",
      "Average lead time under 21 days",
    ],
  },
  {
    id: "bs-lamp",
    name: "Modern Table Lamp",
    brand: "Home Harmony",
    category: "Home Goods",
    price: 89.99,
    imageUrl:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=420&q=80",
    summary:
      "Mid-century inspired lamp favoured by hospitality buyers and premium home retailers.",
    momentum: "surging",
    signals: [
      "Backordered in 3 key regions",
      "Customisable finishes available",
      "Bulk shipping programmes in place",
    ],
  },
  {
    id: "bs-bands",
    name: "Resistance Bands Set",
    brand: "FitGear Pro",
    category: "Sports & Outdoors",
    price: 24.99,
    tag: "Bestseller",
    imageUrl:
      "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?auto=format&fit=crop&w=420&q=80",
    summary:
      "Colour-coded resistance bands packaged for studio resale and e-commerce bundling.",
    momentum: "emerging",
    signals: [
      "Gyms and studios adding to subscription orders",
      "Packaging optimised for letterbox delivery",
      "High customer rating across marketplaces",
    ],
  },
];


