import { createMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/ui/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { 
  Newspaper, 
  Download, 
  Mail, 
  FileText, 
  Image as ImageIcon,
  Users,
  Globe2,
  TrendingUp,
  Calendar,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Press",
  description:
    "Press releases, media kit, and company information for journalists and media professionals covering TajirJomla Hub.",
  path: "/press",
  keywords: ["press", "media", "news", "press release", "media kit", "journalists"],
});

export default function PressPage() {
  const pressReleases = [
    {
      date: "March 15, 2024",
      title: "TajirJomla Hub Launches Global Expansion Initiative",
      excerpt: "Company announces plans to expand operations to 20 new countries, connecting more businesses worldwide.",
      category: "Company News",
    },
    {
      date: "February 28, 2024",
      title: "New Analytics Dashboard Helps Businesses Make Data-Driven Decisions",
      excerpt: "Platform introduces advanced analytics tools providing real-time insights into market trends and business performance.",
      category: "Product Update",
    },
    {
      date: "January 10, 2024",
      title: "TajirJomla Hub Reaches 10,000 Active Business Milestone",
      excerpt: "Marketplace celebrates significant growth milestone with over 10,000 active businesses using the platform.",
      category: "Milestone",
    },
    {
      date: "December 5, 2023",
      title: "Partnership with Leading Logistics Providers Announced",
      excerpt: "New partnerships enable faster shipping and better logistics solutions for platform users.",
      category: "Partnership",
    },
  ];

  const mediaKit = [
    {
      icon: ImageIcon,
      title: "Company Logo & Brand Assets",
      description: "High-resolution logos, brand guidelines, and visual assets",
      action: "Download Assets",
    },
    {
      icon: FileText,
      title: "Company Fact Sheet",
      description: "Key facts, statistics, and company information in PDF format",
      action: "Download PDF",
    },
    {
      icon: Users,
      title: "Executive Bios",
      description: "Biographies and photos of company leadership team",
      action: "View Bios",
    },
    {
      icon: ImageIcon,
      title: "Product Screenshots",
      description: "High-quality screenshots of the platform and key features",
      action: "Download Images",
    },
  ];

  const companyFacts = [
    { label: "Founded", value: "2020" },
    { label: "Headquarters", value: "San Francisco, CA" },
    { label: "Active Businesses", value: "10,000+" },
    { label: "Countries Served", value: "50+" },
    { label: "Team Members", value: "150+" },
    { label: "Products Listed", value: "500,000+" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      <PageHeader
        title="Press & Media"
        description="Latest news, press releases, and resources for journalists and media professionals."
      />

      <ContentSection>
        <div className="mx-auto max-w-7xl">
          {/* Press Releases Section */}
          <div className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-4">
                Press Releases
              </h2>
              <p className="text-lg text-neutral-900 dark:text-neutral-200">
                Stay updated with our latest company news and announcements.
              </p>
            </div>

            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <PressReleaseCard key={index} {...release} />
              ))}
            </div>
          </div>

          {/* Company Facts Section */}
          <div className="mb-20 py-12 bg-neutral-100 dark:bg-neutral-900/50 rounded-3xl border border-neutral-200 dark:border-neutral-800">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-8 text-center">
                Company Facts
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {companyFacts.map((fact, index) => (
                  <div key={index} className="text-center p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                      {fact.value}
                    </div>
                    <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      {fact.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Media Kit Section */}
          <div className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-4">
                Media Kit
              </h2>
              <p className="text-lg text-neutral-900 dark:text-neutral-200">
                Download resources and assets for your articles and coverage.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {mediaKit.map((item, index) => (
                <MediaKitCard key={index} {...item} />
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="mb-20 py-12 bg-neutral-100 dark:bg-neutral-900/50 rounded-3xl border border-neutral-200 dark:border-neutral-800">
            <div className="max-w-3xl mx-auto px-6">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-6 text-center">
                About TajirJomla Hub
              </h2>
              <div className="space-y-4 text-lg text-neutral-900 dark:text-neutral-200 leading-relaxed">
                <p>
                  TajirJomla Hub is a leading multi-vendor marketplace platform that connects businesses worldwide. 
                  We provide a comprehensive ecosystem where suppliers, traders, and businesses can discover, connect, 
                  and transact with confidence.
                </p>
                <p>
                  Our platform combines advanced technology, secure transactions, and global logistics to simplify 
                  international trade. With over 10,000 active businesses and operations spanning 50+ countries, 
                  we're building the future of global commerce.
                </p>
                <p>
                  Founded in 2020, TajirJomla Hub has quickly become a trusted partner for businesses looking to 
                  expand their reach and streamline their supply chain operations.
                </p>
              </div>
            </div>
          </div>

          {/* Press Contact Section */}
          <ContentSection className="bg-neutral-100/50 dark:bg-neutral-900/50">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-4">
                Press Inquiries
              </h2>
              <p className="text-neutral-900 dark:text-neutral-200 mb-8">
                For media inquiries, interview requests, or additional information, please contact our press team.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="mailto:press@tajirjomlahub.com"
                  className="inline-flex items-center justify-center rounded-full bg-primary-600 dark:bg-primary-500 text-neutral-100 dark:text-neutral-900 px-8 py-3 text-sm font-bold hover:bg-primary-500 dark:hover:bg-primary-400 transition-colors"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  press@tajirjomlahub.com
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 px-8 py-3 text-sm font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                >
                  Contact Form
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-left">
                <h3 className="font-bold text-neutral-900 dark:text-neutral-200 mb-4">Press Contact Information</h3>
                <div className="space-y-2 text-sm text-neutral-900 dark:text-neutral-200">
                  <p><strong>Email:</strong> press@tajirjomlahub.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Market Street, Suite 456, San Francisco, CA 94105</p>
                  <p><strong>Response Time:</strong> We typically respond to press inquiries within 24 hours.</p>
                </div>
              </div>
            </div>
          </ContentSection>
        </div>
      </ContentSection>
    </div>
  );
}

function PressReleaseCard({ date, title, excerpt, category }: { date: string, title: string, excerpt: string, category: string }) {
  return (
    <div className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-3 py-1 rounded-full">
              {category}
            </span>
            <span className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400">
              <Calendar className="h-4 w-4" />
              {date}
            </span>
          </div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-200 mb-2">
            {title}
          </h3>
          <p className="text-neutral-900 dark:text-neutral-200 leading-relaxed">
            {excerpt}
          </p>
        </div>
        <Link
          href="/contact"
          className="flex-shrink-0 inline-flex items-center justify-center rounded-full bg-primary-600 dark:bg-primary-500 text-neutral-100 dark:text-neutral-900 px-4 py-2 text-sm font-bold hover:bg-primary-500 dark:hover:bg-primary-400 transition-colors"
        >
          Read More
          <ExternalLink className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function MediaKitCard({ icon: Icon, title, description, action }: { icon: any, title: string, description: string, action: string }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mb-3 text-xl font-bold text-neutral-900 dark:text-neutral-200">{title}</h3>
      <p className="mb-6 flex-1 text-neutral-900 dark:text-neutral-200 leading-relaxed">
        {description}
      </p>
      <button className="inline-flex items-center justify-center rounded-full bg-primary-600 dark:bg-primary-500 text-neutral-100 dark:text-neutral-900 px-6 py-2.5 text-sm font-bold hover:bg-primary-500 dark:hover:bg-primary-400 transition-colors w-full sm:w-auto">
        <Download className="mr-2 h-4 w-4" />
        {action}
      </button>
    </div>
  );
}

