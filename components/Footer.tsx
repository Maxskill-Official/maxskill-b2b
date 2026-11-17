import Image from "next/image";
import Link from "next/link";
import { companyInfo } from "@/data/company";

export default function Footer() {
  return (
    <footer className="bg-brand-blue">
      <div className="section-container py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <Image
            src="/images/logo-maxskill-white.png"
            alt="MaxSkill"
            width={205}
            height={66}
            className="h-14 w-auto shrink-0"
          />
          <div className="space-y-1 text-sm text-white/70 md:text-right">
            <p>{companyInfo.address}</p>
            <p>
              T {companyInfo.tel}
              <span className="mx-3 text-white/30">|</span>
              F {companyInfo.fax}
            </p>
            <p>{companyInfo.email}</p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/20 pt-8">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} {companyInfo.name}. All rights
            reserved.
          </p>
          <Link
            href="/login"
            className="text-xs text-white/30 transition hover:text-white/60"
          >
            로그인
          </Link>
        </div>
      </div>
    </footer>
  );
}
