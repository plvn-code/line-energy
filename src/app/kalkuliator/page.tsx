import type { Metadata } from "next";
import Link from "next/link";
import { Calculator } from "@/components/Calculator";
import { Blackout } from "@/components/home/Blackout";
import { Icon } from "@/components/Icons";
import { ContactBand, PageHero } from "@/components/Shared";
import { objects } from "@/lib/objects";

export const metadata: Metadata = {
  title: "Калькулятор сонячної станції",
  description: "Порахуйте потужність, кількість панелей, акумулятор і орієнтовну ціну сонячної станції під ваше споживання. 3 сценарії: економ, оптимум, комфорт.",
};

const refs = objects.filter((o) => o.price);

export default function CalcPage() {
  return (
    <>
      <PageHero
        eyebrow="Калькулятор"
        title={
          <>
            Скільки коштує <span className="accent">ваша станція?</span>
          </>
        }
        lead="Пересуньте повзунок до вашого місячного споживання й оберіть мету. Отримаєте 3 сценарії — так само, як ми рахуємо для клієнтів."
        crumbs={[{ label: "Калькулятор", href: "/kalkuliator" }]}
      />
      <section className="section section-top-0">
        <div className="container">
          <Calculator />
          <div className="calc-refs" data-reveal>
            <h2 className="mini-title">На чому базується розрахунок</h2>
            <p className="section-sub">
              Ціни виведені з наших об’єктів під ключ: обладнання, монтаж, матеріали й гарантія. Генерацію рахуємо для Одеської області — близько 250–300 сонячних днів на рік.
            </p>
            <div className="calc-ref-list">
              {refs.map((o) => (
                <Link key={o.slug} href={`/obiekty/${o.slug}`} className="calc-ref">
                  <b>{o.price}</b>
                  <span>
                    {o.power} · {o.place}
                  </span>
                  <Icon name="arrowUpRight" size={18} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Blackout />
      <ContactBand title="Точний розрахунок — безкоштовно" lead="Інженер подивиться ваш рахунок, дах і прилади, які мають працювати в блекаут, — і дасть 3 сценарії з точною ціною." />
    </>
  );
}
