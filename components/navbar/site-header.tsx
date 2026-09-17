"use client";

import Link from "next/link";
import { promoBar } from "@/data/homepage";
import { Navbar } from "@/components/navbar/navbar";

export function SiteHeader() {
  return (
    <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-md">
      <div className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-3 px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.18em] sm:px-6">
          <span>{promoBar.text}</span>
          <Link href={promoBar.linkHref} className="underline decoration-white/40 underline-offset-4 hover:decoration-white">
            {promoBar.linkText}
          </Link>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
