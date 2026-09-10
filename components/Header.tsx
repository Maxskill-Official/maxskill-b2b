"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { careersNav } from "@/data/careers";
import { projectCategories } from "@/data/projects";
import { services } from "@/data/services";

function isServicesPath(pathname: string) {
  return pathname === "/services" || pathname.startsWith("/services/");
}

function isProjectsPath(pathname: string) {
  return pathname === "/projects" || pathname.startsWith("/projects/");
}

function isCareersPath(pathname: string) {
  return pathname === "/careers" || pathname.startsWith("/careers/");
}

function hashMatches(activeHash: string, id: string) {
  if (!activeHash) return false;
  return decodeURIComponent(activeHash.slice(1)) === id;
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [careersOpen, setCareersOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const servicesActive = isServicesPath(pathname);
  const projectsActive = isProjectsPath(pathname);
  const careersActive = isCareersPath(pathname);

  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-brand-dark/95 backdrop-blur-md">
      <div className="flex w-full items-center justify-between py-6 pl-5 pr-5 sm:pl-8 sm:pr-8 lg:pl-10 lg:pr-10">
        <Link
          href="/"
          className="shrink-0"
          aria-label="MaxSkill 홈"
        >
          <Image
            src="/images/logo-maxskill.png"
            alt="MaxSkill"
            width={205}
            height={66}
            className="h-9 w-auto sm:h-11"
            priority
          />
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-12 lg:flex xl:gap-16 2xl:gap-20">
          <Link
            href="/about"
            className={`nav-link transition-colors ${
              pathname === "/about"
                ? "text-brand-blue"
                : "text-gray-200 hover:text-white"
            }`}
          >
            회사소개
          </Link>

          <div className="group relative">
            <Link
              href="/projects"
              className={`nav-link transition-colors ${
                projectsActive
                  ? "text-brand-blue"
                  : "text-gray-200 hover:text-white"
              }`}
            >
              사업분야
            </Link>

            <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-36 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-brand-dark shadow-2xl">
                {projectCategories.map((category) => {
                  const href = `/projects#${encodeURIComponent(category)}`;
                  const isActive =
                    pathname === "/projects" && hashMatches(activeHash, category);

                  return (
                    <Link
                      key={category}
                      href={href}
                      className={`block whitespace-nowrap px-4 py-3.5 text-center text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-brand-blue/15 text-brand-blue"
                          : "text-gray-200 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {category}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="group relative">
            <Link
              href="/services"
              className={`nav-link transition-colors ${
                servicesActive
                  ? "text-brand-blue"
                  : "text-gray-200 hover:text-white"
              }`}
            >
              업무분야
            </Link>

            <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-36 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-brand-dark shadow-2xl">
                {services.map((service) => {
                  const href = `/services#${service.id}`;
                  const isActive =
                    pathname === "/services" &&
                    activeHash === `#${service.id}`;

                  return (
                    <Link
                      key={service.id}
                      href={href}
                      className={`block whitespace-nowrap px-4 py-3.5 text-center text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-brand-blue/15 text-brand-blue"
                          : "text-gray-200 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {service.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="group relative">
            <Link
              href="/careers"
              className={`nav-link transition-colors ${
                careersActive
                  ? "text-brand-blue"
                  : "text-gray-200 hover:text-white"
              }`}
            >
              인재채용
            </Link>

            <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-36 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
              <div className="overflow-hidden rounded-xl border border-white/10 bg-brand-dark shadow-2xl">
                {careersNav.map((item) => {
                  const isActive =
                    item.href === "/careers"
                      ? pathname === "/careers"
                      : pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block whitespace-nowrap px-4 py-3.5 text-center text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-brand-blue/15 text-brand-blue"
                          : "text-gray-200 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="brand-font hidden rounded-full border border-white/30 px-6 py-2.5 text-sm text-white transition-colors hover:border-white hover:bg-white/5 sm:inline-flex lg:text-base"
          >
            Contact Us
          </Link>

          <button
            type="button"
            aria-label="메뉴 열기"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 lg:hidden"
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-white/5 bg-brand-dark px-5 py-8 lg:hidden">
          <div className="flex flex-col gap-6">
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className={`nav-link ${
                pathname === "/about" ? "text-brand-blue" : "text-gray-200"
              }`}
            >
              회사소개
            </Link>

            <div>
              <button
                type="button"
                onClick={() => setProjectsOpen(!projectsOpen)}
                className={`nav-link flex w-full items-center justify-between ${
                  projectsActive ? "text-brand-blue" : "text-gray-200"
                }`}
              >
                사업분야
                <span
                  className={`text-xs transition-transform ${projectsOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>

              {projectsOpen && (
                <div className="mt-4 flex flex-col items-center gap-3">
                  {projectCategories.map((category) => (
                    <Link
                      key={category}
                      href={`/projects#${encodeURIComponent(category)}`}
                      onClick={() => {
                        setMenuOpen(false);
                        setProjectsOpen(false);
                      }}
                      className={`text-center text-sm font-semibold ${
                        pathname === "/projects" &&
                        hashMatches(activeHash, category)
                          ? "text-brand-blue"
                          : "text-gray-300"
                      }`}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`nav-link flex w-full items-center justify-between ${
                  servicesActive ? "text-brand-blue" : "text-gray-200"
                }`}
              >
                업무분야
                <span
                  className={`text-xs transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>

              {servicesOpen && (
                <div className="mt-4 flex flex-col items-center gap-3">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services#${service.id}`}
                      onClick={() => {
                        setMenuOpen(false);
                        setServicesOpen(false);
                      }}
                      className={`text-center text-sm font-semibold ${
                        pathname === "/services" &&
                        activeHash === `#${service.id}`
                          ? "text-brand-blue"
                          : "text-gray-300"
                      }`}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={() => setCareersOpen(!careersOpen)}
                className={`nav-link flex w-full items-center justify-between ${
                  careersActive ? "text-brand-blue" : "text-gray-200"
                }`}
              >
                인재채용
                <span
                  className={`text-xs transition-transform ${careersOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>

              {careersOpen && (
                <div className="mt-4 flex flex-col items-center gap-3">
                  {careersNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        setMenuOpen(false);
                        setCareersOpen(false);
                      }}
                      className={`text-center text-sm font-semibold ${
                        pathname === item.href
                          ? "text-brand-blue"
                          : "text-gray-300"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="brand-font mt-2 inline-flex w-fit rounded-full border border-white/30 px-6 py-2.5 text-base text-white"
            >
              Contact Us
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
