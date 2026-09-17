"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { company } from "@/data/company";
import { navigationLinks } from "@/data/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/navbar/search-bar";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { itemCount, isHydrated: cartHydrated } = useCart();
  const { wishlist, isHydrated: wishlistHydrated } = useWishlist();

  return (
    <header className="border-b border-border bg-card">
      <Container>
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-3 lg:h-[4.5rem]">
          <nav className="hidden items-center gap-1 lg:flex">
            <ul className="flex items-center">
              {navigationLinks.map((link) => (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="inline-flex px-3 py-2 text-[12px] font-medium uppercase tracking-[0.16em] text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                  {link.children && activeDropdown === link.label && (
                    <div className="absolute left-0 top-full z-50 min-w-[220px] border border-border bg-card py-2 shadow-sm">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <Link href="/" className="justify-self-start lg:justify-self-center">
            <span className="font-serif text-[1.65rem] font-medium tracking-[0.22em] text-foreground">
              ROSARK
            </span>
            <span className="ml-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
              LLC
            </span>
            <span className="sr-only">{company.name}</span>
          </Link>

          <div className="flex items-center justify-end gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={() => setSearchOpen((open) => !open)}
              aria-label={searchOpen ? "Close search" : "Open search"}
              aria-expanded={searchOpen}
            >
              <Search className="h-[18px] w-[18px]" />
            </Button>

            <Button variant="ghost" size="icon" asChild className="relative h-10 w-10">
              <Link href="/wishlist" aria-label="Wishlist">
                <Heart className="h-[18px] w-[18px]" />
                {wishlistHydrated && wishlist.length > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-clay px-1 text-[10px] font-semibold text-white">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild className="hidden h-10 w-10 sm:inline-flex">
              <Link href="/profile" aria-label="Log in">
                <User className="h-[18px] w-[18px]" />
              </Link>
            </Button>

            <Button variant="ghost" size="icon" asChild className="relative h-10 w-10">
              <Link href="/cart" aria-label="Cart">
                <ShoppingBag className="h-[18px] w-[18px]" />
                {cartHydrated && itemCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                    {itemCount}
                  </span>
                )}
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
            </Button>
          </div>
        </div>
      </Container>

      {searchOpen && (
        <div className="border-t border-border bg-card">
          <SearchBar onClose={() => setSearchOpen(false)} />
        </div>
      )}

      {mobileOpen && (
        <div className="border-t border-border bg-card lg:hidden">
          <Container className="py-4">
            <ul className="space-y-1">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-2 py-2.5 text-sm font-medium uppercase tracking-[0.14em]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <ul className="mb-2 ml-2 space-y-0.5 border-l border-border pl-3">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li>
                <Link
                  href="/profile"
                  className="block px-2 py-2.5 text-sm font-medium uppercase tracking-[0.14em]"
                  onClick={() => setMobileOpen(false)}
                >
                  Account
                </Link>
              </li>
            </ul>
          </Container>
        </div>
      )}
    </header>
  );
}
