import { createMetadata } from "../../../lib/seo/metadata";
import { Breadcrumb } from "../../../components/ui/breadcrumb";
import { Handshake } from "lucide-react";

export const metadata = createMetadata({
  title: "Seller Agreement",
  description:
    "Read Kontainar Hub's Seller Agreement to understand the terms and conditions for selling on our marketplace platform.",
  path: "/seller-agreement",
  keywords: ["seller", "seller agreement", "vendor", "marketplace seller"],
});

export default function SellerAgreementPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
      <main className="flex flex-col pb-16 sm:pb-26">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-6">
          <Breadcrumb />
        </div>

        <HeroSection />
        <AgreementContent />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900">
      <div className="flex flex-col items-center justify-center text-center mb-5 sm:mb-0">
        <div className="flex items-center justify-center gap-3">
          <Handshake className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-neutral-900">
            Seller Agreement
          </h1>
        </div>
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-700 max-w-3xl mt-3">
          Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
    </section>
  );
}

function AgreementContent() {
  const sections = [
    {
      title: "Introduction",
      content: `This Seller Agreement ("Agreement") governs your participation as a seller on the Kontainar Hub marketplace platform. By registering as a seller or listing products on our platform, you agree to be bound by this Agreement and our Terms of Service.`,
    },
    {
      title: "Seller Eligibility",
      content: `To become a seller on Kontainar Hub, you must:
- Be at least 18 years old
- Have the legal authority to enter into this Agreement
- Provide accurate and complete business information
- Comply with all applicable laws and regulations
- Maintain a valid business license where required
- Pass our seller verification process`,
    },
    {
      title: "Seller Account",
      content: `As a seller, you are responsible for:
- Maintaining the security of your seller account
- Providing accurate business and contact information
- Keeping your account information up to date
- All activities that occur under your seller account
- Notifying us immediately of any unauthorized access`,
    },
    {
      title: "Product Listings",
      content: `When listing products on our platform, you agree to:
- Provide accurate, complete, and truthful product descriptions
- Use high-quality product images that accurately represent the product
- Set fair and competitive prices
- Maintain adequate inventory levels
- Comply with all applicable product safety and labeling requirements
- Not list prohibited or restricted items`,
    },
    {
      title: "Prohibited Products",
      content: `You may not list or sell the following items:
- Illegal products or services
- Counterfeit or pirated goods
- Weapons, ammunition, or explosives
- Drugs, controlled substances, or prescription medications
- Hazardous materials
- Items that infringe on intellectual property rights
- Any other items prohibited by law or our policies`,
    },
    {
      title: "Pricing and Payments",
      content: `As a seller:
- You set your own product prices
- We charge a commission fee on each sale (see fee structure)
- Payments are processed according to our payment schedule
- You are responsible for all applicable taxes
- Refunds and returns are handled according to our Returns & Refunds policy`,
    },
    {
      title: "Order Fulfillment",
      content: `You agree to:
- Process and ship orders within the specified timeframes
- Provide accurate tracking information
- Package products securely and appropriately
- Handle customer inquiries and support requests promptly
- Comply with all shipping and delivery requirements`,
    },
    {
      title: "Seller Fees",
      content: `Our fee structure includes:
- Listing fees (if applicable)
- Commission fees on sales (percentage varies by category)
- Payment processing fees
- Subscription fees for premium seller features

All fees are clearly disclosed before you list products or make sales.`,
    },
    {
      title: "Intellectual Property",
      content: `You retain ownership of your product listings, images, and content. However, by listing on our platform, you grant us a license to:
- Display your product listings on our platform
- Use your product images and descriptions for marketing purposes
- Reproduce and distribute your content as necessary to operate the platform`,
    },
    {
      title: "Seller Performance Standards",
      content: `We expect sellers to maintain:
- High customer satisfaction ratings
- Low order defect rates
- Fast shipping times
- Responsive customer service
- Accurate product descriptions

Failure to meet these standards may result in account restrictions or termination.`,
    },
    {
      title: "Termination",
      content: `Either party may terminate this Agreement at any time with notice. We may suspend or terminate your seller account immediately if you:
- Violate this Agreement or our Terms of Service
- Engage in fraudulent or illegal activities
- Fail to meet performance standards
- Provide false or misleading information`,
    },
    {
      title: "Contact Information",
      content: `For questions about this Seller Agreement, please contact us at:
- Email: sellers@kontainarhub.com
- Address: [Your Company Address]
- Phone: +1 (555) 123-4567`,
    },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900 mt-8 sm:mt-12 mb-8 sm:mb-12">
      {sections.map((section, index) => (
        <div
          key={index}
          className="rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-4 sm:p-6 shadow-sm"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-900 mb-4">
            {section.title}
          </h2>
          <div className="text-sm sm:text-base text-neutral-700 dark:text-neutral-700 leading-relaxed whitespace-pre-line">
            {section.content}
          </div>
        </div>
      ))}
    </section>
  );
}

