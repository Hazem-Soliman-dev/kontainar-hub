import { createMetadata } from "@/lib/seo/metadata";
import { PolicyLayout } from "@/components/ui/policy-layout";

export const metadata = createMetadata({
  title: "Terms of Service",
  description:
    "Read TajirJomla Hub's Terms of Service to understand the rules and regulations for using our marketplace platform.",
  path: "/terms-of-service",
  keywords: ["terms", "terms of service", "legal", "agreement", "conditions"],
});

export default function TermsOfServicePage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing or using TajirJomla Hub, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.`,
    },
    {
      title: "2. Use License",
      content: `Permission is granted to temporarily download one copy of the materials (information or software) on TajirJomla Hub's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
• Modify or copy the materials;
• Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);
• Attempt to decompile or reverse engineer any software contained on TajirJomla Hub's website;
• Remove any copyright or other proprietary notations from the materials; or
• Transfer the materials to another person or "mirror" the materials on any other server.`,
    },
    {
      title: "3. User Accounts",
      content: `To access certain features of the platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.`,
    },
    {
      title: "4. Marketplace Rules",
      content: `As a user of our marketplace, you agree not to:
• Post false, inaccurate, misleading, defamatory, or libelous content;
• Violate any laws, third party rights, or our policies;
• Distribute or post spam, unsolicited, or bulk electronic communications;
• Distribute viruses or any other technologies that may harm TajirJomla Hub or the interests or property of TajirJomla Hub users;
• Harvest or otherwise collect information about users, including email addresses, without their consent.`,
    },
    {
      title: "5. Disclaimer",
      content: `The materials on TajirJomla Hub's website are provided on an 'as is' basis. TajirJomla Hub makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.`,
    },
    {
      title: "6. Limitations",
      content: `In no event shall TajirJomla Hub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on TajirJomla Hub's website, even if TajirJomla Hub or a TajirJomla Hub authorized representative has been notified orally or in writing of the possibility of such damage.`,
    },
    {
      title: "7. Governing Law",
      content: `These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which TajirJomla Hub operates and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.`,
    },
    {
      title: "8. Changes to Terms",
      content: `TajirJomla Hub reserves the right, at its sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.`,
    },
    {
      title: "9. Contact Us",
      content: `If you have any questions about these Terms, please contact us at:

Email: legal@tajirjomlahub.com
Address: 123 Market Street, Suite 456, San Francisco, CA 94105`,
    },
  ];

  return (
    <PolicyLayout
      title="Terms of Service"
      description="Please read these terms carefully before using our platform."
      lastUpdated={new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
      sections={sections}
    />
  );
}
