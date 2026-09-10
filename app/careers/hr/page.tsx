import PageHero from "@/components/PageHero";
import CareersBanner from "@/components/CareersBanner";
import { employeeBenefits, salarySystemIntro, salaryTable } from "@/data/careers";

export default function CareersHrPage() {
  return (
    <main>
      <PageHero subtitle="Careers" title="인사제도" />

      <section className="section-container py-16 sm:py-20">
        <CareersBanner />

        <div className="mt-14 space-y-14 sm:mt-16 sm:space-y-16">
          <div>
            <h2 className="text-2xl font-bold text-brand-blue sm:text-3xl">
              급여체계
            </h2>
            <p className="body-copy mt-4 text-base text-gray-300">
              {salarySystemIntro}
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-brand-card">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-sm font-extrabold text-brand-tan sm:text-base">
                      구분
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-extrabold text-brand-blue sm:text-base">
                      항목
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-extrabold text-brand-blue sm:text-base">
                      내용
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {salaryTable.map((group) =>
                    group.rows.map((row, rowIndex) => (
                      <tr
                        key={`${group.category}-${row.label}`}
                        className={`border-b border-white/5 ${
                          rowIndex % 2 === 0
                            ? "bg-transparent"
                            : "bg-white/[0.02]"
                        }`}
                      >
                        {rowIndex === 0 && (
                          <td
                            rowSpan={group.rows.length}
                            className="border-r border-white/5 px-6 py-5 align-top text-sm font-semibold text-white sm:text-base"
                          >
                            {group.category}
                          </td>
                        )}
                        <td className="border-r border-white/5 px-6 py-5 align-top text-sm font-medium text-gray-200 sm:text-base">
                          {row.label}
                        </td>
                        <td className="px-6 py-5 align-top">
                          {row.items.length > 0 ? (
                            <ul className="space-y-2">
                              {row.items.map((item) => (
                                <li
                                  key={item}
                                  className="body-copy text-sm text-gray-300 sm:text-base"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-sm text-gray-500 sm:text-base">
                              -
                            </span>
                          )}
                        </td>
                      </tr>
                    )),
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-brand-blue sm:text-3xl">
              사원복지
            </h2>
            <ul className="mt-6 space-y-3">
              {employeeBenefits.map((benefit) => (
                <li
                  key={benefit}
                  className="body-copy flex gap-3 text-base text-gray-300"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
