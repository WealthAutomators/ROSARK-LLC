import { NavLink } from "@/types";
import { categories } from "./categories";

export const navigationLinks: NavLink[] = [
  { label: "Shop", href: "/shop" },
  {
    label: "Categories",
    href: "/categories",
    children: categories.map((c) => ({
      label: c.name,
      href: `/categories/${c.slug}`,
    })),
  },
  { label: "New", href: "/new-arrivals" },
  { label: "Best Sellers", href: "/best-sellers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Best Sellers", href: "/best-sellers" },
    { label: "Sale", href: "/shop?sale=true" },
  ],
  categories: categories.slice(0, 6).map((c) => ({
    label: c.name,
    href: `/categories/${c.slug}`,
  })),
  customerCare: [
    { label: "Contact", href: "/contact" },
    { label: "Track Order", href: "/track-order" },
    { label: "Shipping", href: "/shipping" },
    { label: "Returns", href: "/returns" },
    { label: "FAQs", href: "/faq" },
  ],
  about: [
    { label: "Our Story", href: "/about" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

export const paymentMethods = [
  { name: "Visa", icon: "/payments/visa.svg" },
  { name: "Mastercard", icon: "/payments/mastercard.svg" },
  { name: "Amex", icon: "/payments/amex.svg" },
  { name: "PayPal", icon: "/payments/paypal.svg" },
  { name: "Apple Pay", icon: "/payments/apple-pay.svg" },
];
