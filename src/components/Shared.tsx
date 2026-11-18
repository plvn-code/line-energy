import Image from "next/image";
import Link from "next/link";
import { type Obj, monthName, objectImage, objects, typeName } from "@/lib/objects";
import { site } from "@/lib/site";
import { Icon } from "./Icons";
import { LeadForm } from "./LeadForm";

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  alt = "",
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  image?: string;
  alt?: string;
  crumbs?: { label: string; href: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className={`page-hero${image ? " has-image" : ""}`}>
      {image && (
        <div className="page-hero-media" data-parallax="0.08">
          <Image src={image} alt={alt} fill priority sizes="100vw" />
        </div>
      )}
      <div className="page-hero-cells" aria-hidden="true" />
      <div className="container page-hero-inner">
        {crumbs && (
          <nav className="crumbs" aria-label="Навігаційний ланцюжок">
            <Link href="/">Головна</Link>
            {crumbs.map((c) => (
              <Link key={c.href} href={c.href}>
                {c.label}
              </Link>
            ))}
          </nav>
        )}
        {eyebrow && <p className="eyebrow fade-up">{eyebrow}</p>}
        <h1 className="page-title fade-up" style={{ animationDelay: "90ms" }}>
          {title}
        </h1>
        {lead && (
          <p className="page-lead fade-up" style={{ animationDelay: "180ms" }}>
            {lead}
          </p>
        )}
        {children && (
          <div className="page-hero-actions fade-up" style={{ animationDelay: "270ms" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

export function ObjectCard({ o, index = 0 }: { o: Obj; index?: number }) {
  return (
    <Link href={`/obiekty/${o.slug}`} className="obj-card spot" data-reveal data-cursor="Розбір об’єкта" style={{ transitionDelay: `${(index % 3) * 70}ms` }}>
      <div className="obj-card-media">
        <Image src={objectImage(o.slug)} alt={`${o.title} — ${o.place}`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
        <span className="obj-card-power">{o.power}</span>
        {o.price && <span className="obj-card-price">{o.price}</span>}
      </div>
      <div className="obj-card-body">
        <span className="mono">
          {typeName[o.type]} · {o.place}
        </span>
        <h3>{o.title}</h3>
        <div className="obj-card-foot">
          <span>{monthName(o.date)}</span>
          <span className="round-link">
            <Icon name="arrowUpRight" size={20} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function Marquee({ items, reverse = false }: { items: readonly string[]; reverse?: boolean }) {
  const row = (hidden: boolean) => (
    <div className="marquee-row" aria-hidden={hidden || undefined}>
      {items.map((t, i) => (
        <span key={i}>
          {t}
          <i />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee${reverse ? " is-reverse" : ""}`}>
      {row(false)}
      {row(true)}
    </div>
  );
}

/** Closing request band: a field of solar cells that light up under the cursor. */
export function ContactBand({
  title = "Порахуємо станцію під ваш дім — безкоштовно",
  lead = "Залиште телефон. Інженер уточнить споживання й дасть 3 чесні сценарії: економ, оптимум, комфорт.",
  details,
  id = "zaiavka",
}: {
  title?: string;
  lead?: string;
  details?: string;
  id?: string;
}) {
  return (
    <section className="contact-band spot" id={id}>
      <div className="contact-cells" aria-hidden="true" />
      <div className="contact-sun" aria-hidden="true" />
      <div className="container contact-grid">
        <div data-reveal>
          <p className="eyebrow">Безкоштовна консультація</p>
          <h2 className="h2">{title}</h2>
          <p className="section-sub">{lead}</p>
          <div className="contact-phones">
            {site.phones.map((p) => (
              <a key={p.href} className="contact-phone" href={p.href}>
                <Icon name="phone" size={20} />
                {p.phone}
                <small>
                  {p.label} · {p.person}
                </small>
              </a>
            ))}
          </div>
          <a className="text-link contact-direct" href={site.direct} target="_blank" rel="noreferrer">
            <Icon name="instagram" size={18} /> Або напишіть у Direct
          </a>
        </div>
        <div className="contact-card" data-reveal>
          <LeadForm details={details} source={`band:${id}`} />
        </div>
      </div>
    </section>
  );
}

/** Ends pages with real objects instead of a dead end. */
export function MoreObjects({ title = "Подивіться наші об’єкти", exclude }: { title?: string; exclude?: string }) {
  const picks = objects.filter((o) => o.slug !== exclude).slice(0, 3);
  return (
    <section className="section section-tight">
      <div className="container">
        <div className="row-head" data-reveal>
          <h2 className="mini-title">{title}</h2>
          <Link href="/obiekty" className="text-link">
            Усі об’єкти <Icon name="arrow" size={16} />
          </Link>
        </div>
        <div className="obj-grid">
          {picks.map((o, i) => (
            <ObjectCard key={o.slug} o={o} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
