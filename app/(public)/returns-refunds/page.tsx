import { createMetadata } from "../../../lib/seo/metadata";
import { Breadcrumb } from "../../../components/ui/breadcrumb";
import { RotateCcw, Package, Clock, DollarSign } from "lucide-react";

export const metadata = createMetadata({
  title: "Returns & Refunds",
  description:
    "Learn about Kontainar Hub's return and refund policy, including eligibility, process, and timelines.",
  path: "/returns-refunds",
  keywords: ["returns", "refunds", "return policy", "refund policy"],
});

export default function ReturnsRefundsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
      <main className="flex flex-col pb-16 sm:pb-26">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-6">
          <Breadcrumb />
        </div>

        <HeroSection />
        <ReturnPolicySection />
        <RefundPolicySection />
        <ProcessSection />
        <ExclusionsSection />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900">
      <div className="flex flex-col items-center justify-center text-center mb-5 sm:mb-0">
        <div className="flex items-center justify-center gap-3">
          <RotateCcw className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-neutral-900">
            Returns & Refunds
          </h1>
        </div>
        <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-700 max-w-3xl mt-3">
          Our return and refund policy ensures you can shop with confidence.
          Learn about eligibility, process, and timelines.
        </p>
      </div>
    </section>
  );
}

function ReturnPolicySection() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900 mt-8 sm:mt-12">
      <div className="flex flex-col items-center justify-center text-center mb-5">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-900">
          Return Policy
        </h2>
      </div>
      <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-4 sm:p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-900 mb-3">
              Return Window
            </h3>
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-700">
              You have 30 days from the date of delivery to return most items
              for a full refund. The item must be in its original condition,
              unused, and in the original packaging with all tags attached.
            </p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-900 mb-3">
              Return Conditions
            </h3>
            <ul className="space-y-2 text-sm sm:text-base text-neutral-700 dark:text-neutral-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">•</span>
                <span>
                  Items must be in original, unused condition with all tags and
                  labels attached
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">•</span>
                <span>
                  Original packaging must be included and in good condition
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">•</span>
                <span>
                  Proof of purchase (order number or receipt) must be provided
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">•</span>
                <span>
                  Items must not be damaged, altered, or show signs of wear
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function RefundPolicySection() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900 mt-8 sm:mt-12">
      <div className="flex flex-col items-center justify-center text-center mb-5">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-900">
          Refund Policy
        </h2>
      </div>
      <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-3">
        <div className="flex flex-col gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-4 sm:p-6 shadow-sm">
          <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-blue-600/10 text-blue-300 border border-blue-500/40">
            <DollarSign className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <h3 className="text-sm sm:text-md font-semibold text-neutral-900 dark:text-neutral-900">
            Refund Amount
          </h3>
          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-700">
            Full refund for eligible returns, including original shipping costs
            if the item was defective or incorrect.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-4 sm:p-6 shadow-sm">
          <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-indigo-600/10 text-indigo-300 border border-indigo-500/40">
            <Clock className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <h3 className="text-sm sm:text-md font-semibold text-neutral-900 dark:text-neutral-900">
            Processing Time
          </h3>
          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-700">
            Refunds are typically processed within 5-7 business days after we
            receive and verify your returned item.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-4 sm:p-6 shadow-sm">
          <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-purple-600/10 text-purple-300 border border-purple-500/40">
            <Package className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <h3 className="text-sm sm:text-md font-semibold text-neutral-900 dark:text-neutral-900">
            Refund Method
          </h3>
          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-700">
            Refunds are issued to your original payment method. Credit card
            refunds may take 1-2 billing cycles to appear.
          </p>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      step: "1",
      title: "Initiate Return",
      description:
        "Go to your account dashboard, find the order, and click 'Return Item'. Fill out the return form with the reason for return.",
    },
    {
      step: "2",
      title: "Get Return Label",
      description:
        "We'll provide you with a return shipping label if applicable. Print the label and attach it to your package.",
    },
    {
      step: "3",
      title: "Ship Item Back",
      description:
        "Package the item securely in its original packaging and ship it back to us using the provided return label.",
    },
    {
      step: "4",
      title: "Receive Refund",
      description:
        "Once we receive and verify your return, we'll process your refund within 5-7 business days.",
    },
  ];

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900 mt-8 sm:mt-12">
      <div className="flex flex-col items-center justify-center text-center mb-5">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-900">
          Return Process
        </h2>
      </div>
      <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.step}
            className="flex flex-col gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-4 sm:p-6 shadow-sm"
          >
            <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-blue-600/10 text-blue-300 border border-blue-500/40 text-2xl font-bold">
              {step.step}
            </div>
            <h3 className="text-sm sm:text-md font-semibold text-neutral-900 dark:text-neutral-900">
              {step.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-700">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExclusionsSection() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900 mt-8 sm:mt-12 mb-8 sm:mb-12">
      <div className="flex flex-col items-center justify-center text-center mb-5">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-900">
          Non-Returnable Items
        </h2>
      </div>
      <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-4 sm:p-6 shadow-sm">
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-700 mb-4">
          The following items are not eligible for return:
        </p>
        <ul className="space-y-3 text-sm sm:text-base text-neutral-700 dark:text-neutral-700">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">•</span>
            <span>Perishable goods (food, flowers, etc.)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">•</span>
            <span>Personalized or custom-made items</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">•</span>
            <span>Digital products and software</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">•</span>
            <span>Items damaged by customer misuse</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">•</span>
            <span>Items returned after the 30-day return window</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">•</span>
            <span>Items without proof of purchase</span>
          </li>
        </ul>
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-700 mt-6">
          If you have questions about whether an item is returnable, please
          contact our customer support team before initiating a return.
        </p>
      </div>
    </section>
  );
}

