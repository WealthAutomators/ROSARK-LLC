"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type CarouselApi = UseEmblaCarouselType[1];

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  slideClassName?: string;
  options?: Parameters<typeof useEmblaCarousel>[0];
  autoplay?: boolean;
  autoplayDelay?: number;
  showArrows?: boolean;
  showDots?: boolean;
  slidesToShow?: number;
}

export function Carousel({
  children,
  className,
  slideClassName,
  options,
  autoplay = false,
  autoplayDelay = 5000,
  showArrows = true,
  showDots = false,
  slidesToShow = 1,
}: CarouselProps) {
  const plugins = useMemo(
    () => (autoplay ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: true })] : []),
    [autoplay, autoplayDelay]
  );

  const emblaOptions = useMemo(
    () => ({ align: "start" as const, loop: true, ...options }),
    [options]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, plugins);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const syncCarouselState = useCallback((api: CarouselApi) => {
    if (!api) return;
    const snaps = api.scrollSnapList();
    setScrollSnaps((prev) => {
      if (prev.length === snaps.length && prev.every((v, i) => v === snaps[i])) return prev;
      return snaps;
    });
    setSelectedIndex((prev) => {
      const next = api.selectedScrollSnap();
      return prev === next ? prev : next;
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const frame = requestAnimationFrame(() => syncCarouselState(emblaApi));
    emblaApi.on("select", syncCarouselState);
    emblaApi.on("reInit", syncCarouselState);
    return () => {
      cancelAnimationFrame(frame);
      emblaApi.off("select", syncCarouselState);
      emblaApi.off("reInit", syncCarouselState);
    };
  }, [emblaApi, syncCarouselState]);

  const slides = Array.isArray(children) ? children : [children];

  const basisClass =
    slidesToShow >= 6
      ? "basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
      : slidesToShow >= 4
        ? "basis-1/2 sm:basis-1/3 lg:basis-1/4"
        : slidesToShow >= 2
          ? "basis-1/2 sm:basis-1/2"
          : "basis-full";

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={cn("min-w-0 shrink-0 grow-0 px-2", basisClass, slideClassName)}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showArrows && slides.length > slidesToShow && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-none shadow-sm"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-none shadow-sm"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {showDots && scrollSnaps.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                index === selectedIndex ? "w-6 bg-primary" : "bg-border hover:bg-primary/40"
              )}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
