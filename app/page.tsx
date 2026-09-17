import { HeroBanner } from "@/components/homepage/hero-banner";
import { CategoryCarousel } from "@/components/homepage/category-carousel";
import { FeaturedCollection } from "@/components/homepage/featured-collection";
import { EditorialShowcase } from "@/components/homepage/editorial-showcase";
import { NewArrivals } from "@/components/homepage/new-arrivals";
import { LifestyleFeature } from "@/components/homepage/lifestyle-feature";
import { BestSellers } from "@/components/homepage/best-sellers";
import { CuratedEdit } from "@/components/homepage/curated-edit";
import { PromotionalBanner } from "@/components/homepage/promotional-banner";
import { AboutSection } from "@/components/homepage/about-section";
import { Newsletter } from "@/components/homepage/newsletter";
import { FeaturesRow } from "@/components/homepage/features-row";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoryCarousel />
      <FeaturedCollection />
      <EditorialShowcase />
      <NewArrivals />
      <LifestyleFeature />
      <BestSellers />
      <CuratedEdit />
      <PromotionalBanner />
      <AboutSection />
      <Newsletter />
      <FeaturesRow />
    </>
  );
}
