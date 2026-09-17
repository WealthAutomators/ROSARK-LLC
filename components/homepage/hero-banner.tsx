"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { heroSlides } from "@/data/homepage";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  const slide = heroSlides[0];

  return (
    <section className="relative min-h-[88vh] w-full overflow-hidden bg-muted">
      <Image
        src={slide.image}
        alt={slide.headline}
        fill
        className="object-cover object-[center_70%]"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent md:from-background/90 md:via-background/40" />
      <div className="relative mx-auto flex min-h-[88vh] max-w-[1400px] flex-col justify-center px-4 py-28 sm:px-6 md:justify-end md:pb-24 lg:px-8">
        <motion.div
          className="max-w-2xl text-foreground"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
            The current collection
          </p>
          <h1 className="font-serif mt-4 text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {slide.headline}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            {slide.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={slide.ctaLink}>{slide.ctaText}</Link>
            </Button>
            {slide.secondaryCtaText && slide.secondaryCtaLink && (
              <Button asChild size="lg" variant="outline">
                <Link href={slide.secondaryCtaLink}>{slide.secondaryCtaText}</Link>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
