import { createMetadata } from "@/lib/seo/metadata";
import { Building2, Users, Target, Award, CheckCircle2, Globe2, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "Learn about TajirJomla Hub, your trusted multi-vendor marketplace connecting buyers with quality stores worldwide.",
  path: "/about",
  keywords: ["about", "company", "marketplace", "mission", "vision"],
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      {/* Hero Section */}
      <div className="relative bg-neutral-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[50%] -right-[20%] w-[80%] h-[200%] bg-gradient-to-bl from-primary-900/40 via-purple-900/20 to-transparent -rotate-12 blur-3xl opacity-60" />
          <div className="absolute -bottom-[50%] -left-[20%] w-[80%] h-[200%] bg-gradient-to-tr from-secondary-900/40 via-blue-900/20 to-transparent rotate-12 blur-3xl opacity-60" />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-6">
            Building the Future of Global Trade
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-900 dark:text-neutral-200 mb-10">
            We're revolutionizing the way businesses discover and connect with suppliers and traders worldwide.
          </p>
        </div>
      </div>

      <main className="relative z-10">
        {/* Mission Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl">
                Connecting the World Through Commerce
              </h2>
              <div className="space-y-6 text-lg text-neutral-900 dark:text-neutral-200">
                <p>
                  Founded with a vision to simplify global commerce, TajirJomla Hub has grown into a trusted ecosystem where businesses of all sizes can thrive. We believe that geography shouldn't be a barrier to growth.
                </p>
                <p>
                  Our platform combines cutting-edge technology with human-centric support to create seamless connections between buyers and sellers. Whether you're a local artisan or a multinational distributor, we provide the tools you need to succeed.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <div className="text-3xl font-bold text-primary-700 dark:text-primary-400 mb-1">50+</div>
                  <div className="text-sm font-medium text-neutral-900 dark:text-neutral-200">Countries Served</div>
                </div>
                <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <div className="text-3xl font-bold text-secondary-700 dark:text-secondary-400 mb-1">10k+</div>
                  <div className="text-sm font-medium text-neutral-900 dark:text-neutral-200">Active Businesses</div>
                </div>
              </div>
            </div>
            <div className="relative aspect-square lg:aspect-[4/3] overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-800 shadow-2xl border border-neutral-200 dark:border-neutral-800">
               <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 flex items-center justify-center">
                  <Globe2 className="h-32 w-32 text-neutral-300 dark:text-neutral-700 opacity-50" />
               </div>
               {/* In a real app, use <Image /> here */}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-neutral-50 dark:bg-neutral-900/50 py-20 sm:py-24 border-y border-neutral-200 dark:border-neutral-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-4">
                Our Mission & Values
              </h2>
              <p className="text-lg text-neutral-900 dark:text-neutral-200">
                We are driven by a shared purpose to make trade accessible, secure, and profitable for everyone.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <ValueCard
                icon={Target}
                title="Trust & Transparency"
                description="We prioritize honesty in every transaction, ensuring you have the information needed to make confident decisions."
                color="blue"
              />
              <ValueCard
                icon={Users}
                title="Customer First"
                description="Your success is our success. We continuously evolve our platform based on your feedback and needs."
                color="indigo"
              />
              <ValueCard
                icon={Zap}
                title="Innovation"
                description="Leveraging AI and data analytics to provide smarter search, real-time insights, and seamless logistics."
                color="purple"
              />
              <ValueCard
                icon={Award}
                title="Excellence"
                description="We strive for perfection in user experience, support, and platform reliability."
                color="emerald"
              />
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-4">
              Why Choose TajirJomla Hub?
            </h2>
            <p className="text-lg text-neutral-900 dark:text-neutral-200">
              Join thousands of businesses that trust us for their sourcing and selling needs.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Global Reach", desc: "Connect with partners in over 50 countries.", icon: Globe2 },
              { title: "Verified Partners", desc: "Strict vetting process for all suppliers.", icon: ShieldCheck },
              { title: "Secure Payments", desc: "Escrow protection for peace of mind.", icon: CheckCircle2 },
              { title: "24/7 Support", desc: "Round-the-clock assistance in multiple languages.", icon: Users },
              { title: "Smart Analytics", desc: "Data-driven insights to grow your business.", icon: Target },
              { title: "Fast Shipping", desc: "Integrated logistics for reliable delivery.", icon: Zap },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                <div className="flex-shrink-0 mt-1 rounded-xl bg-primary-50 dark:bg-primary-900/20 p-2 text-primary-700 dark:text-primary-400">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 dark:text-neutral-200 text-lg mb-1">{item.title}</h3>
                  <p className="text-neutral-900 dark:text-neutral-200 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function ValueCard({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    indigo: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400",
    purple: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
      <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${colorStyles[color as keyof typeof colorStyles]}`}>
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mb-3 text-xl font-bold text-neutral-900 dark:text-neutral-200">{title}</h3>
      <p className="text-neutral-900 dark:text-neutral-200 leading-relaxed">
        {description}
      </p>
    </div>
  );
}


