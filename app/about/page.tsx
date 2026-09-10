import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import HeroSlideshow from "@/components/HeroSlideshow";
import { companyInfo, history } from "@/data/company";

export default function AboutPage() {
  return (
    <main>
      <HeroSlideshow>
        <p className="page-subtitle">About Us</p>
        <h1 className="page-title mt-5 max-w-3xl">
          회사소개
        </h1>
      </HeroSlideshow>

      <section className="flex min-h-[260px] items-center bg-brand-blue sm:min-h-[300px] lg:min-h-[340px]">
        <div className="section-container py-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/75">
            Vision
          </p>
          <h2 className="mt-3 whitespace-nowrap text-[clamp(0.85rem,2.1vw,1.85rem)] font-bold text-white sm:text-3xl lg:text-4xl">
            {companyInfo.vision}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl whitespace-nowrap break-keep text-sm text-white/80 sm:text-base">
            고객 만족을 통해 &apos;Good Company&apos;가 되겠습니다.
          </p>
        </div>
      </section>

      <section className="section-container py-20 sm:py-28">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,400px)] lg:items-stretch lg:gap-14">
          <div>
            <SectionHeading
              label="History"
              title="회사 연혁"
            />

            <div className="mt-14 space-y-0">
              {history.map((item) => (
                <div
                  key={item.year + item.event}
                  className="relative flex gap-8 border-l border-brand-card-border pb-10 pl-8 last:pb-0"
                >
                  <span className="absolute -left-2 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand-blue" />
                  <div className="shrink-0">
                    <p className="brand-font text-sm text-brand-blue">
                      {item.year}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {item.event}
                    </p>
                    <div className="mt-2 h-px w-full bg-brand-card-border" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="relative min-h-[22rem] flex-1 overflow-hidden rounded-2xl border border-brand-card-border bg-brand-card">
              <Image
                src="/images/about/ceo-color.png"
                alt={`${companyInfo.ceoTitle} ${companyInfo.ceoName}`}
                fill
                unoptimized
                className="object-cover object-[58%_55%]"
                sizes="(min-width: 1024px) 400px, 100vw"
                priority
              />
            </div>
            <div className="-translate-x-4 mt-4 grid w-full shrink-0 grid-cols-2 items-center gap-3 sm:-translate-x-5">
              <p className="text-right text-sm font-medium text-white sm:text-base">
                {companyInfo.ceoTitle} {companyInfo.ceoName}
              </p>
              <Image
                src="/images/about/ceo-signature.png"
                alt={`${companyInfo.ceoName} 서명`}
                width={200}
                height={46}
                unoptimized
                className="h-8 w-auto justify-self-start sm:h-9"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-brand-card-border bg-brand-card px-6 py-6">
            <p className="text-sm text-gray-400">
              {companyInfo.scaleYear}년 기준 매출
            </p>
            <p className="mt-2 text-3xl font-bold text-white">
              {companyInfo.revenue}
            </p>
          </div>
          <div className="rounded-2xl border border-brand-card-border bg-brand-card px-6 py-6">
            <p className="text-sm text-gray-400">재직 인원</p>
            <p className="mt-2 text-3xl font-bold text-white">
              {companyInfo.headcount}
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
