import {
  Mail,
  Phone,
  MessageSquare,
  Handshake,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import Link from "next/link";

import { metadata } from "./metadata";
export { metadata };

import { ContactClient } from "./contact-client";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-50 text-neutral-900 dark:text-neutral-900">
      <main className="flex flex-col gap-20 pb-26">
        <HeroSection />
        <ContactInfoSection />
        <ContactFormSection />
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
      <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-purple-400/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-16 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Get in Touch
          <span className="block font-normal text-white/80 text-2xl lg:text-5xl mt-2">
            We're Here to Help
          </span>
        </h1>
      </div>
    </section>
  );
}

function ContactInfoSection() {
  const contactCards = [
    {
      icon: Mail,
      title: "General Support",
      description: "For general inquiries and account questions",
      email: "support@kontainarhub.com",
      hours: "24/7 Support",
      color: "blue",
    },
    {
      icon: Phone,
      title: "Sales",
      description: "Interested in our plans or enterprise solutions?",
      email: "sales@kontainarhub.com",
      phone: "+1 (555) 123-4567",
      color: "indigo",
    },
    {
      icon: MessageSquare,
      title: "Technical Support",
      description: "Need help with technical issues?",
      email: "tech@kontainarhub.com",
      responseTime: "Response within 24 hours",
      color: "purple",
    },
    {
      icon: Handshake,
      title: "Partnerships",
      description: "Let's explore partnership opportunities",
      email: "partners@kontainarhub.com",
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
    <section className="mx-auto w-full max-w-7xl space-y-6 px-6 text-neutral-900 dark:text-neutral-900">
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-900">
          Contact Information
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {contactCards.map((card) => {
          const Icon = card.icon;
          const colorClass =
            colorClasses[card.color as keyof typeof colorClasses];
          return (
            <div
              key={card.title}
              className="flex flex-col gap-4 rounded-3xl border border-neutral-200 dark:border-neutral-200 bg-neutral-100/60 dark:bg-neutral-100/60 p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-500/60"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${colorClass} border`}
              >
                <Icon className="h-8 w-8" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-md font-semibold text-neutral-900 dark:text-neutral-900">
                  {card.title}
                </h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-700">{card.description}</p>
              </div>
              <div className="space-y-2 text-sm text-neutral-700 dark:text-neutral-700">
                <div>
                  <p className="text-xs text-neutral-700 dark:text-neutral-700 uppercase tracking-wide">
                    Email
                  </p>
                  <a
                    href={`mailto:${card.email}`}
                    className="text-blue-400 hover:text-blue-300 transition"
                  >
                    {card.email}
                  </a>
                </div>
                {card.phone && (
                  <div>
                    <p className="text-xs text-neutral-700 dark:text-neutral-700 uppercase tracking-wide">
                      Phone
                    </p>
                    <a
                      href={`tel:${card.phone}`}
                      className="text-blue-400 hover:text-blue-300 transition"
                    >
                      {card.phone}
                    </a>
                  </div>
                )}
                {card.hours && (
                  <div>
                    <p className="text-xs text-neutral-700 dark:text-neutral-700 uppercase tracking-wide">
                      Hours
                    </p>
                    <p className="text-neutral-700 dark:text-neutral-700">{card.hours}</p>
                  </div>
                )}
                {card.responseTime && (
                  <div>
                    <p className="text-xs text-neutral-700 dark:text-neutral-700 uppercase tracking-wide">
                      Response Time
                    </p>
                    <p className="text-neutral-700 dark:text-neutral-700">{card.responseTime}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ContactFormSection() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 text-neutral-900 dark:text-neutral-900">
      <div className="flex flex-col gap-2 items-center justify-center mb-8">
        <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-900">Send us a Message</h2>
      </div>
      <ContactClient />
    </section>
  );
}
