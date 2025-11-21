import { createMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/ui/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { Truck, Globe, Clock, MapPin, PackageCheck } from "lucide-react";

export const metadata = createMetadata({
  title: "Shipping Information",
  description:
    "Learn about TajirJomla Hub's shipping policies, delivery times, and international shipping options.",
  path: "/shipping-info",
  keywords: ["shipping", "delivery", "logistics", "international shipping"],
});

export default function ShippingInfoPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <PageHeader
        title="Shipping & Delivery"
        description="Everything you need to know about how we get your products to you."
      />

      <ContentSection>
        <div className="grid gap-8 md:grid-cols-3 mb-16">
            <FeatureCard
                icon={Truck}
                title="Fast Delivery"
                description="We partner with top-tier logistics providers to ensure your orders arrive on time, every time."
            />
            <FeatureCard
                icon={Globe}
                title="Global Shipping"
                description="We ship to over 50 countries worldwide with reliable tracking and customs handling."
            />
            <FeatureCard
                icon={PackageCheck}
                title="Secure Packaging"
                description="All items are carefully packaged to ensure they arrive in perfect condition."
            />
        </div>

        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-8 text-center">
                Shipping Methods & Rates
            </h2>
            <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-neutral-50 dark:bg-neutral-800/50 text-neutral-900 dark:text-neutral-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-neutral-200">Method</th>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-neutral-200">Delivery Time</th>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-neutral-200">Cost</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                            <tr>
                                <td className="px-6 py-4 font-medium text-neutral-900 dark:text-neutral-200">Standard Shipping</td>
                                <td className="px-6 py-4 text-neutral-900 dark:text-neutral-200">5-7 Business Days</td>
                                <td className="px-6 py-4 text-neutral-900 dark:text-neutral-200">Free on orders over $50</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-neutral-900 dark:text-neutral-200">Express Shipping</td>
                                <td className="px-6 py-4 text-neutral-900 dark:text-neutral-200">2-3 Business Days</td>
                                <td className="px-6 py-4 text-neutral-900 dark:text-neutral-200">$15.00</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-medium text-neutral-900 dark:text-neutral-200">Overnight Shipping</td>
                                <td className="px-6 py-4 text-neutral-900 dark:text-neutral-200">Next Business Day</td>
                                <td className="px-6 py-4 text-neutral-900 dark:text-neutral-200">$35.00</td>
                            </tr>
                             <tr>
                                <td className="px-6 py-4 font-medium text-neutral-900 dark:text-neutral-200">International Standard</td>
                                <td className="px-6 py-4 text-neutral-900 dark:text-neutral-200">7-14 Business Days</td>
                                <td className="px-6 py-4 text-neutral-900 dark:text-neutral-200">Calculated at checkout</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </ContentSection>

      <ContentSection className="bg-neutral-100/50 dark:bg-neutral-900/50">
        <div className="max-w-3xl mx-auto">
             <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-8 text-center">
                How It Works
            </h2>
            <div className="space-y-8">
                <TimelineItem
                    step="1"
                    title="Order Processing"
                    description="Once you place your order, our suppliers confirm availability and prepare your items for shipment. This usually takes 1-2 business days."
                    icon={Clock}
                />
                <TimelineItem
                    step="2"
                    title="Quality Check"
                    description="Items undergo a quality inspection to ensure they meet our standards before being packed."
                    icon={PackageCheck}
                />
                <TimelineItem
                    step="3"
                    title="Shipped & Tracked"
                    description="Your package is handed over to the carrier. You'll receive a tracking number via email to monitor its journey."
                    icon={Truck}
                />
                <TimelineItem
                    step="4"
                    title="Delivery"
                    description="The carrier delivers your package to your doorstep or specified delivery location."
                    icon={MapPin}
                />
            </div>
        </div>
      </ContentSection>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: any) {
    return (
        <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <div className="mb-4 p-3 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-neutral-200">
                <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200 mb-2">{title}</h3>
            <p className="text-neutral-900 dark:text-neutral-200 text-sm leading-relaxed">{description}</p>
        </div>
    );
}

function TimelineItem({ step, title, description, icon: Icon }: any) {
    return (
        <div className="flex gap-4 md:gap-6">
            <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-neutral-100 dark:text-neutral-900 font-bold shadow-md z-10">
                    {step}
                </div>
                <div className="w-0.5 flex-1 bg-neutral-900 dark:bg-neutral-200 my-2"></div>
            </div>
            <div className="pb-8 pt-1">
                <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-200">{title}</h3>
                    <Icon className="h-4 w-4 text-neutral-900 dark:text-neutral-200" />
                </div>
                <p className="text-neutral-900 dark:text-neutral-200 leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}
