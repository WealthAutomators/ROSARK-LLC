import { company } from "./company";

export const faqItems = [
  {
    question: "What does ROSARK LLC sell?",
    answer:
      "We offer a considered catalog of contemporary products across home, kitchen and dining, travel, outdoor, apparel, accessories, personal essentials, fitness, everyday tech, workspace, storage, and gifts.",
  },
  {
    question: "Do you offer free shipping?",
    answer:
      "Yes. Complimentary standard shipping applies to orders over $75 within the contiguous United States. Orders under $75 have a flat rate of $9.99. Express shipping is available at checkout for $14.99.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically arrives in 3–5 business days. Express shipping typically arrives in 1–2 business days. You will receive a tracking number by email once an order ships.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Unused items in original packaging may be returned within 30 days of delivery. Visit our Returns page for instructions, or email us for assistance.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes. Once an order ships, you will receive an email with a tracking number. You can also use our Track Order page with your order number and email address.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "We currently ship within the United States, including Alaska and Hawaii.",
  },
  {
    question: "How do I use a coupon code?",
    answer:
      "Enter your coupon code in the coupon field on the cart page and select Apply. Valid codes update the order total immediately. One coupon code may be used per order.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. All transactions are encrypted.",
  },
  {
    question: "How can I contact you?",
    answer: `Email us at ${company.email}. We typically respond within one business day.`,
  },
];

export const shippingPolicy = {
  title: "Shipping Policy",
  description: "How ROSARK LLC delivers orders.",
  sections: [
    {
      title: "Processing Time",
      content:
        "Orders are typically processed within 1–2 business days. Orders placed on weekends or holidays ship the next business day.",
    },
    {
      title: "Shipping Methods & Rates",
      content: "",
      list: [
        "Standard Shipping (3–5 business days): $9.99 — complimentary on orders over $75",
        "Express Shipping (1–2 business days): $14.99",
        "Alaska & Hawaii: Standard rates apply; delivery may take 5–7 business days",
      ],
    },
    {
      title: "Order Tracking",
      content:
        "Once your order ships, you will receive a confirmation email with a tracking number. You can track the package from that email or from our Track Order page.",
    },
    {
      title: "Shipping Restrictions",
      content:
        "We currently ship to all 50 US states. We do not ship express orders to PO boxes. Oversized items may require additional transit time.",
    },
    {
      title: "Lost or Damaged Packages",
      content: `If a package arrives damaged or does not arrive within 10 business days of the estimated delivery date, contact us at ${company.email}. We will work with the carrier to resolve the issue.`,
    },
  ],
};

export const returnPolicy = {
  title: "Return Policy",
  description: "If an item is not right, we will help make it right.",
  sections: [
    {
      title: "30-Day Return Window",
      content:
        "Most unused items may be returned within 30 days of delivery for a refund or exchange. Items should be in original packaging with tags attached.",
    },
    {
      title: "How to Start a Return",
      content: "",
      list: [
        "Email us at " + company.email + " with your order number and reason for return",
        "We will send a prepaid return label within 1 business day",
        "Pack items securely in original packaging and attach the label",
        "Drop off at any authorized shipping location",
        "Refunds are processed within 5–7 business days of receiving the return",
      ],
    },
    {
      title: "Non-Returnable Items",
      content: "",
      list: [
        "Items marked as final sale",
        "Used or altered products",
        "Items without original packaging or tags",
        "Gift cards",
      ],
    },
    {
      title: "Exchanges",
      content:
        "Need a different size or color? Contact us and we will arrange an exchange. Replacement shipping is complimentary when the original item is returned unused.",
    },
  ],
};

export const refundPolicy = {
  title: "Refund Policy",
  description: "How ROSARK LLC issues refunds.",
  sections: [
    {
      title: "Refund Eligibility",
      content:
        "Refunds are available for unused items returned within 30 days of delivery with original packaging and tags. Sale items are eligible unless marked as final sale.",
    },
    {
      title: "Refund Processing Time",
      content:
        "Once we receive and inspect a return, refunds are processed within 5–7 business days to the original payment method. Banks may take an additional 3–5 business days to reflect the credit.",
    },
    {
      title: "Partial Refunds",
      content: "",
      list: [
        "Items with obvious signs of use may receive a partial refund",
        "Items returned without original packaging may incur a 15% restocking fee",
        "Shipping costs are non-refundable unless the return is due to our error",
      ],
    },
    {
      title: "Defective or Wrong Items",
      content:
        "If you receive a defective or incorrect item, contact us promptly. We will provide a prepaid return label and issue a full refund including original shipping, or send a replacement at no charge.",
    },
    {
      title: "Contact Us",
      content: `Questions about refunds? Email ${company.email}.`,
    },
  ],
};

export const privacyPolicy = {
  title: "Privacy Policy",
  description: "How ROSARK LLC collects, uses, and protects your information.",
  sections: [
    {
      title: "Information We Collect",
      content:
        "When you visit our website, create an account, or place an order, we may collect your name, email address, shipping address, and payment information. We also collect browsing data through cookies to improve the shopping experience.",
    },
    {
      title: "How We Use Your Information",
      content: "",
      list: [
        "Process and fulfill orders",
        "Send order confirmations and shipping updates",
        "Respond to customer service requests",
        "Send marketing communications (with your consent)",
        "Improve our website and product offering",
        "Prevent fraud and ensure security",
      ],
    },
    {
      title: "Information Sharing",
      content:
        "We do not sell your personal information. We share data only with trusted service providers who help us operate — such as shipping carriers and payment processors — and only to the extent necessary to provide our services.",
    },
    {
      title: "Cookies",
      content:
        "We use cookies to remember your cart, wishlist, and preferences. You can disable cookies in your browser settings, though some site features may not function properly.",
    },
    {
      title: "Your Rights",
      content:
        "You may request access to, correction of, or deletion of your personal data at any time by contacting us at " +
        company.email +
        ". Georgia residents have additional rights under applicable state privacy laws.",
    },
    {
      title: "Contact",
      content: `For privacy-related inquiries, contact us at ${company.email} or write to: ${company.name}, ${company.address.street}, ${company.address.city}, ${company.address.state} ${company.address.zip}.`,
    },
  ],
};

export const termsPolicy = {
  title: "Terms & Conditions",
  description: "Please read these terms carefully before using the ROSARK LLC website.",
  sections: [
    {
      title: "Acceptance of Terms",
      content:
        "By accessing and using the ROSARK LLC website, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.",
    },
    {
      title: "Products & Pricing",
      content:
        "We strive to display accurate product descriptions, images, and pricing. Errors may occur. We reserve the right to correct errors and to change or update information at any time without prior notice. Prices are in US dollars and subject to change.",
    },
    {
      title: "Orders & Payment",
      content:
        "Placing an order constitutes an offer to purchase. We reserve the right to refuse or cancel any order. Payment must be received before orders are processed.",
    },
    {
      title: "Intellectual Property",
      content:
        "All content on this website — including text, images, logos, and design — is the property of ROSARK LLC and protected by copyright and trademark laws. You may not reproduce, distribute, or use our content without written permission.",
    },
    {
      title: "Limitation of Liability",
      content:
        "ROSARK LLC shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount you paid for the product in question.",
    },
    {
      title: "Governing Law",
      content:
        "These terms are governed by the laws of the State of Georgia, United States. Any disputes shall be resolved in the courts of Cobb County, Georgia.",
    },
  ],
};
