import {
  Feature,
  HeroSlide,
  PromoBanner,
} from "@/types";

export const heroSlides: HeroSlide[] = [
  {
    id: "1",
    image: "/hero/hero-1.jpg",
    headline: "Quiet rooms. Useful objects.",
    description:
      "A considered edit of home, travel, and everyday pieces — designed to be lived with, not looked past.",
    ctaText: "Shop the Collection",
    ctaLink: "/shop",
    secondaryCtaText: "Explore Home",
    secondaryCtaLink: "/categories/home",
  },
];

export const features: Feature[] = [
  {
    id: "1",
    icon: "truck",
    title: "Considered Shipping",
    description: "Complimentary standard shipping on orders over $75.",
  },
  {
    id: "2",
    icon: "shield",
    title: "Secure Checkout",
    description: "Encrypted checkout for a straightforward, protected order.",
  },
  {
    id: "3",
    icon: "rotate",
    title: "30-Day Returns",
    description: "Return unused items in original packaging within 30 days.",
  },
  {
    id: "4",
    icon: "headphones",
    title: "Direct Support",
    description: "Questions about an order? Write to us — we respond promptly.",
  },
  {
    id: "5",
    icon: "star",
    title: "Edited Selection",
    description: "A focused catalog of useful objects, not an endless aisle.",
  },
];

export const dealsEndTime = new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString();

export const homepageDealsSlugs = [
  "meridian-linen-duvet-set",
  "ember-cast-iron-skillet",
  "saffron-travel-pack",
  "cable-knit-scarf",
  "cloudweave-bath-towel-set",
  "pour-over-coffee-set",
] as const;

export const homepageBestsellerSlugs = [
  "northbound-canvas-weekender",
  "cloudweave-bath-towel-set",
  "trailwell-insulated-bottle",
  "everyday-cotton-crews",
  "grove-stoneware-dinner-plates",
  "clothbound-desk-journal",
  "studio-alignment-mat",
  "haven-knit-throw",
] as const;

export const homepageFeaturedSlugs = [
  "meridian-linen-duvet-set",
  "harbor-leather-messenger",
  "tripod-floor-lamp",
  "solace-ceramic-vessel",
  "compact-leather-bifold",
  "amberwood-scented-candle",
  "seagrass-storage-basket",
  "gooseneck-desk-lamp",
  "hearthwood-cutting-board",
  "merino-knit-edit",
] as const;

export const homepageNewArrivalSlugs = [
  "fieldnote-pocket-journal",
  "cable-knit-scarf",
  "studio-belt-drive-turntable",
  "porchfire-lantern",
  "weekly-desk-planner",
  "pour-over-coffee-set",
  "travel-grooming-kit",
  "daily-training-bottle",
] as const;

export const homepageEditorialSlugs = [
  "haven-knit-throw",
  "solace-ceramic-vessel",
  "amberwood-scented-candle",
  "clothbound-desk-journal",
] as const;

export const homepageCuratedSlugs = [
  "northbound-canvas-weekender",
  "harbor-leather-messenger",
  "saffron-travel-pack",
  "meadow-picnic-blanket",
] as const;

export const promotionalBanner: PromoBanner = {
  id: "1",
  title: "Packed for the weekend.",
  description:
    "Weekenders, day packs, and small leather goods for leaving the house well-equipped — without overpacking.",
  buttonText: "Shop Travel",
  buttonLink: "/categories/travel",
  image: "/banners/featured.jpg",
};

export const aboutSection = {
  title: "Objects with a longer stay.",
  description:
    "ROSARK LLC edits a contemporary catalog of home, kitchen, travel, apparel, and everyday tools. The emphasis is on useful design, calm materials, and pieces that earn their place in a room.",
  checklist: [
    "A focused assortment across twelve categories",
    "Practical products, presented with editorial care",
    "Straightforward shipping and returns",
    "A shopping experience built to stay out of the way",
  ],
  buttonText: "Read Our Story",
  buttonLink: "/about",
  image: "/banners/about.jpg",
};

export const featuredCollection = {
  title: "The House Edit",
  description: "A current selection of pieces for rooms that are lived in, not staged.",
  bannerImage: "/banners/editorial.jpg",
  categorySlug: "home",
};

export const lifestyleFeature = {
  title: "Evenings at home.",
  description:
    "Throws, vessels, and quiet light — the slower layer of a contemporary interior.",
  buttonText: "Shop Home",
  buttonLink: "/categories/home",
  image: "/banners/lifestyle.jpg",
};

export const editorialShowcase = {
  eyebrow: "In the room",
  title: "Form that stays useful.",
  description:
    "A ceramic vessel, a knit throw, a candle that actually burns down. Small objects, chosen for how they sit in daily life.",
  buttonText: "View the Showcase",
  buttonLink: "/shop",
  image: "/banners/editorial.jpg",
};

export const bestSellerTabs = [
  { label: "All", slug: "all" },
  { label: "Home", slug: "home" },
  { label: "Kitchen", slug: "kitchen-dining" },
  { label: "Travel", slug: "travel" },
  { label: "Apparel", slug: "apparel" },
];

export const newsletter = {
  title: "Notes from the edit.",
  description: "New arrivals, seasonal pieces, and the occasional offer — sent sparingly.",
  placeholder: "Email address",
  buttonText: "Subscribe",
};

export const promoBar = {
  text: "Complimentary shipping on orders over $75",
  linkText: "Shop now",
  linkHref: "/shop",
};

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];
