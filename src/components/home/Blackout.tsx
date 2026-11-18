"use client";

import { useMemo, useState } from "react";
import { appliances, batteries, duty } from "@/lib/calc";
import { Icon } from "../Icons";
import { LeadButton } from "../LeadModal";

const fmtH = (h: number) => {
  if (!isFinite(h)) return "—";
  if (h >= 48) return `${Math.round(h / 24)} доби`;
  if (h >= 10) return `${Math.round(h)} год`;
  return `${h.toFixed(1).replace(".", ",")} год`;
};

/**
 * "What will actually work when the lights go out?" — tick the appliances, pick a battery,
 * see how long the house holds without the grid and without sun.
 */
export function Blackout() {
  const [on, setOn] = useState<Set<string>>(() => new Set(appliances.filter((a) => a.critical).map((a) => a.id)));
  const [bat, setBat] = useState<number>(10);

  const { peak, avg, hours } = useMemo(() => {
    const chosen = appliances.filter((a) => on.has(a.id));
    const peak = chosen.reduce((s, a) => s + a.w, 0);
    const avg = chosen.reduce((s, a) => s + a.w * (duty[a.id] ?? 1), 0);
    const usable = bat * 1000 * 0.9;
    return { peak, avg, hours: avg ? usable / avg : Infinity };
  }, [on, bat]);

  const toggle = (id: string) =>
    setOn((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const level = Math.min(1, hours / 24);
  const details = `Планувальник блекауту:\nПрилади: ${appliances
    .filter((a) => on.has(a.id))
    .map((a) => a.label)
    .join(", ")}\nАкумулятор: ${bat} кВт·год → ≈${fmtH(hours)} без мережі та сонця`;

  return (
    <section className="section blackout" id="blekaut">
      <div className="container blackout-grid">
        <div>
          <div className="section-head" data-reveal>
            <p className="eyebrow">Планувальник блекауту</p>
            <h2 className="h2">
              Що працюватиме, <span className="accent">коли вимкнуть світло?</span>
            </h2>
            <p className="section-sub">Позначте прилади, які мають працювати. Ми визначаємо це ще на етапі проєкту — під ваш дім і ваш сценарій, а не «як у всіх».</p>
          </div>
          <div className="bo-list" data-reveal>
            {appliances.map((a) => (
              <button key={a.id} type="button" className={`bo-item${on.has(a.id) ? " is-on" : ""}`} aria-pressed={on.has(a.id)} onClick={() => toggle(a.id)}>
                <span className="bo-check">
                  <Icon name={on.has(a.id) ? "check" : "plus"} size={14} />
                </span>
                {a.label}
                <small>{a.w >= 1000 ? `${(a.w / 1000).toString().replace(".", ",")} кВт` : `${a.w} Вт`}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="bo-panel" data-reveal>
          <div className="bo-battery" style={{ ["--lvl" as string]: level.toFixed(3) }} aria-hidden="true">
            <div className="bo-battery-body">
              <div className="bo-battery-fill" />
              <div className="bo-battery-cells">
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="bo-battery-cap" />
          </div>
          <p className="bo-hours" aria-live="polite">
            <span>Дім протримається</span>
            <b>≈ {fmtH(hours)}</b>
            <small>без мережі й без сонця</small>
          </p>
          <div className="bo-stats">
            <span>
              Пікове навантаження <b>{(peak / 1000).toFixed(1).replace(".", ",")} кВт</b>
            </span>
            <span>
              Середнє споживання <b>{Math.round(avg)} Вт</b>
            </span>
          </div>
          <div className="calc-label">
            <span>Ємність акумулятора</span>
          </div>
          <div className="seg" role="radiogroup" aria-label="Ємність акумулятора">
            {batteries.map((b) => (
              <button key={b} type="button" role="radio" aria-checked={bat === b} className={bat === b ? "is-on" : undefined} onClick={() => setBat(b)}>
                {b} кВт·год
              </button>
            ))}
          </div>
          {peak > 6000 && <p className="bo-warn">Пік понад 6 кВт — знадобиться потужніший інвертор, краще трифазний.</p>}
          <LeadButton title="Станція під мій сценарій блекауту" details={details} className="btn btn-primary btn-lg btn-wide">
            Підібрати станцію під мій список <Icon name="arrow" size={18} />
          </LeadButton>
          <p className="calc-note">Оцінка спрощена: удень сонце ще й заряджає акумулятор, тож реальний запас довший.</p>
        </div>
      </div>
    </section>
  );
}
