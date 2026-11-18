import type { Metadata } from "next";
import Image from "next/image";
import { Icon } from "@/components/Icons";
import { LeadButton } from "@/components/LeadModal";
import { Process } from "@/components/home/Sections";
import { StationTypes } from "@/components/home/StationTypes";
import { ContactBand, PageHero } from "@/components/Shared";
import { services } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Послуги",
  description: "Проєктування й монтаж сонячних станцій для дому та бізнесу, зелений тариф, сервіс і юридичний супровід. Одеса та область.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Енергонезалежність під ключ"
        title={
          <>
            Від консультації <span className="accent">до першого кіловата</span>
          </>
        }
        lead="Беремо на себе весь цикл: аналіз споживання, проєкт, обладнання, монтаж, пусконаладку, зелений тариф і сервіс після запуску."
        crumbs={[{ label: "Послуги", href: "/posluhy" }]}
      >
        <LeadButton className="btn btn-primary btn-lg">
          Безкоштовна консультація <Icon name="arrow" size={18} />
        </LeadButton>
      </PageHero>

      <section className="section section-top-0">
        <div className="container svc-list">
          {services.map((s, i) => (
            <article key={s.id} id={s.id} className={`svc${i % 2 ? " is-flip" : ""}`} data-reveal>
              <div className="svc-media">
                <Image src={s.image} alt={s.title} fill sizes="(max-width: 900px) 100vw, 46vw" />
                <span className="svc-num mono">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="svc-body">
                <span className="mono">{s.short}</span>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
                <ul className="check-list">
                  {s.points.map((p) => (
                    <li key={p}>
                      <Icon name="check" size={18} />
                      {p}
                    </li>
                  ))}
                </ul>
                <LeadButton title={s.title} details={`Послуга: ${s.title}`} className="btn btn-outline">
                  Замовити <Icon name="arrow" size={16} />
                </LeadButton>
              </div>
            </article>
          ))}
        </div>
      </section>

      <StationTypes />
      <Process />
      <ContactBand />
    </>
  );
}
