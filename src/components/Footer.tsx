import Link from "next/link";
import { services } from "@/lib/copy";
import { objects } from "@/lib/objects";
import { nav, site } from "@/lib/site";
import { Icon } from "./Icons";
import { Logo } from "./Logo";
import { MadeBy } from "./MadeBy";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" aria-label="Line Energy — на головну">
              <Logo className="footer-logo" />
            </Link>
            <p>Сонячні електростанції під ключ для дому та бізнесу. {site.region}. 5 років, 50+ об’єктів.</p>
            <a className="footer-ig" href={site.instagram} target="_blank" rel="noreferrer">
              <Icon name="instagram" size={18} /> {site.instagramHandle}
            </a>
          </div>

          <div className="footer-col">
            <h3>Послуги</h3>
            {services.map((s) => (
              <Link key={s.id} href={`/posluhy#${s.id}`}>
                {s.title}
              </Link>
            ))}
          </div>

          <div className="footer-col">
            <h3>Сайт</h3>
            {nav.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="footer-col footer-contact">
            <h3>Контакти</h3>
            {site.phones.map((p) => (
              <a key={p.href} className="footer-phone" href={p.href}>
                {p.phone}
                <small>
                  {p.label} · {p.person}
                </small>
              </a>
            ))}
            <a href={`mailto:${site.email}`}>
              <Icon name="mail" size={16} /> {site.email}
            </a>
            <p>
              <Icon name="pin" size={16} /> {site.region}
            </p>
          </div>
        </div>

        <div className="footer-objects">
          <span className="mono">Свіжі об’єкти</span>
          {objects.slice(0, 6).map((o) => (
            <Link key={o.slug} href={`/obiekty/${o.slug}`}>
              {o.place} · {o.power}
            </Link>
          ))}
        </div>
      </div>

      <div className="footer-giant" aria-hidden="true">
        <span>
          Line<b>E</b>nergy
        </span>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 {site.legal}</span>
        <span className="footer-copy">Ціни на сайті орієнтовні й базуються на реалізованих об’єктах. Точну вартість розраховуємо безкоштовно.</span>
        <MadeBy />
      </div>
    </footer>
  );
}
