import Image from "next/image";
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
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-0">
          <div className="flex items-end justify-center">
            <div className="w-full max-w-[400px]">
              <p className="page-subtitle">History</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand-blue-light sm:text-3xl">
                회사 연혁
              </h2>

              <div className="mt-8 space-y-0">
                {history.map((item) => (
                  <div
                    key={item.year + item.event}
                    className="relative flex gap-5 border-l border-brand-card-border pb-4 pl-6 last:pb-0"
                  >
                    <span className="absolute -left-1.5 top-1 flex h-3 w-3 items-center justify-center rounded-full bg-brand-blue" />
                    <div className="shrink-0">
                      <p className="brand-font text-xs leading-5 text-brand-blue">
                        {item.year}
                      </p>
                    </div>
                    <div>
                      <p className="text-base font-semibold leading-5 text-white">
                        {item.event}
                      </p>
                      <div className="mt-1.5 h-px w-full bg-brand-card-border" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-end">
            <div className="relative mx-auto aspect-[20/21] w-full max-w-[200px] overflow-hidden rounded-2xl border border-brand-card-border bg-brand-card">
              <Image
                src="/images/about/ceo-color.png"
                alt={`${companyInfo.ceoTitle} ${companyInfo.ceoName}`}
                fill
                unoptimized
                className="object-cover object-[58%_55%]"
                sizes="200px"
                priority
              />
            </div>
            <div className="mt-3 flex shrink-0 items-center justify-center gap-3">
              <p className="whitespace-nowrap text-sm font-medium text-white">
                {companyInfo.ceoTitle} {companyInfo.ceoName}
              </p>
              <Image
                src="/images/about/ceo-signature.png"
                alt={`${companyInfo.ceoName} 서명`}
                width={200}
                height={46}
                unoptimized
                className="h-8 w-auto"
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
