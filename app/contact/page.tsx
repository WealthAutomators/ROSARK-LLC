"use client";

import { useState } from "react";
import { company } from "@/data/company";
import { PageHero } from "@/components/ui/page-layout";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        title="Contact"
        description="Questions about an order or a product? Write to us."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <Container className="pb-16">
        <div className="grid gap-12 py-12 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl">Get in touch</h2>
            <p className="mt-3 text-muted-foreground">
              We typically respond within one business day. For order-related inquiries,
              please include your order number.
            </p>

            <div className="mt-10 space-y-6">
              {[
                { icon: Mail, label: "Email", value: company.email },
                {
                  icon: MapPin,
                  label: "Address",
                  value: `${company.address.street}, ${company.address.city}, ${company.address.state} ${company.address.zip}`,
                },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-muted">
                    <Icon className="h-4 w-4 text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{label}</p>
                    {label === "Email" ? (
                      <a href={`mailto:${value}`} className="text-sm text-muted-foreground hover:text-foreground">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border bg-card p-6 md:p-8">
            <h2 className="font-serif text-2xl">Send a message</h2>

            {submitted ? (
              <div className="mt-6 flex flex-col items-center py-8 text-center">
                <CheckCircle className="h-12 w-12 text-accent" />
                <p className="mt-4 text-lg font-medium">Message sent</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Thank you for reaching out. We’ll get back to you within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" required className="mt-1.5" placeholder="Your name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required className="mt-1.5" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" required className="mt-1.5" placeholder="How can we help?" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" required className="mt-1.5" placeholder="Tell us more..." rows={5} />
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
