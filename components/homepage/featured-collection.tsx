"use client";

import { featuredCollection, homepageFeaturedSlugs } from "@/data/homepage";
import { getProductsBySlugs } from "@/data/products";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/product/product-card";

export function FeaturedCollection() {
  const products = getProductsBySlugs(homepageFeaturedSlugs);

  return (
    <section className="bg-card py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Featured collection"
          title={featuredCollection.title}
          subtitle={featuredCollection.description}
          viewMoreLink={`/categories/${featuredCollection.categorySlug}`}
        />
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
