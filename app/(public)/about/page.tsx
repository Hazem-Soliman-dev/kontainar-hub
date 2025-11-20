import { createMetadata } from "../../../lib/seo/metadata";
import { Breadcrumb } from "../../../components/ui/breadcrumb";
import { Building2, Users, Target, Award } from "lucide-react";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "Learn about Kontainar Hub, your trusted multi-vendor marketplace connecting buyers with quality stores worldwide.",
  path: "/about",
  keywords: ["about", "company", "marketplace", "mission", "vision"],
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
      <main className="flex flex-col pb-16 sm:pb-26">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-6">
          <Breadcrumb />
        </div>

        <HeroSection />
        <MissionSection />
        <ValuesSection />
        <TeamSection />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900">
      <div className="flex flex-col items-center justify-center text-center mb-5 sm:mb-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-neutral-900">
          About Kontainar Hub
        </h1>
        <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-700 max-w-3xl mt-3">
          Your trusted multi-vendor marketplace connecting buyers with quality
          stores worldwide. We're revolutionizing the way businesses discover and
          connect with suppliers and traders.
        </p>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900 mt-8 sm:mt-12">
      <div className="flex flex-col items-center justify-center text-center mb-5">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-900">
          Our Mission
        </h2>
      </div>
      <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-6 sm:p-8 shadow-sm">
        <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-700 leading-relaxed">
          To create a seamless, transparent, and efficient marketplace that
          empowers businesses of all sizes to discover, connect, and transact
          with trusted suppliers and traders. We believe in making global trade
          accessible, secure, and profitable for everyone.
        </p>
      </div>
    </section>
  );
}

function ValuesSection() {
  const values = [
    {
      icon: Target,
      title: "Trust & Transparency",
      description:
        "We prioritize trust and transparency in every transaction, ensuring all parties have the information they need to make informed decisions.",
      color: "blue",
    },
    {
      icon: Users,
      title: "Customer First",
      description:
        "Our customers are at the heart of everything we do. We continuously improve our platform based on your feedback and needs.",
      color: "indigo",
    },
    {
      icon: Building2,
      title: "Innovation",
      description:
        "We leverage cutting-edge technology to provide the best marketplace experience, from advanced search to real-time analytics.",
      color: "purple",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for excellence in every aspect of our platform, from user experience to customer support and platform reliability.",
      color: "emerald",
    },
  ];

  const colorClasses = {
    blue: "bg-blue-600/10 text-blue-300 border-blue-500/40",
    indigo: "bg-indigo-600/10 text-indigo-300 border-indigo-500/40",
    purple: "bg-purple-600/10 text-purple-300 border-purple-500/40",
    emerald: "bg-emerald-600/10 text-emerald-300 border-emerald-500/40",
  };

  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900 mt-8 sm:mt-12">
      <div className="flex flex-col items-center justify-center text-center mb-5">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-900">
          Our Values
        </h2>
      </div>
      <div className="grid gap-4 sm:gap-5 grid-cols-1 md:grid-cols-2">
        {values.map((value) => {
          const Icon = value.icon;
          const colorClass =
            colorClasses[value.color as keyof typeof colorClasses];
          return (
            <div
              key={value.title}
              className="flex flex-col gap-3 sm:gap-4 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-4 sm:p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-500/60"
            >
              <div
                className={`flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl ${colorClass} border`}
              >
                <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <div className="flex flex-col gap-1 sm:gap-2">
                <h3 className="text-sm sm:text-md font-semibold text-neutral-900 dark:text-neutral-900">
                  {value.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-700">
                  {value.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 text-neutral-900 dark:text-neutral-900 mt-8 sm:mt-12 mb-8 sm:mb-12">
      <div className="flex flex-col items-center justify-center text-center mb-5">
        <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-900">
          Why Choose Us
        </h2>
      </div>
      <div className="rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-6 sm:p-8 shadow-sm">
        <ul className="space-y-4 text-base sm:text-lg text-neutral-700 dark:text-neutral-700">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">•</span>
            <span>
              <strong>Global Reach:</strong> Connect with suppliers and traders
              from around the world
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">•</span>
            <span>
              <strong>Verified Partners:</strong> All stores and suppliers are
              verified for quality and reliability
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">•</span>
            <span>
              <strong>Advanced Tools:</strong> Powerful analytics and inventory
              management tools for traders and suppliers
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">•</span>
            <span>
              <strong>24/7 Support:</strong> Round-the-clock customer support to
              assist you whenever you need help
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">•</span>
            <span>
              <strong>Secure Transactions:</strong> Your data and transactions
              are protected with industry-leading security measures
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

