import { Category } from "@/types";

export const categories: Category[] = [
  {
    "id": "1",
    "slug": "home",
    "name": "Home",
    "image": "/categories/home.jpg",
    "description": "Quiet pieces for living rooms, bedrooms, and the corners in between.",
    "productCount": 4
  },
  {
    "id": "2",
    "slug": "kitchen-dining",
    "name": "Kitchen & Dining",
    "image": "/categories/kitchen-dining.jpg",
    "description": "Tableware and tools for everyday cooking and unhurried meals.",
    "productCount": 4
  },
  {
    "id": "3",
    "slug": "travel",
    "name": "Travel",
    "image": "/categories/travel.jpg",
    "description": "Bags and carry pieces for weekends, commutes, and longer trips.",
    "productCount": 4
  },
  {
    "id": "4",
    "slug": "outdoor",
    "name": "Outdoor & Recreation",
    "image": "/categories/outdoor.jpg",
    "description": "Considered gear for parks, porches, and time outside.",
    "productCount": 4
  },
  {
    "id": "5",
    "slug": "apparel",
    "name": "Apparel",
    "image": "/categories/apparel.jpg",
    "description": "Seasonal layers and everyday clothing with a calm, modern cut.",
    "productCount": 4
  },
  {
    "id": "6",
    "slug": "accessories",
    "name": "Accessories",
    "image": "/categories/accessories.jpg",
    "description": "Leather goods, eyewear, and small pieces that finish a look.",
    "productCount": 4
  },
  {
    "id": "7",
    "slug": "personal-essentials",
    "name": "Personal Essentials",
    "image": "/categories/personal-essentials.jpg",
    "description": "Bath, scent, and grooming for a considered daily routine.",
    "productCount": 4
  },
  {
    "id": "8",
    "slug": "fitness-wellness",
    "name": "Fitness & Wellness",
    "image": "/categories/fitness-wellness.jpg",
    "description": "Studio-ready tools for movement, recovery, and at-home training.",
    "productCount": 4
  },
  {
    "id": "9",
    "slug": "tech",
    "name": "Tech & Everyday Gadgets",
    "image": "/categories/tech.jpg",
    "description": "Quiet, useful objects for the desk, nightstand, and travel kit.",
    "productCount": 4
  },
  {
    "id": "10",
    "slug": "office",
    "name": "Office / Workspace",
    "image": "/categories/office.jpg",
    "description": "Stationery and desk tools for focused, uncluttered work.",
    "productCount": 4
  },
  {
    "id": "11",
    "slug": "storage",
    "name": "Storage & Organization",
    "image": "/categories/storage.jpg",
    "description": "Baskets, boxes, and hooks that keep rooms visually calm.",
    "productCount": 4
  },
  {
    "id": "12",
    "slug": "gifts",
    "name": "Gifts",
    "image": "/categories/gifts.jpg",
    "description": "Ready-to-give sets and objects chosen for the long stay.",
    "productCount": 4
  }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
