import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  pick,
  pickMany,
  absolutePath,
} from "/Users/solomon/Documents/Ecommerce-Product-Library/scripts/select-image.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const PRODUCT_DIR = join(PUBLIC, "products");
const CATEGORY_DIR = join(PUBLIC, "categories");
const HERO_DIR = join(PUBLIC, "hero");
const BANNER_DIR = join(PUBLIC, "banners");

for (const dir of [PRODUCT_DIR, CATEGORY_DIR, HERO_DIR, BANNER_DIR]) {
  mkdirSync(dir, { recursive: true });
}

const usedIds = new Set();

function copyAsset(asset, destDir, destName) {
  const src = absolutePath(asset);
  if (!existsSync(src)) {
    throw new Error(`Missing library file: ${src}`);
  }
  const dest = join(destDir, destName);
  mkdirSync(dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  return dest;
}

function selectImages(query, { style, n = 2 } = {}) {
  const seed = query.length * 17 + (style ? style.length : 0);
  const attempts = [
    { avoid: [...usedIds], seed },
    { seed },
    { style, avoid: [...usedIds], seed },
    { style, seed },
  ];

  let assets = [];
  for (const options of attempts) {
    const many = pickMany(query, Math.max(n, 4), options) || [];
    if (!many.length) continue;
    const ranked = [...many].sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0));
    const primaryType = ranked[0].productType;
    assets = ranked.filter((asset) => asset.productType === primaryType).slice(0, n);
    if (assets.length) break;
  }
  if (!assets.length) {
    throw new Error(`No matching image for query: ${query}`);
  }

  for (const asset of assets) usedIds.add(asset.id);
  return assets;
}

function selectOne(query, { style, seed } = {}) {
  const attempts = [{ style, seed }, { seed }];
  for (const options of attempts) {
    const asset = pick(query, options);
    if (asset) return asset;
  }
  throw new Error(`No matching image for query: ${query}`);
}

function publicProductPath(filename) {
  return `/products/${filename}`;
}

