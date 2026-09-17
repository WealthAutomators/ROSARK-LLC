import Link from "next/link";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  viewMoreLink?: string;
  viewMoreText?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  viewMoreLink,
  viewMoreText = "View all",
  className,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        centered && "text-center sm:flex-col sm:items-center",
        className
      )}
    >
      <div className={cn(centered && "max-w-2xl")}>
        {eyebrow && (
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground md:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
        {subtitle && <p className="mt-3 max-w-xl text-muted-foreground leading-relaxed">{subtitle}</p>}
      </div>
      {viewMoreLink && (
        <Link
          href={viewMoreLink}
          className="text-[12px] font-medium uppercase tracking-[0.16em] text-foreground underline decoration-border underline-offset-8 transition-colors hover:decoration-foreground"
        >
          {viewMoreText}
        </Link>
      )}
    </div>
  );
}
