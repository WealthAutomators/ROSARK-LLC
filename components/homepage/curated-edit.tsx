"use client";

import { homepageCuratedSlugs } from "@/data/homepage";
import { getProductsBySlugs } from "@/data/products";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Carousel } from "@/components/ui/carousel";
import { ProductCard } from "@/components/product/product-card";

export function CuratedEdit() {
  const products = getProductsBySlugs(homepageCuratedSlugs);

  return (
    <section className="bg-muted/60 py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="The weekend edit"
          title="Packed, but not in a hurry."
          subtitle="Travel pieces and outdoor companions for leaving the house well."
          viewMoreLink="/categories/travel"
        />
        <Carousel slidesToShow={4} className="px-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