const catalog = [
  // HOME
  {
    id: "p1",
    slug: "meridian-linen-duvet-set",
    name: "Meridian Linen Duvet Set",
    category: "Home",
    categorySlug: "home",
    query: "linen bedding set",
    style: "editorial",
    description:
      "A stonewashed linen duvet cover and sham pair with a relaxed, lived-in drape. Soft enough for nightly rest, tailored enough for a considered bedroom.",
    features: [
      "Stonewashed linen blend",
      "Duvet cover with envelope shams",
      "Breathable year-round weight",
      "Machine washable",
    ],
    specifications: {
      Material: "Stonewashed linen blend",
      Includes: "Duvet cover + 2 shams",
      Size: "Queen",
      Color: "Warm ivory",
    },
    price: 148,
    salePrice: 128,
    rating: 4.8,
    reviews: 214,
    stock: 36,
    badge: "Sale",
    featured: true,
    bestseller: true,
    sku: "ROS-HM-014",
  },
  {
    id: "p2",
    slug: "haven-knit-throw",
    name: "Haven Knit Throw",
    category: "Home",
    categorySlug: "home",
    query: "knit throw blanket",
    style: "neutral",
    description:
      "A substantial knit throw for sofas, reading chairs, and cool evenings. The stitch is open enough to drape, dense enough to feel finished.",
    features: [
      "Chunky knit construction",
      "Generous sofa-length drape",
      "Soft, low-pill yarn",
      "Tassel-free clean edges",
    ],
    specifications: {
      Material: "Cotton-acrylic knit",
      Dimensions: "50 × 60 in",
      Weight: "2.4 lb",
      Color: "Oatmeal",
    },
    price: 68,
    rating: 4.7,
    reviews: 189,
    stock: 54,
    featured: true,
    sku: "ROS-HM-021",
  },
  {
    id: "p3",
    slug: "solace-ceramic-vessel",
    name: "Solace Ceramic Vessel",
    category: "Home",
    categorySlug: "home",
    query: "ceramic vase",
    style: "minimal",
    description:
      "A hand-finished ceramic vessel with a quiet silhouette. Holds a single stem or stands empty as a sculptural accent.",
    features: [
      "Hand-finished glaze",
      "Weighted base",
      "Watertight interior",
      "Works with stems or empty",
    ],
    specifications: {
      Material: "Stoneware ceramic",
      Height: "9.5 in",
      Opening: "3.2 in",
      Color: "Warm clay",
    },
    price: 42,
    rating: 4.6,
    reviews: 97,
    stock: 70,
    sku: "ROS-HM-033",
  },
  {
    id: "p4",
    slug: "tripod-floor-lamp",
    name: "Tripod Floor Lamp",
    category: "Home",
    categorySlug: "home",
    query: "floor lamp",
    style: "minimal",
    description:
      "A sculptural tripod floor lamp in warm terracotta metal. The shade tilts to wash a chair, a corner, or a page.",
    features: [
      "Powder-coated steel",
      "Adjustable shade",
      "Stable tripod base",
      "In-line switch",
    ],
    specifications: {
      Material: "Powder-coated steel",
      Height: "58 in",
      Shade: "Tilted metal cone",
      Color: "Terracotta",
    },
    price: 168,
    rating: 4.6,
    reviews: 64,
    stock: 18,
    featured: true,
    sku: "ROS-HM-040",
  },

  // KITCHEN
  {
    id: "p5",
    slug: "grove-stoneware-dinner-plates",
    name: "Grove Stoneware Dinner Plates",
    category: "Kitchen & Dining",
    categorySlug: "kitchen-dining",
    query: "stoneware dinner plate",
    style: "studio",
    description:
      "A set of four dinner plates in matte stoneware. The rim is quietly raised, the surface is made for everyday meals rather than display cabinets.",
    features: [
      "Set of four plates",
      "Chip-resistant stoneware",
      "Microwave and dishwasher safe",
      "Matte, food-friendly glaze",
    ],
    specifications: {
      Material: "Stoneware",
      Diameter: "10.5 in",
      Pieces: "4",
      Color: "Warm sand",
    },
    price: 64,
    rating: 4.8,
    reviews: 156,
    stock: 48,
    bestseller: true,
    sku: "ROS-KD-012",
  },
  {
    id: "p6",
    slug: "hearthwood-cutting-board",
    name: "Hearthwood Cutting Board",
    category: "Kitchen & Dining",
    categorySlug: "kitchen-dining",
    query: "wooden cutting board",
    style: "rustic",
    description:
      "A thick bamboo board for daily prep and casual serving. Juice-friendly surface on one side, a handle cutout for hanging.",
    features: [
      "Bamboo construction",
      "Integrated handle cutout",
      "Food-safe oil finish",
      "Reversible prep surface",
    ],
    specifications: {
      Material: "Bamboo",
      Dimensions: "16 × 11 × 0.75 in",
      Finish: "Food-safe oil",
      Color: "Natural bamboo",
    },
    price: 54,
    rating: 4.7,
    reviews: 203,
    stock: 41,
    featured: true,
    sku: "ROS-KD-018",
  },
  {
    id: "p7",
    slug: "ember-cast-iron-skillet",
    name: "Ember Cast Iron Skillet",
    category: "Kitchen & Dining",
    categorySlug: "kitchen-dining",
    query: "cast iron skillet",
    style: "studio",
    description:
      "A pre-seasoned 10-inch skillet that moves from stovetop to oven. Built for searing, roasting, and the kind of cooking that rewards patience.",
    features: [
      "Pre-seasoned cooking surface",
      "Even heat retention",
      "Oven-safe to 500°F",
      "Helper handle",
    ],
    specifications: {
      Material: "Cast iron",
      Diameter: "10 in",
      "Oven Safe": "500°F",
      Color: "Matte black",
    },
    price: 49,
    salePrice: 42,
    rating: 4.9,
    reviews: 318,
    stock: 60,
    badge: "Sale",
    bestseller: true,
    sku: "ROS-KD-027",
  },
  {
    id: "p8",
    slug: "everyday-ceramic-mugs",
    name: "Everyday Ceramic Mugs",
    category: "Kitchen & Dining",
    categorySlug: "kitchen-dining",
    query: "ceramic mug",
    style: "studio",
    description:
      "A pair of simple ceramic mugs with a slightly tapered body and a comfortable handle. Made for daily coffee, not display.",
    features: [
      "Set of two mugs",
      "Chip-resistant ceramic",
      "Dishwasher and microwave safe",
      "Comfort-grip handle",
    ],
    specifications: {
      Material: "Ceramic",
      Capacity: "12 oz each",
      Pieces: "2",
      Color: "Gloss white",
    },
    price: 28,
    rating: 4.7,
    reviews: 186,
    stock: 80,
    sku: "ROS-KD-031",
  },

  // TRAVEL
  {
    id: "p9",
    slug: "northbound-canvas-weekender",
    name: "Northbound Canvas Weekender",
    category: "Travel",
    categorySlug: "travel",
    query: "canvas weekender bag",
    style: "editorial",
    description:
      "A soft canvas weekender with leather-trimmed handles. Packs a long weekend without looking overbuilt, and sits well beside the door.",
    features: [
      "Heavyweight canvas body",
      "Leather-trimmed handles",
      "Detachable shoulder strap",
      "Wide zip opening",
    ],
    specifications: {
      Material: "Canvas + leather trim",
      Dimensions: "20 × 11 × 10 in",
      Capacity: "35L",
      Color: "Camel",
    },
    price: 189,
    rating: 4.8,
    reviews: 88,
    stock: 18,
    featured: true,
    bestseller: true,
    sku: "ROS-TR-008",
  },
  {
    id: "p10",
    slug: "saffron-travel-pack",
    name: "Saffron Travel Pack",
    category: "Travel",
    categorySlug: "travel",
    query: "travel backpack",
    style: "lifestyle",
    description:
      "A structured canvas travel pack with a front pocket and padded straps. Light enough for a day, capable enough for a short trip.",
    features: [
      "Water-resistant canvas",
      "Padded shoulder straps",
      "Front organizer pocket",
      "Top grab handle",
    ],
    specifications: {
      Material: "Canvas",
      Capacity: "22L",
      Dimensions: "17 × 12 × 6 in",
      Color: "Saffron",
    },
    price: 88,
    salePrice: 74,
    rating: 4.6,
    reviews: 119,
    stock: 32,
    badge: "Sale",
    sku: "ROS-TR-016",
  },
  {
    id: "p11",
    slug: "fieldnote-pocket-journal",
    name: "Fieldnote Pocket Journal",
    category: "Travel",
    categorySlug: "travel",
    query: "passport holder",
    style: "minimal",
    description:
      "A compact leather-covered pocket journal for notes, lists, and travel details. Slim enough for a jacket pocket.",
    features: [
      "Leather-wrapped cover",
      "Lined pocket pages",
      "Elastic closure",
      "Fits a jacket pocket",
    ],
    specifications: {
      Material: "Leather-wrapped board",
      Size: "3.5 × 5.5 in",
      Pages: "96",
      Color: "Cognac",
    },
    price: 32,
    rating: 4.5,
    reviews: 108,
    stock: 74,
    newArrival: true,
    sku: "ROS-TR-022",
  },
  {
    id: "p12",
    slug: "harbor-leather-messenger",
    name: "Harbor Leather Messenger",
    category: "Travel",
    categorySlug: "travel",
    query: "messenger bag",
    style: "editorial",
    description:
      "A worn-in leather messenger with a flap closure and a comfortable strap. Sized for a slim laptop, a notebook, and the day ahead.",
    features: [
      "Full-grain leather",
      "Adjustable shoulder strap",
      "Padded laptop sleeve",
      "Front organizer pocket",
    ],
    specifications: {
      Material: "Full-grain leather",
      Dimensions: "15 × 11 × 4 in",
      Fits: "Up to 13 in laptop",
      Color: "Cognac",
    },
    price: 148,
    rating: 4.7,
    reviews: 92,
    stock: 21,
    featured: true,
    sku: "ROS-TR-029",
  },

  // OUTDOOR
  {
    id: "p13",
    slug: "meadow-picnic-blanket",
    name: "Meadow Picnic Blanket",
    category: "Outdoor & Recreation",
    categorySlug: "outdoor",
    query: "picnic blanket",
    style: "lifestyle",
    description:
      "A water-resistant picnic blanket that folds into its own carry strap. Soft on top, practical underneath, sized for two with room to spare.",
    features: [
      "Water-resistant backing",
      "Machine-washable face",
      "Integrated carry straps",
      "Sand-shedding weave",
    ],
    specifications: {
      Material: "Cotton blend + PE backing",
      "Open Size": "70 × 55 in",
      Packed: "14 × 8 in",
      Color: "Warm plaid",
    },
    price: 48,
    rating: 4.7,
    reviews: 133,
    stock: 51,
    featured: true,
    sku: "ROS-OD-011",
  },
  {
    id: "p14",
    slug: "trailwell-insulated-bottle",
    name: "Trailwell Insulated Bottle",
    category: "Outdoor & Recreation",
    categorySlug: "outdoor",
    query: "insulated outdoor bottle",
    style: "studio",
    description:
      "A double-wall steel bottle that keeps drinks cold through a long afternoon. Narrow enough for a bag pocket, sturdy enough for the trail.",
    features: [
      "Double-wall vacuum insulation",
      "Leak-proof lid",
      "Sweat-free exterior",
      "Fits most cup holders",
    ],
    specifications: {
      Capacity: "24 oz",
      Material: "18/8 stainless steel",
      Insulation: "Cold 24 hrs / hot 12 hrs",
      Color: "Matte olive",
    },
    price: 34,
    rating: 4.8,
    reviews: 247,
    stock: 90,
    bestseller: true,
    sku: "ROS-OD-019",
  },
  {
    id: "p15",
    slug: "gardenhand-tool-set",
    name: "Gardenhand Tool Set",
    category: "Outdoor & Recreation",
    categorySlug: "outdoor",
    query: "garden tools",
    style: "rustic",
    description:
      "A three-piece hand-tool set for beds, pots, and weekend planting. Ash handles, carbon-steel heads, and a canvas roll for storage.",
    features: [
      "Trowel, fork, and transplanter",
      "Ash wood handles",
      "Carbon-steel heads",
      "Canvas storage roll",
    ],
    specifications: {
      Pieces: "3 tools + roll",
      Material: "Carbon steel + ash",
      "Handle Length": "5.5 in",
      Color: "Natural / steel",
    },
    price: 44,
    rating: 4.5,
    reviews: 84,
    stock: 38,
    sku: "ROS-OD-024",
  },
  {
    id: "p16",
    slug: "porchfire-lantern",
    name: "Porchfire Lantern",
    category: "Outdoor & Recreation",
    categorySlug: "outdoor",
    query: "camping lantern",
    style: "outdoor",
    description:
      "A rechargeable lantern with a warm, even glow for porches, patios, and overnight camps. Dimmable, hangable, and quiet in the dark.",
    features: [
      "Rechargeable LED",
      "Stepless dimming",
      "Hang hook and base stand",
      "Warm 2700K light",
    ],
    specifications: {
      Runtime: "Up to 40 hrs",
      Output: "300 lumens",
      Charge: "USB-C",
      Color: "Antique brass",
    },
    price: 56,
    rating: 4.6,
    reviews: 91,
    stock: 29,
    newArrival: true,
    sku: "ROS-OD-030",
  },

  // APPAREL
  {
    id: "p17",
    slug: "merino-knit-edit",
    name: "Merino Knit Edit",
    category: "Apparel",
    categorySlug: "apparel",
    query: "knit sweater",
    style: "editorial",
    n: 1,
    description:
      "Fine-gauge knit swatches in oatmeal, charcoal, navy, and clay. A seasonal edit of crew textures for layering through cooler months.",
    features: [
      "Fine-gauge merino blend",
      "Seasonal color edit",
      "Soft, low-itch hand",
      "Ribbed finish",
    ],
    specifications: {
      Material: "Merino blend",
      Fit: "Relaxed crew",
      Care: "Hand wash cold",
      Color: "Neutral mix",
    },
    price: 98,
    rating: 4.7,
    reviews: 112,
    stock: 34,
    featured: true,
    sku: "ROS-AP-007",
  },
  {
    id: "p18",
    slug: "everyday-cotton-crews",
    name: "Everyday Cotton Crews",
    category: "Apparel",
    categorySlug: "apparel",
    query: "cotton tshirt",
    style: "minimal",
    description:
      "A stacked set of midweight cotton crews in considered neutrals. Soft, pre-shrunk, and meant to be worn on rotation.",
    features: [
      "Midweight combed cotton",
      "Set of folded crews",
      "Pre-shrunk knit",
      "Ribbed collar",
    ],
    specifications: {
      Material: "100% combed cotton",
      Weight: "180 gsm",
      Fit: "Regular",
      Color: "Neutral mix",
    },
    price: 32,
    rating: 4.6,
    reviews: 198,
    stock: 120,
    bestseller: true,
    sku: "ROS-AP-014",
  },
  {
    id: "p19",
    slug: "stretch-chino-trousers",
    name: "Stretch Chino Trousers",
    category: "Apparel",
    categorySlug: "apparel",
    query: "chino trousers",
    style: "modern",
    description:
      "Tailored chinos with a hint of stretch for all-day wear. A clean front, a tapered leg, and a waist that sits where it should.",
    features: [
      "Cotton-stretch twill",
      "Tapered leg",
      "Hidden inner drawcord",
      "Wrinkle-resistant finish",
    ],
    specifications: {
      Material: "97% cotton / 3% elastane",
      Rise: "Mid",
      Fit: "Tapered",
      Color: "Khaki stone",
    },
    price: 78,
    rating: 4.5,
    reviews: 87,
    stock: 46,
    sku: "ROS-AP-021",
  },
  {
    id: "p20",
    slug: "cable-knit-scarf",
    name: "Cable Knit Scarf",
    category: "Apparel",
    categorySlug: "apparel",
    query: "wool scarf",
    style: "editorial",
    description:
      "A heavy cable-knit scarf with enough length to wrap twice. Soft wool blend, made for cold mornings and long walks.",
    features: [
      "Wool-blend cable knit",
      "Generous wrap length",
      "Finished fringed ends",
      "Warm without bulk at the neck",
    ],
    specifications: {
      Material: "Wool blend",
      Dimensions: "12 × 72 in",
      Knit: "Cable",
      Color: "Heather grey",
    },
    price: 54,
    salePrice: 46,
    rating: 4.6,
    reviews: 81,
    stock: 39,
    badge: "Sale",
    newArrival: true,
    sku: "ROS-AP-028",
  },

  // ACCESSORIES
  {
    id: "p21",
    slug: "compact-leather-bifold",
    name: "Compact Leather Bifold",
    category: "Accessories",
    categorySlug: "accessories",
    query: "leather wallet",
    style: "premium",
    description:
      "A slim bifold cut from vegetable-tanned leather. Six card slots, a bill compartment, and a profile that stays flat in a pocket.",
    features: [
      "Vegetable-tanned leather",
      "RFID-lined interior",
      "Six card slots",
      "Slim, unlined construction",
    ],
    specifications: {
      Material: "Vegetable-tanned leather",
      Slots: "6 cards + billfold",
      RFID: "Yes",
      Color: "Dark oak",
    },
    price: 58,
    rating: 4.6,
    reviews: 176,
    stock: 65,
    featured: true,
    sku: "ROS-AC-009",
  },
  {
    id: "p22",
    slug: "daylight-polarized-frames",
    name: "Daylight Polarized Frames",
    category: "Accessories",
    categorySlug: "accessories",
    query: "sunglasses",
    style: "editorial",
    description:
      "Acetate frames with polarized lenses and a quietly classic shape. Built for bright days, not for making a statement.",
    features: [
      "Polarized CR-39 lenses",
      "UV400 protection",
      "Hand-polished acetate",
      "Includes hard case",
    ],
    specifications: {
      Lens: "Polarized",
      Protection: "UV400",
      Frame: "Acetate",
      Color: "Tortoise / green",
    },
    price: 86,
    rating: 4.5,
    reviews: 93,
    stock: 40,
    sku: "ROS-AC-015",
  },
  {
    id: "p23",
    slug: "saddle-leather-belt",
    name: "Saddle Leather Belt",
    category: "Accessories",
    categorySlug: "accessories",
    query: "leather belt",
    style: "studio",
    description:
      "A 32mm saddle-leather belt with a brushed brass buckle. Cut to wear in, not to stay stiff.",
    features: [
      "Full-grain saddle leather",
      "Brushed brass buckle",
      "32mm width",
      "Hand-finished edges",
    ],
    specifications: {
      Material: "Full-grain leather",
      Width: "32 mm",
      Buckle: "Brushed brass",
      Color: "Saddle tan",
    },
    price: 64,
    rating: 4.7,
    reviews: 81,
    stock: 52,
    sku: "ROS-AC-020",
  },
  {
    id: "p24",
    slug: "matte-disc-watch",
    name: "Matte Disc Watch",
    category: "Accessories",
    categorySlug: "accessories",
    query: "wristwatch",
    style: "minimal",
    description:
      "A 40mm matte-black watch with a clean disc dial and a soft fabric strap. Quiet enough for workdays, considered enough for evenings.",
    features: [
      "Matte black case",
      "Minimal disc dial",
      "Quick-release fabric strap",
      "Japanese quartz movement",
    ],
    specifications: {
      Case: "40 mm matte black",
      Movement: "Japanese quartz",
      Water: "3 ATM",
      Color: "Black / white dial",
    },
    price: 164,
    rating: 4.6,
    reviews: 67,
    stock: 24,
    featured: true,
    sku: "ROS-AC-026",
  },

  // PERSONAL ESSENTIALS
  {
    id: "p25",
    slug: "cloudweave-bath-towel-set",
    name: "Cloudweave Bath Towel Set",
    category: "Personal Essentials",
    categorySlug: "personal-essentials",
    query: "bath towel set",
    style: "neutral",
    description:
      "A four-piece towel set in long-staple cotton. Dense enough to dry quickly, soft enough to keep after years of washing.",
    features: [
      "Long-staple cotton terry",
      "Two bath towels + two hand towels",
      "Quick-dry looped pile",
      "Reinforced edges",
    ],
    specifications: {
      Material: "100% cotton",
      Weight: "650 GSM",
      Pieces: "4",
      Color: "Warm stone",
    },
    price: 72,
    salePrice: 62,
    rating: 4.8,
    reviews: 241,
    stock: 58,
    badge: "Sale",
    bestseller: true,
    sku: "ROS-PE-006",
  },
  {
    id: "p26",
    slug: "amberwood-scented-candle",
    name: "Amberwood Scented Candle",
    category: "Personal Essentials",
    categorySlug: "personal-essentials",
    query: "scented candle",
    style: "editorial",
    description:
      "A soy-blend candle in a reusable glass jar with a wood wick. Slow-burning and quietly scented.",
    features: [
      "Soy-blend wax",
      "Cotton wick",
      "Reusable glass jar",
      "55-hour burn time",
    ],
    specifications: {
      Wax: "Soy blend",
      Burn: "55 hours",
      Weight: "8 oz",
      Scent: "Cedar / amber",
    },
    price: 36,
    rating: 4.7,
    reviews: 158,
    stock: 72,
    featured: true,
    sku: "ROS-PE-013",
  },
  {
    id: "p27",
    slug: "travel-grooming-kit",
    name: "Travel Grooming Kit",
    category: "Personal Essentials",
    categorySlug: "personal-essentials",
    query: "grooming kit",
    style: "premium",
    description:
      "A compact leather-trimmed kit with the essentials for a short trip. Zippered, organized, and sized for a carry-on pocket.",
    features: [
      "Leather-trimmed canvas case",
      "Interior organizer pockets",
      "Water-resistant lining",
      "Wide-mouth zip opening",
    ],
    specifications: {
      Material: "Waxed canvas + leather",
      Dimensions: "9 × 5 × 4 in",
      Closure: "YKK zip",
      Color: "Charcoal",
    },
    price: 48,
    rating: 4.5,
    reviews: 69,
    stock: 43,
    newArrival: true,
    sku: "ROS-PE-018",
  },
  {
    id: "p28",
    slug: "botanical-soap-collection",
    name: "Botanical Soap Collection",
    category: "Personal Essentials",
    categorySlug: "personal-essentials",
    query: "soap bar set",
    style: "studio",
    description:
      "Three cold-process soap bars scented with botanical oils. Unscented enough for daily use, considered enough to keep by the sink.",
    features: [
      "Set of three bars",
      "Cold-process formula",
      "Plant-based oils",
      "Paper-wrapped, plastic-free",
    ],
    specifications: {
      Pieces: "3 bars",
      Weight: "4 oz each",
      Base: "Olive + coconut oil",
      Scent: "Cedar, citrus, unscented",
    },
    price: 24,
    rating: 4.6,
    reviews: 104,
    stock: 96,
    sku: "ROS-PE-025",
  },

  // FITNESS
  {
    id: "p29",
    slug: "studio-alignment-mat",
    name: "Studio Alignment Mat",
    category: "Fitness & Wellness",
    categorySlug: "fitness-wellness",
    query: "yoga mat",
    style: "minimal",
    description:
      "A 5mm natural-rubber mat with a closed-cell surface. Grippy when warm, quiet on wood floors, and dense enough for knees.",
    features: [
      "Natural rubber base",
      "Subtle alignment marks",
      "Closed-cell surface",
      "Includes carry strap",
    ],
    specifications: {
      Thickness: "5 mm",
      Dimensions: "71 × 24 in",
      Material: "Natural rubber",
      Color: "Teal",
    },
    price: 68,
    rating: 4.8,
    reviews: 187,
    stock: 47,
    featured: true,
    bestseller: true,
    sku: "ROS-FW-010",
  },
  {
    id: "p30",
    slug: "recovery-foam-roller",
    name: "Recovery Foam Roller",
    category: "Fitness & Wellness",
    categorySlug: "fitness-wellness",
    query: "foam roller",
    style: "studio",
    description:
      "A firm, high-density roller for post-session recovery. Smooth enough for daily use, dense enough to actually do the work.",
    features: [
      "High-density EVA foam",
      "Smooth, even surface",
      "Hollow, lightweight core",
      "Guide card included",
    ],
    specifications: {
      Length: "18 in",
      Diameter: "6 in",
      Material: "EVA foam",
      Color: "Charcoal",
    },
    price: 28,
    rating: 4.6,
    reviews: 139,
    stock: 64,
    sku: "ROS-FW-016",
  },
  {
    id: "p31",
    slug: "cast-iron-kettlebell",
    name: "Cast Iron Kettlebell",
    category: "Fitness & Wellness",
    categorySlug: "fitness-wellness",
    query: "kettlebell",
    style: "studio",
    description:
      "A single 20kg cast-iron kettlebell with a wide, comfortable handle. Uncoated, honest, and built for swings, squats, and slow strength work.",
    features: [
      "Solid cast iron",
      "Wide grip handle",
      "Flat, stable base",
      "Single 20kg weight",
    ],
    specifications: {
      Weight: "20 kg / 44 lb",
      Material: "Cast iron",
      Handle: "Wide grip",
      Color: "Raw iron",
    },
    price: 64,
    rating: 4.7,
    reviews: 94,
    stock: 28,
    sku: "ROS-FW-022",
  },
  {
    id: "p32",
    slug: "daily-training-bottle",
    name: "Daily Training Bottle",
    category: "Fitness & Wellness",
    categorySlug: "fitness-wellness",
    query: "sports bottle",
    style: "minimal",
    description:
      "A wide-mouth training bottle with a leak-resistant lid and measurement marks. Designed for the gym bag and the desk in equal measure.",
    features: [
      "BPA-free Tritan",
      "Wide-mouth opening",
      "Leak-resistant lid",
      "Ounce and milliliter marks",
    ],
    specifications: {
      Capacity: "32 oz",
      Material: "Tritan",
      Lid: "Flip-top",
      Color: "Clear / olive lid",
    },
    price: 22,
    rating: 4.5,
    reviews: 162,
    stock: 110,
    newArrival: true,
    sku: "ROS-FW-028",
  },

  // TECH
  {
    id: "p33",
    slug: "gooseneck-desk-lamp",
    name: "Gooseneck Desk Lamp",
    category: "Tech & Everyday Gadgets",
    categorySlug: "tech",
    query: "clip desk light",
    style: "lifestyle",
    description:
      "A flexible gooseneck lamp for desks and nightstands. Directs a clean pool of light without taking over the surface.",
    features: [
      "Flexible gooseneck arm",
      "Weighted round base",
      "Warm white LED",
      "In-line switch",
    ],
    specifications: {
      Height: "18 in flexible",
      Light: "Warm white LED",
      Base: "Weighted metal",
      Color: "Matte white",
    },
    price: 46,
    rating: 4.6,
    reviews: 131,
    stock: 44,
    featured: true,
    sku: "ROS-TC-008",
  },
  {
    id: "p34",
    slug: "quiet-wall-clock",
    name: "Quiet Wall Clock",
    category: "Tech & Everyday Gadgets",
    categorySlug: "tech",
    query: "wall clock",
    style: "minimal",
    description:
      "A simple analog wall clock with a silent sweep movement. White face, dark hands, nothing extra.",
    features: [
      "Silent sweep movement",
      "Easy-read numerals",
      "Lightweight case",
      "Single AA battery",
    ],
    specifications: {
      Diameter: "10 in",
      Movement: "Silent quartz",
      Power: "1 AA battery",
      Color: "White / navy hands",
    },
    price: 34,
    rating: 4.5,
    reviews: 88,
    stock: 50,
    sku: "ROS-TC-014",
  },
  {
    id: "p35",
    slug: "heritage-bell-alarm",
    name: "Heritage Bell Alarm",
    category: "Tech & Everyday Gadgets",
    categorySlug: "tech",
    query: "digital alarm clock",
    style: "studio",
    description:
      "A mechanical twin-bell alarm with a painted steel case and a classic analog face. Wound by hand, it wakes the room without a screen.",
    features: [
      "Twin-bell mechanical alarm",
      "Analog face with luminous numerals",
      "Steel case with carry handle",
      "No screen, no charging",
    ],
    specifications: {
      Movement: "Mechanical wind-up",
      Face: "Analog",
      Case: "Painted steel",
      Color: "Sage green",
    },
    price: 38,
    rating: 4.4,
    reviews: 71,
    stock: 39,
    sku: "ROS-TC-019",
  },
  {
    id: "p36",
    slug: "studio-belt-drive-turntable",
    name: "Studio Belt-Drive Turntable",
    category: "Tech & Everyday Gadgets",
    categorySlug: "tech",
    query: "turntable",
    style: "editorial",
    description:
      "A compact belt-drive turntable with a straightforward tonearm and a quiet plinth. Made for listening, not for display lighting.",
    features: [
      "Belt-drive platter",
      "Straight tonearm",
      "Built-in preamp",
      "RCA + headphone out",
    ],
    specifications: {
      Drive: "Belt",
      Speeds: "33 / 45 RPM",
      Preamp: "Switchable",
      Color: "Warm grey",
    },
    price: 189,
    rating: 4.7,
    reviews: 47,
    stock: 14,
    newArrival: true,
    sku: "ROS-TC-025",
  },

  // OFFICE
  {
    id: "p37",
    slug: "clothbound-desk-journal",
    name: "Clothbound Desk Journal",
    category: "Office / Workspace",
    categorySlug: "office",
    query: "hardcover notebook",
    style: "editorial",
    description:
      "A clothbound journal with numbered pages and a ribbon marker. Heavy enough to sit open on a desk, compact enough for a bag.",
    features: [
      "Cloth-wrapped hardcover",
      "Numbered pages",
      "Ribbon marker + elastic",
      "Lay-flat binding",
    ],
    specifications: {
      Pages: "240, 100 gsm",
      Size: "A5",
      Ruling: "Dot grid",
      Color: "Olive cloth",
    },
    price: 28,
    rating: 4.8,
    reviews: 204,
    stock: 88,
    featured: true,
    bestseller: true,
    sku: "ROS-OF-005",
  },
  {
    id: "p38",
    slug: "brass-fountain-pen",
    name: "Fine Steel Nib Pen",
    category: "Office / Workspace",
    categorySlug: "office",
    query: "fountain pen",
    style: "premium",
    description:
      "A fountain pen with a polished steel nib and a balanced barrel. Made for daily writing, not for a display case.",
    features: [
      "Solid brass body",
      "Fine steel nib",
      "Cartridge and converter",
      "Threaded cap",
    ],
    specifications: {
      Material: "Brass",
      Nib: "Fine steel",
      Fill: "Cartridge / converter",
      Color: "Raw brass",
    },
    price: 46,
    rating: 4.6,
    reviews: 77,
    stock: 42,
    sku: "ROS-OF-011",
  },
  {
    id: "p39",
    slug: "studio-pencil-set",
    name: "Studio Pencil Set",
    category: "Office / Workspace",
    categorySlug: "office",
    query: "pencils",
    style: "studio",
    description:
      "A set of sharpened graphite and color pencils for notes, sketches, and the margin of a planner. Simple tools, kept together.",
    features: [
      "Graphite and color pencils",
      "Pre-sharpened",
      "Break-resistant cores",
      "Stored in a slim sleeve",
    ],
    specifications: {
      Pieces: "12",
      Core: "Graphite + color",
      Length: "7 in",
      Color: "Assorted",
    },
    price: 18,
    rating: 4.5,
    reviews: 96,
    stock: 90,
    sku: "ROS-OF-017",
  },
  {
    id: "p40",
    slug: "weekly-desk-planner",
    name: "Weekly Desk Planner",
    category: "Office / Workspace",
    categorySlug: "office",
    query: "weekly planner",
    style: "studio",
    description:
      "An undated weekly planner with a calm layout and enough space to actually write. Linen cover, lay-flat pages, no gimmicks.",
    features: [
      "Undated weekly spreads",
      "Linen hardcover",
      "Lay-flat binding",
      "Notes pages at the back",
    ],
    specifications: {
      Format: "Weekly + notes",
      Size: "A5",
      Pages: "128",
      Color: "Taupe linen",
    },
    price: 26,
    rating: 4.5,
    reviews: 91,
    stock: 70,
    newArrival: true,
    sku: "ROS-OF-023",
  },

  // STORAGE
  {
    id: "p41",
    slug: "seagrass-storage-basket",
    name: "Seagrass Storage Basket",
    category: "Storage & Organization",
    categorySlug: "storage",
    query: "woven storage basket",
    style: "neutral",
    description:
      "A handwoven seagrass basket with leather-wrapped handles. Holds throws, magazines, or the things that never quite find a drawer.",
    features: [
      "Handwoven seagrass",
      "Leather-wrapped handles",
      "Reinforced rim",
      "Open, breathable weave",
    ],
    specifications: {
      Material: "Seagrass + leather",
      Dimensions: "16 × 12 × 10 in",
      Handles: "Leather wrap",
      Color: "Natural",
    },
    price: 44,
    rating: 4.7,
    reviews: 146,
    stock: 49,
    featured: true,
    sku: "ROS-ST-008",
  },
  {
    id: "p42",
    slug: "lidded-canvas-storage-box",
    name: "Lidded Canvas Storage Box",
    category: "Storage & Organization",
    categorySlug: "storage",
    query: "storage box",
    style: "minimal",
    description:
      "A rigid canvas box with a lift-off lid. Stacks cleanly on a shelf and hides the visual noise of everyday storage.",
    features: [
      "Rigid canvas construction",
      "Lift-off lid",
      "Stackable profile",
      "Interior label slot",
    ],
    specifications: {
      Material: "Cotton canvas + board",
      Dimensions: "14 × 10 × 8 in",
      Lid: "Lift-off",
      Color: "Stone",
    },
    price: 36,
    rating: 4.5,
    reviews: 88,
    stock: 55,
    sku: "ROS-ST-014",
  },
  {
    id: "p43",
    slug: "entryway-coat-hooks",
    name: "Entryway Coat Hooks",
    category: "Storage & Organization",
    categorySlug: "storage",
    query: "coat hooks",
    style: "modern",
    description:
      "A four-hook rail in brushed metal for coats, bags, and keys. Mounts with concealed hardware for a quiet entryway.",
    features: [
      "Four-hook rail",
      "Brushed metal finish",
      "Concealed mounting",
      "Hardware included",
    ],
    specifications: {
      Material: "Brushed steel",
      Length: "24 in",
      Hooks: "4",
      Color: "Warm steel",
    },
    price: 38,
    rating: 4.6,
    reviews: 73,
    stock: 40,
    sku: "ROS-ST-019",
  },
  {
    id: "p44",
    slug: "soft-sided-laundry-hamper",
    name: "Soft-Sided Laundry Hamper",
    category: "Storage & Organization",
    categorySlug: "storage",
    query: "laundry hamper",
    style: "lifestyle",
    description:
      "A collapsible linen-look hamper with a removable liner. Stands on its own, folds when you need the floor back.",
    features: [
      "Collapsible frame",
      "Removable liner",
      "Side handles",
      "Breathable fabric",
    ],
    specifications: {
      Capacity: "60 L",
      Material: "Linen-look polyester",
      Dimensions: "14 × 14 × 24 in",
      Color: "Warm grey",
    },
    price: 42,
    rating: 4.4,
    reviews: 62,
    stock: 33,
    sku: "ROS-ST-025",
  },

  // GIFTS
  {
    id: "p45",
    slug: "curated-gift-box",
    name: "Curated Gift Box",
    category: "Gifts",
    categorySlug: "gifts",
    query: "gift box",
    style: "editorial",
    description:
      "A ready-to-give box with a candle, notebook, and small ceramic dish, packed in tissue and a reusable carton. Nothing loud, nothing leftover.",
    features: [
      "Candle, journal, and ceramic dish",
      "Tissue-lined carton",
      "Reusable box",
      "Blank gift card included",
    ],
    specifications: {
      Includes: "3 items + box",
      Presentation: "Tissue-lined carton",
      Occasion: "Housewarming / thanks",
      Color: "Neutral assortment",
    },
    price: 78,
    rating: 4.8,
    reviews: 54,
    stock: 26,
    featured: true,
    sku: "ROS-GF-004",
  },
  {
    id: "p46",
    slug: "sienna-chess-pieces",
    name: "Sienna Chess Pieces",
    category: "Gifts",
    categorySlug: "gifts",
    query: "chess set",
    style: "premium",
    description:
      "A full set of weighted chess pieces in ivory and sienna finishes. Staunton profile, felted bases, ready for a board you already own.",
    features: [
      "Weighted pieces",
      "Staunton profile",
      "Felted bases",
      "Full 32-piece set",
    ],
    specifications: {
      Pieces: "32",
      Material: "Weighted composite",
      "King Height": "3.75 in",
      Color: "Ivory / sienna",
    },
    price: 92,
    rating: 4.7,
    reviews: 61,
    stock: 19,
    sku: "ROS-GF-011",
  },
  {
    id: "p47",
    slug: "loose-leaf-tea-gift-set",
    name: "Loose-Leaf Tea Gift Set",
    category: "Gifts",
    categorySlug: "gifts",
    query: "tea set",
    style: "lifestyle",
    description:
      "Three tins of loose-leaf tea — a morning black, an afternoon green, and an evening herbal — packed with a simple infuser.",
    features: [
      "Three 2 oz tins",
      "Stainless infuser included",
      "Resealable lids",
      "Tasting notes card",
    ],
    specifications: {
      Includes: "3 teas + infuser",
      Weight: "2 oz per tin",
      Varieties: "Black, green, herbal",
      Origin: "Blended for daily steeping",
    },
    price: 42,
    rating: 4.6,
    reviews: 79,
    stock: 34,
    bestseller: true,
    sku: "ROS-GF-017",
  },
  {
    id: "p48",
    slug: "pour-over-coffee-set",
    name: "Pour-Over Coffee Set",
    category: "Gifts",
    categorySlug: "gifts",
    query: "pour over coffee set",
    style: "studio",
    description:
      "A ceramic dripper, a glass carafe, and a small stack of filters. The morning ritual, without extra machinery on the counter.",
    features: [
      "Ceramic dripper",
      "Heat-safe glass carafe",
      "40 paper filters",
      "Gooseneck-friendly design",
    ],
    specifications: {
      Carafe: "20 oz glass",
      Dripper: "Ceramic, size 02",
      Filters: "40 included",
      Color: "Ivory / clear",
    },
    price: 58,
    salePrice: 49,
    rating: 4.7,
    reviews: 102,
    stock: 30,
    badge: "Sale",
    newArrival: true,
    sku: "ROS-GF-022",
  },
];

