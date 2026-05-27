import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Section } from "@/components/common/section";
import { ContactForm } from "@/features/contact/components/contact-form";
import { createPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Get in touch with Nutheer System for IT services and training.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Section>
      <PageHeader
        title="Contact us"
        description="We respond within one business day for services, training, and partnership inquiries."
      />
      <div className="grid gap-10 lg:grid-cols-3 mt-8">
        <div className="space-y-6 lg:col-span-1">
          <div className="flex gap-3 text-sm">
            <Mail className="h-5 w-5 text-primary shrink-0" aria-hidden />
            <div>
              <p className="font-medium">Email</p>
              <a
                href={`mailto:${siteConfig.company.email}`}
                className="text-muted-foreground hover:text-primary"
              >
                {siteConfig.company.email}
              </a>
            </div>
          </div>
          <div className="flex gap-3 text-sm">
            <Phone className="h-5 w-5 text-primary shrink-0" aria-hidden />
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-muted-foreground">{siteConfig.company.phone}</p>
            </div>
          </div>
          <div className="flex gap-3 text-sm">
            <MapPin className="h-5 w-5 text-primary shrink-0" aria-hidden />
            <div>
              <p className="font-medium">Location</p>
              <p className="text-muted-foreground">{siteConfig.company.address}</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
