import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icons";
import { LeadButton } from "@/components/LeadModal";
import { ContactBand, PageHero } from "@/components/Shared";
import { credit } from "@/lib/copy";
import { objectImage } from "@/lib/objects";

export const metadata: Metadata = {
  title: "Сонячна станція в кредит від 0,01%",
  description: "«ЕнергоКредит» від Ощадбанку разом із Line Energy: ставка від 0,01%, строк до 120 місяців, застава — обладнання.",
};

const how = [
  { t: "Розрахунок", d: "Підбираємо станцію під ваше споживання й бюджет — від 5–10 кВт для дому." },
  { t: "Пакет для банку", d: "Готуємо комерційну пропозицію та документи на обладнання для кредитної заявки." },
  { t: "Рішення банку", d: "Ощадбанк розглядає заявку й погоджує індивідуальний графік погашення." },
  { t: "Монтаж", d: "Після погодження монтуємо станцію за 3–5 днів і запускаємо моніторинг." },
];

export default function CreditPage() {
  return (
    <>
      <PageHero
        eyebrow={`${credit.bank} · ${credit.program}`}
        title={
          <>
            Станція в кредит <span className="accent">від {credit.rate}</span>
          </>
        }
        lead={credit.body}
        crumbs={[{ label: "Кредит", href: "/kredyt" }]}
      >
        <LeadButton title="Станція в кредит" details="Цікавить кредит Ощадбанку «ЕнергоКредит»" className="btn btn-primary btn-lg">
          Дізнатися умови <Icon name="arrow" size={18} />
        </LeadButton>
      </PageHero>

      <section className="section section-top-0">
        <div className="container">
          <ul className="credit-terms" data-reveal>
            {credit.points.map((p) => (
              <li key={p.k}>
                <span className="mono">{p.k}</span>
                <b>{p.v}</b>
              </li>
            ))}
          </ul>
          <div className="credit-how">
            <div>
              <h2 className="h2 h2-md" data-reveal>
                Як це працює
              </h2>
              <ol className="credit-steps">
                {how.map((h, i) => (
                  <li key={h.t} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                    <span className="process-num">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{h.t}</h3>
                      <p>{h.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <Link href="/obiekty/odesa-dakh" className="credit-case spot" data-reveal data-cursor="Розбір об’єкта">
              <Image src={objectImage("odesa-dakh")} alt="Станція на даху 10-поверхівки в Одесі" fill sizes="(max-width: 900px) 100vw, 40vw" />
              <span className="credit-case-text">
                <span className="mono">Приклад · фінансування банком-партнером</span>
                <strong>Станція на даху 10-поверхівки, Одеса</strong>
                <span>2,7 кВт · Deye 6 кВт · Dyness 5,12 кВт·год</span>
              </span>
            </Link>
          </div>
          <p className="calc-note">Остаточні умови кредитування визначає банк. Детальніше — у консультанта Line Energy або у відділенні Ощадбанку.</p>
        </div>
      </section>
      <ContactBand title="Розрахуємо станцію під кредит" lead="Залиште телефон — підберемо станцію й підготуємо документи для банку." details="Цікавить кредит Ощадбанку" />
    </>
  );
}