const categoryMeta = [
  {
    id: "1",
    slug: "home",
    name: "Home",
    description: "Quiet pieces for living rooms, bedrooms, and the corners in between.",
    query: "linen bedding set",
    style: "editorial",
  },
  {
    id: "2",
    slug: "kitchen-dining",
    name: "Kitchen & Dining",
    description: "Tableware and tools for everyday cooking and unhurried meals.",
    query: "stoneware dinner plate",
    style: "studio",
  },
  {
    id: "3",
    slug: "travel",
    name: "Travel",
    description: "Bags and carry pieces for weekends, commutes, and longer trips.",
    query: "leather weekender bag",
    style: "premium",
  },
  {
    id: "4",
    slug: "outdoor",
    name: "Outdoor & Recreation",
    description: "Considered gear for parks, porches, and time outside.",
    query: "picnic blanket",
    style: "lifestyle",
  },
  {
    id: "5",
    slug: "apparel",
    name: "Apparel",
    description: "Seasonal layers and everyday clothing with a calm, modern cut.",
    query: "knit sweater",
    style: "editorial",
  },
  {
    id: "6",
    slug: "accessories",
    name: "Accessories",
    description: "Leather goods, eyewear, and small pieces that finish a look.",
    query: "leather wallet",
    style: "premium",
  },
  {
    id: "7",
    slug: "personal-essentials",
    name: "Personal Essentials",
    description: "Bath, scent, and grooming for a considered daily routine.",
    query: "bath towel set",
    style: "neutral",
  },
  {
    id: "8",
    slug: "fitness-wellness",
    name: "Fitness & Wellness",
    description: "Studio-ready tools for movement, recovery, and at-home training.",
    query: "yoga mat",
    style: "minimal",
  },
  {
    id: "9",
    slug: "tech",
    name: "Tech & Everyday Gadgets",
    description: "Quiet, useful objects for the desk, nightstand, and travel kit.",
    query: "ceramic table lamp",
    style: "editorial",
  },
  {
    id: "10",
    slug: "office",
    name: "Office / Workspace",
    description: "Stationery and desk tools for focused, uncluttered work.",
    query: "hardcover notebook",
    style: "editorial",
  },
  {
    id: "11",
    slug: "storage",
    name: "Storage & Organization",
    description: "Baskets, boxes, and hooks that keep rooms visually calm.",
    query: "woven storage basket",
    style: "neutral",
  },
  {
    id: "12",
    slug: "gifts",
    name: "Gifts",
    description: "Ready-to-give sets and objects chosen for the long stay.",
    query: "gift box",
    style: "editorial",
  },
];

