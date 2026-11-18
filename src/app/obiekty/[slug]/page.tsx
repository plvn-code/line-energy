import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { Icon } from "@/components/Icons";
import { LeadButton } from "@/components/LeadModal";
import { ContactBand, MoreObjects } from "@/components/Shared";
import media from "@/lib/media.json";
import { getObject, monthName, objectImage, objects, typeName } from "@/lib/objects";

export function generateStaticParams() {
  return objects.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const o = getObject((await params).slug);
  if (!o) return {};
  return { title: `${o.title} · ${o.power}, ${o.place}`, description: o.lead, openGraph: { images: [objectImage(o.slug)] } };
}

const sizes = media as unknown as Record<string, [number, number]>;

export default async function ObjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const o = getObject((await params).slug);
  if (!o) notFound();
  const i = objects.indexOf(o);
  const prev = objects[(i - 1 + objects.length) % objects.length];
  const next = objects[(i + 1) % objects.length];
  const photos = Array.from({ length: o.photos }, (_, k) => {
    const src = objectImage(o.slug, k + 1);
    const [w, h] = sizes[src] ?? [720, 768];
    return { src, w, h, alt: `${o.title}, ${o.place} — фото ${k + 1}` };
  });

  return (
    <>
      <section className="obj-hero">
        <div className="container obj-hero-grid">
          <div className="obj-hero-text">
            <nav className="crumbs" aria-label="Навігаційний ланцюжок">
              <Link href="/">Головна</Link>
              <Link href="/obiekty">Об’єкти</Link>
              <Link href={`/obiekty/${o.slug}`}>{o.place}</Link>
            </nav>
            <p className="eyebrow fade-up">
              {typeName[o.type]} станція · {o.place} · {monthName(o.date)}
            </p>
            <h1 className="page-title obj-title fade-up" style={{ animationDelay: "90ms" }}>
              {o.title}
            </h1>
            <p className="page-lead fade-up" style={{ animationDelay: "180ms" }}>
              {o.lead}
            </p>
            <div className="obj-nums fade-up" style={{ animationDelay: "260ms" }}>
              <span>
                <b>{o.power}</b>
                <small>потужність</small>
              </span>
              {o.storage && (
                <span>
                  <b>{o.storage}</b>
                  <small>накопичення</small>
                </span>
              )}
              {o.price && (
                <span>
                  <b>{o.price}</b>
                  <small>під ключ</small>
                </span>
              )}
            </div>
          </div>
          <div className="obj-hero-photo fade-up" style={{ animationDelay: "200ms" }}>
            <Image src={objectImage(o.slug)} alt={`${o.title} — ${o.place}`} fill priority sizes="(max-width: 1040px) 100vw, 46vw" />
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container model-grid-2">
          <div className="model-copy" data-reveal>
            {o.story.map((p, k) => (
              <p key={k}>{p}</p>
            ))}
            {o.reel && (
              <a className="text-link" href={`https://www.instagram.com/reel/${o.reel}/`} target="_blank" rel="noreferrer">
                <Icon name="instagram" size={18} /> Відеоогляд об’єкта в Instagram
              </a>
            )}
          </div>
          <aside className="spec-card" data-reveal>
            <h2 className="spec-card-title">Що на об’єкті</h2>
            <dl className="spec-common">
              {o.specs.map((s) => (
                <div key={s.k}>
                  <dt>{s.k}</dt>
                  <dd>{s.v}</dd>
                </div>
              ))}
            </dl>
            <div className="chip-row">
              {o.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
            <div className="spec-actions">
              <LeadButton title="Хочу так само" details={`Цікавить станція як на об’єкті: ${o.title} (${o.place}, ${o.power})`} className="btn btn-primary btn-lg">
                Хочу так само <Icon name="arrow" size={18} />
              </LeadButton>
              <Link href="/kalkuliator" className="btn btn-outline">
                Порахувати свою станцію
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {photos.length > 1 && (
        <section className="section section-tight">
          <div className="container">
            <h2 className="mini-title" data-reveal>
              Фото з об’єкта
            </h2>
            <Gallery photos={photos} fallbackAlt={o.title} />
          </div>
        </section>
      )}

      <div className="container">
        <nav className="model-pager" aria-label="Інші об’єкти">
          <Link href={`/obiekty/${prev.slug}`}>
            <span className="mono">
              <Icon name="chevronLeft" size={14} /> Попередній
            </span>
            <strong>
              {prev.place} · {prev.power}
            </strong>
          </Link>
          <Link href={`/obiekty/${next.slug}`} className="is-next">
            <span className="mono">
              Наступний <Icon name="chevronRight" size={14} />
            </span>
            <strong>
              {next.place} · {next.power}
            </strong>
          </Link>
        </nav>
      </div>

      <MoreObjects exclude={o.slug} title="Інші об’єкти" />
      <ContactBand title="Хочете так само?" lead="Залиште телефон — інженер прорахує станцію під ваш об’єкт і покаже 3 сценарії." details={`Сторінка об’єкта: ${o.title}`} />
    </>
  );
}
