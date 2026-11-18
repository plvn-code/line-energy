"use client";

import Link from "next/link";
import { useRef } from "react";
import { useScrollProgress } from "@/lib/motion";
import { facts } from "@/lib/site";
import { Icon } from "../Icons";

const text =
  "Світло вимикають усім. Але не всі це помічають. Ми проєктуємо, монтуємо й обслуговуємо сонячні станції, після яких блекаут — просто новина, а рахунок за електрику — значно менший.";

/** Statement whose words light up one by one as it scrolls past, then the key numbers. */
export function Manifest() {
  const root = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useScrollProgress(
    root,
    (p) => {
      const spans = root.current?.querySelectorAll<HTMLElement>(".mw");
      if (!spans) return;
      const pos = ((p - 0.14) / 0.5) * spans.length;
      spans.forEach((s, i) => {
        s.style.opacity = String(Math.min(1, Math.max(0.16, pos - i + 0.16)));
      });
    },
    "through",
  );

  return (
    <section className="manifest" id="manifest">
      <div className="container">
        <p className="eyebrow" data-reveal>
          Line Energy · сонячні системи
        </p>
        <div ref={root}>
          <p className="manifest-text">
            {words.map((word, i) => (
              <span className={`mw${/блекаут|менший/.test(word) ? " mw-hi" : ""}`} key={i}>
                {word}{" "}
              </span>
            ))}
          </p>
        </div>
        <ul className="facts">
          {facts.map((f, i) => (
            <li key={f.label} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
              <Link href={f.href}>
                <strong>
                  {"prefix" in f && <small>{f.prefix}</small>}
                  <span data-count={f.value} data-suffix="">
                    {f.value}
                  </span>
                  <small>{f.suffix}</small>
                </strong>
                <span>{f.label}</span>
                <Icon name="arrowUpRight" size={18} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
