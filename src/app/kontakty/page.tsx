import type { Metadata } from "next";
import { Icon } from "@/components/Icons";
import { ContactBand, PageHero } from "@/components/Shared";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакти",
  description: "Line Energy: консультації +38 (099) 210-21-19, відділ продажів +38 (093) 217-42-80. Одеса та Одеська область.",
};

export default function ContactsPage() {
  return (
    <>
      <PageHero eyebrow="Контакти" title="Зв’яжіться з нами" lead="Телефонуйте, пишіть у Direct або залиште заявку — розрахунок станції безкоштовний." crumbs={[{ label: "Контакти", href: "/kontakty" }]} />
      <section className="section section-top-0">
        <div className="container contact-cards">
          {site.phones.map((p) => (
            <div key={p.href} className="contact-info spot" data-reveal>
              <span className="mono">{p.label}</span>
              <h2>{p.person}</h2>
              <a href={p.href}>
                <Icon name="phone" size={18} /> {p.phone}
              </a>
            </div>
          ))}
          <div className="contact-info spot" data-reveal>
            <span className="mono">Онлайн</span>
            <h2>Пишіть</h2>
            <a href={site.direct} target="_blank" rel="noreferrer">
              <Icon name="instagram" size={18} /> Instagram Direct
            </a>
            <a href={`mailto:${site.email}`}>
              <Icon name="mail" size={18} /> {site.email}
            </a>
            <p className="muted">
              <Icon name="pin" size={16} /> {site.region}
            </p>
          </div>
        </div>
      </section>
      <ContactBand id="forma" />
    </>
  );
}