const siteImages = [
  { key: "hero", query: "linen bedding set", style: "editorial", dest: join(HERO_DIR, "hero-1.jpg"), publicPath: "/hero/hero-1.jpg" },
  { key: "lifestyle", query: "knit throw blanket", style: "lifestyle", dest: join(BANNER_DIR, "lifestyle.jpg"), publicPath: "/banners/lifestyle.jpg" },
  { key: "about", query: "knit throw blanket", style: "lifestyle", dest: join(BANNER_DIR, "about.jpg"), publicPath: "/banners/about.jpg" },
  { key: "promo", query: "leather weekender bag", style: "editorial", dest: join(BANNER_DIR, "featured.jpg"), publicPath: "/banners/featured.jpg" },
  { key: "editorial-product", query: "ceramic vase", style: "editorial", dest: join(BANNER_DIR, "editorial.jpg"), publicPath: "/banners/editorial.jpg" },
  { key: "og", query: "woven storage basket", style: "lifestyle", dest: join(BANNER_DIR, "og.jpg"), publicPath: "/banners/og.jpg" },
];

const audit = [];
const productsOut = [];

for (const product of catalog) {
  const assets = selectImages(product.query, { style: product.style, n: product.n ?? 2 });
  const images = assets.map((asset, index) => {
    const filename = `${product.slug}-${index + 1}.jpg`;
    copyAsset(asset, PRODUCT_DIR, filename);
    return {
      path: publicProductPath(filename),
      libraryId: asset.id,
      libraryName: asset.name,
      libraryType: asset.productType,
      libraryPath: asset.path,
      libraryTags: asset.tags,
    };
  });

  if (images.length === 1) {
    images.push(images[0]);
  }

  audit.push({
    slug: product.slug,
    name: product.name,
    category: product.category,
    query: product.query,
    images: images.map((img) => ({
      path: img.path,
      libraryId: img.libraryId,
      libraryName: img.libraryName,
      libraryType: img.libraryType,
    })),
  });

  const { query, style, n, ...rest } = product;
  productsOut.push({
    ...rest,
    images: images.map((img) => img.path),
  });
}

