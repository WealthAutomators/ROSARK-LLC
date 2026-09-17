import Link from "next/link";
import Image from "next/image";
import { promotionalBanner } from "@/data/homepage";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function PromotionalBanner() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="relative min-h-[380px] overflow-hidden md:min-h-[460px]">
          <Image
            src={promotionalBanner.image}
            alt={promotionalBanner.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
          <div className="relative flex min-h-[380px] flex-col items-start justify-center p-8 md:min-h-[460px] md:p-14 lg:p-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
              Travel
            </p>
            <h2 className="font-serif mt-4 max-w-lg text-3xl font-medium text-white md:text-5xl">
              {promotionalBanner.title}
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-white/85">{promotionalBanner.description}</p>
            <Button asChild size="lg" className="mt-8 bg-white text-primary hover:bg-muted">
              <Link href={promotionalBanner.buttonLink}>{promotionalBanner.buttonText}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
