"use client";

import { useMemo, useState } from "react";
import { type Goal, estimate, goals, usd } from "@/lib/calc";
import { Icon } from "./Icons";
import { LeadButton } from "./LeadModal";

const PRESETS = [200, 400, 700, 1200];

/**
 * Consumption + goal → three honest scenarios (econom / optimum / comfort), mirroring how the
 * client quotes. Each card opens the request dialog with the chosen scenario attached.
 */
export function Calculator({ compact = false }: { compact?: boolean }) {
  const [kwh, setKwh] = useState(500);
  const [goal, setGoal] = useState<Goal>("backup");
  const [pick, setPick] = useState(1);
  const list = useMemo(() => estimate(kwh, goal), [kwh, goal]);
  const g = goals.find((x) => x.id === goal)!;

  const summary = (i: number) => {
    const s = list[i];
    return [
      `Калькулятор: ${s.name}`,
      `Споживання: ${kwh} кВт·год/міс`,
      `Мета: ${g.label}`,
      `Станція: ${s.kw} кВт, ≈${s.panels} панелей${s.kwh ? `, акумулятор ${s.kwh} кВт·год` : ""}`,
      `Орієнтир: ${usd(s.price[0])}–${usd(s.price[1])}`,
    ].join("\n");
  };

  return (
    <div className={`calc${compact ? " is-compact" : ""}`}>
      <div className="calc-inputs">
        <div className="calc-field">
          <div className="calc-label">
            <span>Скільки ви споживаєте за місяць</span>
            <output>
              <b>{kwh}</b> кВт·год
            </output>
          </div>
          <input
            type="range"
            min={100}
            max={2000}
            step={50}
            value={kwh}
            onChange={(e) => setKwh(Number(e.target.value))}
            aria-label="Споживання за місяць, кВт·год"
            style={{ ["--fill" as string]: `${((kwh - 100) / 1900) * 100}%` }}
          />
          <div className="calc-presets">
            {PRESETS.map((p) => (
              <button key={p} type="button" className={kwh === p ? "is-on" : undefined} onClick={() => setKwh(p)}>
                {p}
              </button>
            ))}
            <span>Цифра є у вашому рахунку за світло</span>
          </div>
        </div>
        <div className="calc-field">
          <div className="calc-label">
            <span>Що для вас головне</span>
          </div>
          <div className="seg seg-lg" role="radiogroup" aria-label="Мета">
            {goals.map((x) => (
              <button key={x.id} type="button" role="radio" aria-checked={goal === x.id} className={goal === x.id ? "is-on" : undefined} onClick={() => setGoal(x.id)}>
                {x.label}
              </button>
            ))}
          </div>
          <p className="calc-hint">{g.hint}</p>
        </div>
      </div>

      <div className="calc-cards">
        {list.map((s, i) => (
          <article key={s.id} className={`calc-card${i === pick ? " is-on" : ""}`} onClick={() => setPick(i)}>
            <div className="calc-card-top">
              <span className="mono">{s.name}</span>
              {i === 1 && <span className="calc-badge">Найчастіше обирають</span>}
            </div>
            <p className="calc-kw">
              {String(s.kw).replace(".", ",")}
              <small> кВт</small>
            </p>
            <ul>
              <li>
                <Icon name="sun" size={16} /> ≈{s.panels} панелей по 620 Вт
              </li>
              <li>
                <Icon name="battery" size={16} /> {s.kwh ? `Акумулятор ${s.kwh} кВт·год` : "Без акумулятора"}
              </li>
              <li>
                <Icon name="check" size={16} /> {s.note}
              </li>
            </ul>
            <p className="calc-price">
              <span>Орієнтовно під ключ</span>
              {usd(s.price[0])} – {usd(s.price[1])}
            </p>
            <LeadButton title={`Сценарій «${s.name}»: точний розрахунок`} details={summary(i)} className={`btn ${i === pick ? "btn-primary" : "btn-outline"} btn-wide`}>
              Точний розрахунок <Icon name="arrow" size={16} />
            </LeadButton>
          </article>
        ))}
      </div>
      <p className="calc-note">
        Орієнтир на основі наших реалізованих об’єктів 2026 року. Точна ціна залежить від даху, обладнання й вашого навантаження — розрахунок безкоштовний.
      </p>
    </div>
  );
}