const categoriesOut = [];
for (const cat of categoryMeta) {
  const asset = selectOne(cat.query, { style: cat.style, seed: Number(cat.id) * 13 });
  const filename = `${cat.slug}.jpg`;
  copyAsset(asset, CATEGORY_DIR, filename);
  const count = productsOut.filter((p) => p.categorySlug === cat.slug).length;
  categoriesOut.push({
    id: cat.id,
    slug: cat.slug,
    name: cat.name,
    image: `/categories/${filename}`,
    description: cat.description,
    productCount: count,
  });
}

const siteImageMap = {};
for (const img of siteImages) {
  const asset = selectOne(img.query, { style: img.style, seed: img.query.length * 9 });
  copyAsset(asset, dirname(img.dest), basename(img.dest));
  siteImageMap[img.key] = {
    publicPath: img.publicPath,
    libraryId: asset.id,
    libraryName: asset.name,
    libraryType: asset.productType,
    libraryPath: asset.path,
  };
}

function tsString(value) {
  return JSON.stringify(value);
}

function renderProduct(p) {
  const lines = [
    "  {",
    `    id: ${tsString(p.id)},`,
    `    slug: ${tsString(p.slug)},`,
    `    name: ${tsString(p.name)},`,
    `    category: ${tsString(p.category)},`,
    `    categorySlug: ${tsString(p.categorySlug)},`,
    `    images: ${tsString(p.images)},`,
    `    description: ${tsString(p.description)},`,
    `    features: ${tsString(p.features)},`,
    `    specifications: ${tsString(p.specifications)},`,
    `    price: ${p.price},`,
  ];
  if (p.salePrice) lines.push(`    salePrice: ${p.salePrice},`);
  lines.push(`    rating: ${p.rating},`);
  lines.push(`    reviews: ${p.reviews},`);
  lines.push(`    stock: ${p.stock},`);
  if (p.badge) lines.push(`    badge: ${tsString(p.badge)},`);
  if (p.featured) lines.push("    featured: true,");
  if (p.bestseller) lines.push("    bestseller: true,");
  if (p.newArrival) lines.push("    newArrival: true,");
  lines.push(`    sku: ${tsString(p.sku)},`);
  lines.push("  },");
  return lines.join("\n");
}

