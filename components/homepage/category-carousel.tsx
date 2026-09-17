"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const lifestyleOrder = [
  "home",
  "kitchen-dining",
  "travel",
  "apparel",
  "outdoor",
  "office",
];

export function CategoryCarousel() {
  const lifestyle = lifestyleOrder
    .map((slug) => categories.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Shop by lifestyle"
          title="Rooms, rituals, and the in-between."
          subtitle="Six ways into the catalog — each with its own pace."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {lifestyle.map((category, index) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className={`group relative overflow-hidden ${index === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}`}
            >
              <div className={`relative overflow-hidden ${index === 0 ? "aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[540px]" : "aspect-[4/3]"}`}>
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes={index === 0 ? "(max-width: 1024px) 100vw, 33vw" : "(max-width: 768px) 50vw, 33vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">
                    {category.productCount} pieces
                  </p>
                  <h3 className="font-serif mt-2 text-2xl md:text-3xl">{category.name}</h3>
                  <p className="mt-2 max-w-xs text-sm text-white/80">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
