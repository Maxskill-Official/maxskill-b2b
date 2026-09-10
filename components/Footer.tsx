import Image from "next/image";
import Link from "next/link";
import { companyInfo, services } from "@/data/company";

const companyLinks = [
  { href: "/about", label: "회사소개" },
  { href: "/projects", label: "사업분야" },
  { href: "/services", label: "업무분야" },
  { href: "/projects/list", label: "수행실적" },
  { href: "/careers", label: "인재채용" },
  { href: "/contact", label: "Contact Us" },
];

const serviceLinks = services.map((service) => ({
  href: `/services#${service.id}`,
  label: service.title,
}));

export default function Footer() {
  return (
    <footer className="bg-brand-blue">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Image
              src="/images/logo-maxskill-white.png"
              alt="MaxSkill"
              width={205}
              height={66}
              className="h-14 w-auto"
            />
            <div className="mt-6 space-y-1 text-sm text-white/70">
              <p>{companyInfo.address}</p>
              <p>T {companyInfo.tel}</p>
              <p>F {companyInfo.fax}</p>
              <p>{companyInfo.email}</p>
            </div>
          </div>

          <div>
            <p className="brand-font text-sm text-white">Company</p>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="brand-font text-sm text-white">Services</p>
            <ul className="mt-4 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-8">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} {companyInfo.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
