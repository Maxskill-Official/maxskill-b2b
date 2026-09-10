import PageHero from "@/components/PageHero";
import { companyInfo } from "@/data/company";

const mapQuery = "서울특별시 성동구 성수이로 66 서울숲드림타워";
const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&hl=ko&z=16&output=embed`;
const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;

export default function ContactPage() {
  return (
    <main>
      <PageHero subtitle="Contact Us" title="문의하기" />

      <section className="section-container pb-20 pt-8 sm:pb-28 sm:pt-10">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-white">연락처 정보</h2>
            <div className="mt-8 space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-400">Address</p>
                <p className="body-copy mt-1 text-white">{companyInfo.address}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Email</p>
                <p className="mt-1 text-white">{companyInfo.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-400">Phone</p>
                <p className="mt-1 text-base leading-6 text-white">T {companyInfo.tel}</p>
                <p className="text-base leading-6 text-white">F {companyInfo.fax}</p>
              </div>
            </div>
          </div>

          <div className="lg:flex lg:flex-col">
            <h2 className="text-2xl font-bold text-white">오시는 길</h2>
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-brand-card">
              <iframe
                title="맥스킬 오시는 길"
                src={mapEmbedSrc}
                className="h-[280px] w-full sm:h-[320px] lg:h-[180px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-base font-semibold leading-6 text-brand-blue hover:underline lg:mt-auto"
            >
              크게 보기
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
