"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { credit, faq, generatorVsSolar, guarantees, steps, why } from "@/lib/copy";
import { reducedMotion, useScrollProgress } from "@/lib/motion";
import { Icon } from "../Icons";
import { LeadButton } from "../LeadModal";

/** Looping video that plays only while on screen. */
function LoopVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || reducedMotion()) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { rootMargin: "100px" });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} className={className} src={src} poster={poster} muted loop playsInline preload="none" aria-hidden="true" />;
}

/** "Empty roof in the morning — a working station in a few days": video band + five steps that fill in as you scroll. */
export function Process() {
  const root = useRef<HTMLOListElement>(null);
  useScrollProgress(root, (p) => root.current?.style.setProperty("--p", p.toFixed(3)), "through");
  return (
    <section className="section process" id="protses">
      <div className="process-media">
        <LoopVideo src="/video/montazh.mp4" poster="/images/montazh-poster.webp" className="process-video" />
        <div className="process-shade" />
      </div>
      <div className="container process-inner">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Повний цикл в одних руках</p>
          <h2 className="h2">
            Порожній дах зранку — <span className="accent">працююча станція за 3–5 днів</span>
          </h2>
          <p className="section-sub">Без наїздів бригади, без сюрпризів, без «приїдемо колись». Повний цикл разом із проєктом і постачанням — до 2 тижнів.</p>
        </div>
        <ol className="process-steps" ref={root}>
          {steps.map((s, i) => (
            <li key={s.title} data-reveal style={{ transitionDelay: `${i * 80}ms`, ["--i" as string]: i }}>
              <span className="process-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Sticky photo on one side, statements scrolling on the other; the active one drives the photo. */
export function Why() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = root.current?.querySelectorAll<HTMLElement>(".why-item");
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section why">
      <div className="container why-grid" ref={root}>
        <div className="why-visual">
          <Link href={why[active].href} className="why-sticky" data-cursor={why[active].cta} aria-label={why[active].cta}>
            {why.map((w, i) => (
              <Image key={w.id} src={w.image} alt={w.alt} fill sizes="(max-width: 900px) 100vw, 50vw" className={i === active ? "is-on" : undefined} />
            ))}
            <div className="why-bar" aria-hidden="true">
              {why.map((w, i) => (
                <i key={w.id} className={i <= active ? "is-on" : undefined} />
              ))}
            </div>
          </Link>
        </div>
        <div className="why-list">
          <p className="eyebrow">Чому Line Energy</p>
          {why.map((w, i) => (
            <article key={w.id} className={`why-item${i === active ? " is-on" : ""}`} data-i={i}>
              <span className="mono">
                {String(i + 1).padStart(2, "0")} · {w.title}
              </span>
              <h3>{w.claim}</h3>
              <p>{w.body}</p>
              <Link href={w.href} className="text-link">
                {w.cta} <Icon name="arrow" size={16} />
              </Link>
              <Link href={w.href} className="why-inline" tabIndex={-1} aria-hidden="true">
                <Image src={w.image} alt="" fill sizes="100vw" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Generator vs station: a switch flips which column is lit. */
export function VsGenerator() {
  const [solar, setSolar] = useState(true);
  return (
    <section className="section section-tight vs">
      <div className="container vs-grid">
        <div data-reveal>
          <p className="eyebrow">Генератор чи станція</p>
          <h2 className="h2 h2-md">
            Генератор рятує. <span className="accent">Але ви все одно залежите</span>
          </h2>
          <p className="section-sub">Не від мережі, то від каністри. Сонячна станція — це інша логіка: ви перестаєте платити за надзвичайну ситуацію щомісяця.</p>
          <button type="button" className={`vs-switch${solar ? " is-solar" : ""}`} onClick={() => setSolar((v) => !v)} aria-pressed={solar}>
            <span className={!solar ? "is-on" : undefined}>Генератор</span>
            <span className={solar ? "is-on" : undefined}>Сонячна станція</span>
            <i />
          </button>
        </div>
        <ul className={`vs-table${solar ? " is-solar" : ""}`} data-reveal>
          {generatorVsSolar.map((r) => (
            <li key={r.k}>
              <span className="vs-k">{r.k}</span>
              <span className="vs-v" key={String(solar)}>
                <Icon name={solar ? "check" : "minus"} size={16} />
                {solar ? r.sol : r.gen}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Guarantees() {
  return (
    <section className="section guarantees" id="harantii">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Гарантована якість</p>
          <h2 className="h2">
            Офіційні гарантії <span className="accent">на кожному етапі</span>
          </h2>
        </div>
        <ul className="g-grid">
          {guarantees.map((g, i) => (
            <li key={g.label} className="g-card spot" data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="mono">{g.label}</span>
              <p className="g-num">
                <small>до</small>
                <span data-count={g.value}>{g.value}</span>
                <small>{g.unit}</small>
              </p>
              <p className="g-note">{g.note}</p>
              <span className="g-arc" style={{ ["--k" as string]: Number(g.value) / 25 }} aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CreditBand() {
  return (
    <section className="section section-tight">
      <div className="container">
        <Link href="/kredyt" className="credit spot" data-reveal data-cursor="Умови кредиту">
          <div className="credit-rate">
            <span className="mono">
              {credit.bank} · {credit.program}
            </span>
            <p>
              <small>від</small>
              {credit.rate}
            </p>
          </div>
          <div className="credit-text">
            <h2>Станція в кредит на 10 років</h2>
            <p>{credit.body}</p>
            <ul>
              {credit.points.map((p) => (
                <li key={p.k}>
                  <span>{p.k}</span>
                  <b>{p.v}</b>
                </li>
              ))}
            </ul>
          </div>
          <span className="round-link round-lg">
            <Icon name="arrowUpRight" size={24} />
          </span>
        </Link>
      </div>
    </section>
  );
}

export function Faq({ limit = 6, title = "Часті питання" }: { limit?: number; title?: string }) {
  const items = faq.slice(0, limit);
  return (
    <section className="section" id="faq">
      <div className="container faq-grid">
        <div data-reveal>
          <p className="eyebrow">FAQ</p>
          <h2 className="h2 h2-md">{title}</h2>
          <p className="section-sub">Не знайшли відповідь? Запитайте інженера — це безкоштовно.</p>
          <div className="faq-actions">
            <LeadButton title="Запитати інженера" className="btn btn-primary">
              Запитати <Icon name="arrow" size={16} />
            </LeadButton>
            {limit < faq.length && (
              <Link href="/faq" className="text-link">
                Усі {faq.length} питань <Icon name="arrow" size={16} />
              </Link>
            )}
          </div>
        </div>
        <div className="faq-list">
          {items.map((f, i) => (
            <details key={f.q} className="faq-item" data-reveal style={{ transitionDelay: `${i * 50}ms` }} open={i === 0}>
              <summary>
                {f.q}
                <span>
                  <Icon name="plus" size={18} />
                </span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
