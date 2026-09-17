"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { searchProducts } from "@/data/products";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";

interface SearchBarProps {
  onClose?: () => void;
}

export function SearchBar({ onClose }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const searchResults = searchQuery.length > 0 ? searchProducts(searchQuery).slice(0, 5) : [];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
      onClose?.();
    }
  };

  return (
    <Container className="py-3">
      <div ref={searchRef} className="relative">
        <form onSubmit={handleSearchSubmit}>
          <div className="relative">
            <button
              type="submit"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Search products"
            >
              <Search className="h-4 w-4" />
            </button>
            <Input
              type="search"
              placeholder="Search home, travel, apparel, and more"
              className="h-11 rounded-none border-border bg-background pl-10 pr-4 text-sm shadow-none"
              value={searchQuery}
              autoFocus
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
            />
          </div>
        </form>

        {searchOpen && searchQuery.trim().length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden border border-border bg-card py-1 shadow-sm">
            {searchResults.length > 0 ? (
              <>
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="flex items-center gap-3 px-3 py-2 transition-colors hover:bg-muted"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                      onClose?.();
                    }}
                  >
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden border border-border">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="40px" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{formatPrice(product.salePrice ?? product.price)}</p>
                    </div>
                  </Link>
                ))}
                <button
                  type="button"
                  className="w-full border-t border-border px-3 py-2 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  onClick={() => {
                    router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchOpen(false);
                    setSearchQuery("");
                    onClose?.();
                  }}
                >
                  View all results for &quot;{searchQuery}&quot;
                </button>
              </>
            ) : (
              <div className="px-3 py-2.5 text-sm text-muted-foreground">
                No products found for &quot;{searchQuery}&quot;.
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
}
