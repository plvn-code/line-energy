import type { Metadata } from "next";
import Image from "next/image";
import { Guarantees, Why } from "@/components/home/Sections";
import { ContactBand, Marquee, PageHero } from "@/components/Shared";
import { brands, facts } from "@/lib/site";

export const metadata: Metadata = {
  title: "Про компанію",
  description: "Line Energy («ЛАЙН-ЕНЕРДЖИ») — 5 років на ринку сонячної енергетики, 50+ станцій для дому та бізнесу в Одесі та області.",
};

const gear = [
  { name: "Фотомодулі", brands: "JA Solar · Tongwei Solar", body: "Професійні панелі на 25+ років служби: втрата потужності за цей час — не більше 15–20%." },
  { name: "Інвертори", brands: "Deye · LuxPower · Huawei", body: "Гібридні та мережеві, одно- й трифазні. Функція Smart Load спрямовує надлишки, наприклад, на зарядку авто." },
  { name: "Акумулятори", brands: "Dyness · Felicity Solar", body: "Літієві накопичувачі з BMS; моделі з підігрівом, охолодженням і системою пожежогасіння." },
  { name: "Захист", brands: "Запобіжники · УЗІП · реле напруги", body: "Захист по фотополю та по мережі, автомати DC і AC у кожній станції — навіть бюджетній." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Про Line Energy"
        title={
          <>
            Ваш енергетичний <span className="accent">партнер</span>
          </>
        }
        lead="Ми — команда, яка понад 5 років допомагає людям і бізнесу отримати енергетичну незалежність. Наша мета — не просто встановити панелі, а створити систему, що забезпечить спокій на довгі роки."
        image="/images/about/team-roof.webp"
        alt="Монтажники Line Energy встановлюють сонячні панелі"
        crumbs={[{ label: "Про нас", href: "/pro-nas" }]}
      />

      <section className="section section-top-0">
        <div className="container">
          <ul className="facts facts-open">
            {facts.map((f, i) => (
              <li key={f.label} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                <strong>
                  {"prefix" in f && <small>{f.prefix}</small>}
                  <span data-count={f.value}>{f.value}</span>
                  <small>{f.suffix}</small>
                </strong>
                <span>{f.label}</span>
              </li>
            ))}
          </ul>
          <div className="about-split">
            <div className="model-copy" data-reveal>
              <p>Одеська область — один із лідерів України з розвитку сонячної енергетики: тут близько 250–300 ясних днів на рік.</p>
              <p>
                Ми працюємо тут із приватними будинками, квартирами й бізнесом. Кожну станцію рахуємо під реальне споживання — і не продаємо «максимальну комплектацію просто тому,
                що так дорожче».
              </p>
              <p>
                Слідкуємо за ринком: у жовтні 2026 року відвідали міжнародну виставку ECOENERGY EXPO, щоб подивитися, як нові технології допомагають підвищити енергонезалежність
                і оптимізувати споживання.
              </p>
            </div>
            <figure className="about-photo" data-reveal>
              <Image src="/images/about/expo.webp" alt="Представник Line Energy на виставці ECOENERGY EXPO 2026" fill sizes="(max-width: 900px) 100vw, 40vw" />
              <figcaption>ECOENERGY EXPO 2026</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section" id="obladnannia">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Обладнання</p>
            <h2 className="h2">
              Світові виробники <span className="accent">з офіційною гарантією</span>
            </h2>
          </div>
          <div className="pillars pillars-4">
            {gear.map((g, i) => (
              <article key={g.name} className="pillar spot" data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="mono">{g.brands}</span>
                <h2>{g.name}</h2>
                <p>{g.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Marquee items={brands} reverse />
      <Guarantees />
      <Why />
      <ContactBand />
    </>
  );
}
