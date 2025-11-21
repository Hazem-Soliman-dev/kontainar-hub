import { createMetadata } from "@/lib/seo/metadata";
import { PageHeader } from "@/components/ui/page-header";
import { ContentSection } from "@/components/ui/content-section";
import { 
  Briefcase, 
  Users, 
  Heart, 
  Zap, 
  Globe2, 
  DollarSign, 
  GraduationCap,
  Calendar,
  MapPin,
  ArrowRight,
  Mail,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Careers",
  description:
    "Join the TajirJomla Hub team and help shape the future of global trade. Explore open positions and learn about our culture.",
  path: "/careers",
  keywords: ["careers", "jobs", "employment", "hiring", "work with us"],
});

export default function CareersPage() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Compensation",
      description: "We offer competitive salaries and comprehensive benefits packages.",
      color: "blue",
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Medical, dental, and vision insurance plus wellness programs.",
      color: "emerald",
    },
    {
      icon: GraduationCap,
      title: "Learning & Development",
      description: "Continuous learning opportunities and professional development support.",
      color: "purple",
    },
    {
      icon: Calendar,
      title: "Flexible Work",
      description: "Remote work options and flexible hours to support work-life balance.",
      color: "indigo",
    },
    {
      icon: Globe2,
      title: "Global Impact",
      description: "Work on products that connect businesses worldwide.",
      color: "blue",
    },
    {
      icon: Zap,
      title: "Innovation Culture",
      description: "Be part of a team that values creativity and innovation.",
      color: "purple",
    },
  ];

  const openPositions = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote / San Francisco, CA",
      type: "Full-time",
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Remote / New York, NY",
      type: "Full-time",
    },
    {
      title: "UX Designer",
      department: "Design",
      location: "Remote / London, UK",
      type: "Full-time",
    },
    {
      title: "Business Development Manager",
      department: "Sales",
      location: "Dubai, UAE",
      type: "Full-time",
    },
    {
      title: "Customer Success Specialist",
      department: "Support",
      location: "Remote",
      type: "Full-time",
    },
    {
      title: "Data Analyst",
      department: "Analytics",
      location: "Remote / Berlin, Germany",
      type: "Full-time",
    },
  ];

  const values = [
    "Innovation and continuous improvement",
    "Transparency and open communication",
    "Work-life balance and employee wellbeing",
    "Diversity, equity, and inclusion",
    "Customer-first mindset",
    "Collaboration and teamwork",
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
      <PageHeader
        title="Join Our Team"
        description="Help us build the future of global trade. We're looking for passionate individuals who want to make an impact."
      />

      <ContentSection>
        <div className="mx-auto max-w-7xl">
          {/* Why Work Here Section */}
          <div className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-4">
                Why Work at TajirJomla Hub?
              </h2>
              <p className="text-lg text-neutral-900 dark:text-neutral-200">
                We're building a platform that connects businesses worldwide. Join us in creating meaningful impact.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <BenefitCard key={index} {...benefit} />
              ))}
            </div>
          </div>

          {/* Our Values Section */}
          <div className="mb-20 py-12 bg-neutral-100 dark:bg-neutral-900/50 rounded-3xl border border-neutral-200 dark:border-neutral-800">
            <div className="max-w-3xl mx-auto px-6">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-8 text-center">
                Our Values
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-900 dark:text-neutral-200">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Open Positions Section */}
          <div className="mb-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-4">
                Open Positions
              </h2>
              <p className="text-lg text-neutral-900 dark:text-neutral-200">
                Explore our current openings and find the perfect role for you.
              </p>
            </div>

            <div className="space-y-4">
              {openPositions.map((position, index) => (
                <JobCard key={index} {...position} />
              ))}
            </div>
          </div>

          {/* Application Process Section */}
          <div className="mb-20 py-12 bg-neutral-100 dark:bg-neutral-900/50 rounded-3xl border border-neutral-200 dark:border-neutral-800">
            <div className="max-w-3xl mx-auto px-6">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 sm:text-4xl mb-8 text-center">
                Application Process
              </h2>
              <div className="space-y-6">
                <ProcessStep
                  number="1"
                  title="Apply"
                  description="Submit your application through our careers portal or email us your resume and cover letter."
                />
                <ProcessStep
                  number="2"
                  title="Initial Review"
                  description="Our team reviews your application and qualifications. We'll reach out if there's a match."
                />
                <ProcessStep
                  number="3"
                  title="Interview"
                  description="Selected candidates will go through interviews with the team, including technical and cultural fit assessments."
                />
                <ProcessStep
                  number="4"
                  title="Offer"
                  description="Successful candidates receive an offer with details about compensation, benefits, and start date."
                />
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <ContentSection className="bg-neutral-100/50 dark:bg-neutral-900/50">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200 mb-4">
                Don't See a Role That Fits?
              </h2>
              <p className="text-neutral-900 dark:text-neutral-200 mb-8">
                We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-primary-600 dark:bg-primary-500 text-neutral-100 dark:text-neutral-900 px-8 py-3 text-sm font-bold hover:bg-primary-500 dark:hover:bg-primary-400 transition-colors"
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <a
                  href="mailto:careers@tajirjomlahub.com"
                  className="inline-flex items-center justify-center rounded-full bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 px-8 py-3 text-sm font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  careers@tajirjomlahub.com
                </a>
              </div>
            </div>
          </ContentSection>
        </div>
      </ContentSection>
    </div>
  );
}

function BenefitCard({ icon: Icon, title, description, color }: { icon: any, title: string, description: string, color: string }) {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    indigo: "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400",
    purple: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
      <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${colorStyles[color as keyof typeof colorStyles]}`}>
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mb-3 text-xl font-bold text-neutral-900 dark:text-neutral-200">{title}</h3>
      <p className="flex-1 text-neutral-900 dark:text-neutral-200 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function JobCard({ title, department, location, type }: { title: string, department: string, location: string, type: string }) {
  return (
    <div className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-200 mb-2">
            {title}
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
            <span className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              {department}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {type}
            </span>
          </div>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-primary-600 dark:bg-primary-500 text-neutral-100 dark:text-neutral-900 px-6 py-2.5 text-sm font-bold hover:bg-primary-500 dark:hover:bg-primary-400 transition-colors whitespace-nowrap"
        >
          Apply Now
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function ProcessStep({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 dark:bg-primary-500 text-neutral-100 dark:text-neutral-900 font-bold">
          {number}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-200 mb-2">{title}</h3>
        <p className="text-neutral-900 dark:text-neutral-200">{description}</p>
      </div>
    </div>
  );
}

