import Image from "next/image";
import Link from "next/link";
import { lifestyleFeature } from "@/data/homepage";
import { Button } from "@/components/ui/button";

export function LifestyleFeature() {
  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      <Image
        src={lifestyleFeature.image}
        alt={lifestyleFeature.title}
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative mx-auto flex min-h-[70vh] max-w-[1400px] items-end px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-xl text-white">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
            Lifestyle
          </p>
          <h2 className="font-serif mt-4 text-4xl font-medium md:text-5xl">{lifestyleFeature.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-white/85">{lifestyleFeature.description}</p>
          <Button asChild size="lg" className="mt-8 bg-white text-primary hover:bg-muted">
            <Link href={lifestyleFeature.buttonLink}>{lifestyleFeature.buttonText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
