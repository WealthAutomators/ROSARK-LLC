"use client";

import Image from "next/image";
import Link from "next/link";
import { editorialShowcase, homepageEditorialSlugs } from "@/data/homepage";
import { getProductsBySlugs } from "@/data/products";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";

export function EditorialShowcase() {
  const products = getProductsBySlugs(homepageEditorialSlugs);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={editorialShowcase.image}
              alt={editorialShowcase.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="lg:sticky lg:top-28">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              {editorialShowcase.eyebrow}
            </p>
            <h2 className="font-serif mt-4 text-3xl font-medium tracking-tight md:text-5xl">
              {editorialShowcase.title}
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              {editorialShowcase.description}
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href={editorialShowcase.buttonLink}>{editorialShowcase.buttonText}</Link>
            </Button>
            <div className="mt-10 grid grid-cols-2 gap-4">
              {products.slice(0, 2).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
