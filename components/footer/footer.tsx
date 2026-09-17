import Link from "next/link";
import Image from "next/image";
import { company } from "@/data/company";
import { footerLinks, paymentMethods } from "@/data/navigation";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="font-serif text-3xl tracking-[0.18em]">ROSARK</p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-taupe">LLC</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary-foreground/75">
              {company.description}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-primary-foreground/75">
              {company.address.street}
              <br />
              {company.address.city}, {company.address.state} {company.address.zip}
            </p>
            <a
              href={`mailto:${company.email}`}
              className="mt-3 inline-block text-sm text-primary-foreground underline decoration-primary-foreground/30 underline-offset-4 hover:decoration-primary-foreground"
            >
              {company.email}
            </a>
          </div>

          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em]">Shop</h3>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mb-5 mt-8 text-[11px] font-semibold uppercase tracking-[0.2em]">Categories</h3>
            <ul className="space-y-2.5">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em]">Customer Care</h3>
            <ul className="space-y-2.5">
              {footerLinks.customerCare.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em]">About</h3>
            <ul className="space-y-2.5">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-primary-foreground/60">{company.copyright}</p>
          <div className="flex items-center gap-2">
            {paymentMethods.map((method) => (
              <Image
                key={method.name}
                src={method.icon}
                alt={method.name}
                width={40}
                height={28}
                className="h-7 w-auto opacity-80"
              />
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
