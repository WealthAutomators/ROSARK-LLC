"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const DEMO_ORDERS: Record<string, { status: string; date: string; items: string; carrier: string; tracking: string }> = {
  "OC-100234": {
    status: "Delivered",
    date: "June 28, 2026",
    items: "Luxury Cotton Bath Towel Set × 1",
    carrier: "UPS",
    tracking: "1Z999AA10123456784",
  },
  "OC-100567": {
    status: "In Transit",
    date: "July 1, 2026",
    items: "Plush Hooded Bathrobe × 1, Coastal Stripe Beach Towel × 2",
    carrier: "USPS",
    tracking: "9400111899562345678901",
  },
  "OC-100891": {
    status: "Processing",
    date: "July 2, 2026",
    items: "Microfiber Cleaning Cloth Set × 2",
    carrier: "—",
    tracking: "—",
  },
};

export function TrackOrderContent() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<(typeof DEMO_ORDERS)[string] | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const order = DEMO_ORDERS[orderNumber.toUpperCase()];
    if (order) {
      setResult(order);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  };

  return (
    <>
      <PageHero
        title="Track Your Order"
        description="Enter your order number and email to check the status of your shipment."
        breadcrumbs={[{ label: "Track Order" }]}
      />
      <Container className="pb-16">
        <div className="mx-auto max-w-lg">
          <form onSubmit={handleTrack} className="border border-border bg-card p-6 md:p-8">
            <div className="space-y-4">
              <div>
                <Label htmlFor="order-number">Order Number</Label>
                <Input
                  id="order-number"
                  placeholder="e.g. OC-100234"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  required
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="track-email">Email Address</Label>
                <Input
                  id="track-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1.5"
                />
              </div>
            </div>
            <Button type="submit" size="lg" className="mt-6 w-full">
              <Search className="h-4 w-4" />
              Track Order
            </Button>
          </form>

          {searched && notFound && (
            <div className="mt-6 rounded-lg border border-border bg-muted/30 p-6 text-center">
              <Package className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-3 font-medium">Order not found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Please check your order number and try again, or contact support.
              </p>
            </div>
          )}

          {result && (
            <div className="mt-6 border border-border bg-card p-6 md:p-8">
              <div className="flex items-center gap-3">
                {result.status === "Delivered" ? (
                  <CheckCircle className="h-6 w-6 text-primary" />
                ) : (
                  <Truck className="h-6 w-6 text-primary" />
                )}
                <div>
                  <p className="text-lg font-semibold">{result.status}</p>
                  <p className="text-sm text-muted-foreground">Order {orderNumber.toUpperCase()}</p>
                </div>
              </div>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between border-b border-border pb-3">
                  <dt className="text-muted-foreground">Order Date</dt>
                  <dd className="font-medium">{result.date}</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <dt className="text-muted-foreground">Items</dt>
                  <dd className="max-w-[60%] text-right font-medium">{result.items}</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <dt className="text-muted-foreground">Carrier</dt>
                  <dd className="font-medium">{result.carrier}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Tracking Number</dt>
                  <dd className="font-medium">{result.tracking}</dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