const productsFile = `import { Product } from "@/types";

export const products: Product[] = [
${productsOut.map(renderProduct).join("\n")}
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}

export function getProductsBySlugs(slugs: readonly string[]): Product[] {
  return slugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => p !== undefined);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getBestsellerProducts(): Product[] {
  return products.filter((p) => p.bestseller);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.newArrival);
}

export function getDealProducts(): Product[] {
  return products.filter((p) => p.salePrice);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}

export function getRelatedProducts(product: Product, limit = 8): Product[] {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit);
}

export function getEffectivePrice(product: Product): number {
  return product.salePrice ?? product.price;
}
`;

const categoriesFile = `import { Category } from "@/types";

export const categories: Category[] = ${JSON.stringify(categoriesOut, null, 2)};

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
`;

writeFileSync(join(ROOT, "data/products.ts"), productsFile);
writeFileSync(join(ROOT, "data/categories.ts"), categoriesFile);
writeFileSync(
  join(ROOT, "scripts/rosark-image-audit.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), siteImages: siteImageMap, products: audit }, null, 2)
);

console.log(`Generated ${productsOut.length} products`);
console.log(`Unique library assets used: ${usedIds.size}`);
console.log("Site images:", siteImageMap);
for (const item of audit) {
  console.log(`${item.slug} <- ${item.images.map((i) => `${i.libraryType}/${i.libraryId}`).join(", ")}`);
}
