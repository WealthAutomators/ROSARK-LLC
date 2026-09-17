import { company } from "@/data/company";
import { testimonials } from "@/data/testimonials";
import { PageHero, PageSection } from "@/components/ui/page-layout";
import { Container } from "@/components/ui/container";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={`About ${company.name}`}
        description={company.description}
        breadcrumbs={[{ label: "About Us" }]}
      />

      <Container className="pb-16">
        <div className="grid items-center gap-10 py-12 md:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src="/banners/about.jpg" alt={`About ${company.name}`} fill className="object-cover" sizes="50vw" />
          </div>
          <PageSection title="A contemporary edit">
            <p>
              ROSARK LLC is a contemporary retailer of thoughtfully chosen products for the home,
              the desk, and the days in between. The catalog is built around everyday utility —
              objects that earn their place through material, proportion, and use.
            </p>
            <p className="mt-4">
              We look for considered design over spectacle: quiet rooms, practical travel, apparel
              that layers, and tools that stay useful. The aim is not more product. It is a better
              edit.
            </p>
          </PageSection>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Thoughtful products", desc: "Each listing is chosen for how it lives in a room, a bag, or a routine." },
            { title: "Contemporary living", desc: "A calm, modern assortment for homes and workspaces that are actually used." },
            { title: "Everyday utility", desc: "Quality that shows up in daily use — not only on a product page." },
          ].map(({ title, desc }) => (
            <div key={title} className="border border-border bg-card p-6">
              <h3 className="font-serif text-xl">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <PageSection title="What customers say" className="mt-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.slice(0, 8).map((t) => (
              <div key={t.id} className="border border-border bg-card p-6">
                <StarRating rating={t.rating} showCount={false} size="md" />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
                <p className="mt-4 text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            ))}
          </div>
        </PageSection>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/shop">Shop the Collection</Link>
          </Button>
        </div>
      </Container>
    </>
  );
}
