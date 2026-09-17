"use client";

import { getProductById } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function WishlistContent() {
  const { wishlist, isHydrated } = useWishlist();
  const products = wishlist.map((id) => getProductById(id)).filter(Boolean);

  if (!isHydrated) {
    return (
      <Container className="py-16">
        <h1 className="font-serif text-3xl font-medium tracking-tight md:text-5xl">Wishlist</h1>
      </Container>
    );
  }

  if (products.length === 0) {
    return (
      <Container className="py-16 text-center">
        <h1 className="text-3xl font-semibold">Wishlist</h1>
        <p className="mt-4 text-muted-foreground">You haven&apos;t saved any items yet.</p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/shop">Browse Products</Link>
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-8 md:py-12">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Wishlist</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {products.map((product) => product && <ProductCard key={product.id} product={product} />)}
      </div>
    </Container>
  );
}
