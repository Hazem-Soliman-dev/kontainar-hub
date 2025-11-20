import { createMetadata } from "../../../lib/seo/metadata";
import { Breadcrumb } from "../../../components/ui/breadcrumb";
import { HelpCircle } from "lucide-react";

export const metadata = createMetadata({
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about Kontainar Hub, including account management, orders, shipping, payments, and more.",
  path: "/faq",
  keywords: ["faq", "questions", "help", "answers", "support"],
});

export default function FAQPage() {
  const faqCategories = [
    {
      category: "Account & Registration",
      questions: [
        {
          question: "How do I create an account?",
          answer:
            "Click on the 'Register' button in the top navigation bar. Fill in your email address, create a password, and verify your email address through the confirmation link we send you.",
        },
        {
          question: "Do I need to pay to create an account?",
          answer:
            "No, creating an account is completely free. However, to access certain features like viewing product prices and placing orders, you'll need an active subscription plan.",
        },
        {
          question: "How do I reset my password?",
          answer:
            "Go to the login page and click on 'Forgot Password'. Enter your email address, and we'll send you a link to reset your password. Make sure to check your spam folder if you don't see the email.",
        },
        {
          question: "Can I have multiple accounts?",
          answer:
            "Each email address can only be associated with one account. If you need separate accounts for different purposes, you'll need to use different email addresses.",
        },
      ],
    },
    {
      category: "Orders & Purchases",
      questions: [
        {
          question: "How do I place an order?",
          answer:
            "Browse our marketplace, add products to your cart, and proceed to checkout. You'll need an active subscription plan to complete purchases. Follow the checkout process to enter your shipping and payment information.",
        },
        {
          question: "Can I cancel my order?",
          answer:
            "You can cancel your order within 24 hours of placing it, as long as it hasn't been shipped yet. Go to your account dashboard, find the order, and click 'Cancel Order'.",
        },
        {
          question: "How do I track my order?",
          answer:
            "Once your order ships, you'll receive a tracking number via email. You can also track your order from your account dashboard under the 'Orders' section.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, Mastercard), digital payment methods (Apple Pay, Mada, STC Pay, Mobily Pay, Tabbey, Tamara), bank transfers, and cash on delivery in select regions.",
        },
      ],
    },
    {
      category: "Shipping & Delivery",
      questions: [
        {
          question: "What are your shipping options?",
          answer:
            "We offer standard shipping (5-7 business days, free on orders over $50), express shipping (2-3 business days), and overnight shipping (next business day). Shipping costs are calculated at checkout.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Yes, we ship to most countries worldwide. International orders typically take 7-14 business days. Please note that international orders may be subject to customs fees and import duties.",
        },
        {
          question: "What if my package is damaged or lost?",
          answer:
            "If your package arrives damaged or is lost in transit, please contact our customer support team immediately. We'll work with you to resolve the issue, which may include a replacement or refund.",
        },
        {
          question: "Can I change my shipping address after placing an order?",
          answer:
            "You can change your shipping address within 24 hours of placing your order, as long as it hasn't been shipped. Contact our support team or update it from your order details page.",
        },
      ],
    },
    {
      category: "Subscriptions & Plans",
      questions: [
        {
          question: "What subscription plans are available?",
          answer:
            "We offer multiple subscription plans including Free, Basic, Pro, and Enterprise tiers. Each plan has different features and benefits. Visit our Plans page to see detailed comparisons and pricing.",
        },
        {
          question: "Can I upgrade or downgrade my plan?",
          answer:
            "Yes, you can change your subscription plan at any time from your account settings. Upgrades take effect immediately, while downgrades take effect at the end of your current billing cycle.",
        },
        {
          question: "How do I cancel my subscription?",
          answer:
            "You can cancel your subscription from your account settings. Your subscription will remain active until the end of your current billing period, after which you'll lose access to premium features.",
        },
        {
          question: "Do you offer refunds for subscriptions?",
          answer:
            "We offer a 30-day money-back guarantee for new subscriptions. If you're not satisfied within the first 30 days, contact our support team for a full refund.",
        },
      ],
    },
    {
      category: "Returns & Refunds",
      questions: [
        {
          question: "What is your return policy?",
          answer:
            "You can return most items within 30 days of delivery for a full refund, as long as they are in their original condition and packaging. Some items may be excluded from returns. See our Returns & Refunds page for full details.",
        },
        {
          question: "How do I initiate a return?",
          answer:
            "Go to your account dashboard, find the order you want to return, and click 'Return Item'. Fill out the return form and follow the instructions. You'll receive a return shipping label if applicable.",
        },
        {
          question: "How long does it take to process a refund?",
          answer:
            "Once we receive your returned item and verify its condition, refunds are typically processed within 5-7 business days. The refund will be issued to your original payment method.",
        },
        {
          question: "Who pays for return shipping?",
          answer:
            "Return shipping costs depend on the reason for return. If the item is defective or we made an error, we cover the return shipping. Otherwise, the customer is responsible for return shipping costs.",
        },
      ],
    },
    {
      category: "General",
      questions: [
        {
          question: "How do I contact customer support?",
          answer:
            "You can reach our customer support team via email at support@kontainarhub.com, phone at +1 (555) 123-4567, or through our live chat feature. We're available 24/7 to assist you.",
        },
        {
          question: "Is my personal information secure?",
          answer:
            "Yes, we take your privacy and security seriously. We use industry-standard encryption and security measures to protect your personal and payment information. See our Privacy Policy for more details.",
        },
        {
          question: "Do you have a mobile app?",
          answer:
            "Currently, our platform is optimized for mobile browsers. We're working on native mobile apps for iOS and Android, which will be available soon.",
        },
        {
          question: "How do I become a seller on Kontainar Hub?",
          answer:
            "To become a seller, you'll need to create an account and apply for a seller account. Our team will review your application and get back to you within 3-5 business days. See our Seller Agreement for more information.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
      <main className="flex flex-col pb-16 sm:pb-26">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-6">
          <Breadcrumb />
        </div>

        <HeroSection />
        <FAQContent faqCategories={faqCategories} />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900">
      <div className="flex flex-col items-center justify-center text-center mb-5 sm:mb-0">
        <div className="flex items-center justify-center gap-3">
          <HelpCircle className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-neutral-900">
            Frequently Asked Questions
          </h1>
        </div>
        <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-700 max-w-3xl mt-3">
          Find answers to common questions about our platform, services, and
          policies.
        </p>
      </div>
    </section>
  );
}

function FAQContent({
  faqCategories,
}: {
  faqCategories: Array<{
    category: string;
    questions: Array<{ question: string; answer: string }>;
  }>;
}) {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-8 sm:space-y-12 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900 mt-8 sm:mt-12 mb-8 sm:mb-12">
      {faqCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-900 border-b border-neutral-200 dark:border-neutral-200 pb-3">
            {category.category}
          </h2>
          <div className="space-y-3">
            {category.questions.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-sm sm:text-md font-semibold text-neutral-900 dark:text-neutral-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

