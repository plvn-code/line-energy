"use client";

import { useRef, useState } from "react";
import { clamp, useScrollProgress } from "@/lib/motion";
import { Icon } from "../Icons";

const stages = [
  {
    time: "Ранок і день",
    title: "Сонце працює на вас",
    body: "Панелі живлять дім напряму, а все, що зараз не потрібно, заряджає акумулятор.",
    tags: { pv: "Панелі: генерація", bat: "Акумулятор: заряджається", grid: "Мережа: в очікуванні" },
  },
  {
    time: "Полудень",
    title: "Надлишки — в мережу й в авто",
    body: "Акумулятор повний: енергія продається за зеленим тарифом, а Smart Load спрямовує її на зарядку електромобіля.",
    tags: { pv: "Панелі: максимум", bat: "Акумулятор: 100%", grid: "Мережа: продаж за зеленим тарифом" },
  },
  {
    time: "Вечір",
    title: "Вечір на власній енергії",
    body: "Сонце сіло, а дім живе від запасу в акумуляторі — без зайвих витрат і чеків за світло.",
    tags: { pv: "Панелі: відпочивають", bat: "Акумулятор: живить дім", grid: "Мережа: не потрібна" },
  },
  {
    time: "Блекаут",
    title: "Мережа впала. Ви навіть не помітили",
    body: "Система за частку секунди підхоплює критичні лінії: світло, Wi-Fi, насос, котел, холодильник. У сусідів — темрява.",
    tags: { pv: "Панелі: чекають ранку", bat: "Акумулятор: тримає дім", grid: "Мережа: відключення" },
  },
];

/** Bilinear point inside the roof trapezoid (u across, v up the slope). */
const roof = { bl: [362, 352], br: [678, 352], tl: [424, 256], tr: [616, 256] };
const pt = (u: number, v: number) => {
  const x0 = roof.bl[0] + (roof.br[0] - roof.bl[0]) * u;
  const x1 = roof.tl[0] + (roof.tr[0] - roof.tl[0]) * u;
  const y0 = roof.bl[1];
  const y1 = roof.tl[1];
  return `${(x0 + (x1 - x0) * v).toFixed(1)},${(y0 + (y1 - y0) * v).toFixed(1)}`;
};
const COLS = 6;
const ROWS = 2;
const cells: string[] = [];
for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++) {
    const g = 0.012;
    const u0 = 0.05 + (c / COLS) * 0.9 + g;
    const u1 = 0.05 + ((c + 1) / COLS) * 0.9 - g;
    const v0 = 0.08 + (r / ROWS) * 0.84 + g * 2;
    const v1 = 0.08 + ((r + 1) / ROWS) * 0.84 - g * 2;
    cells.push([pt(u0, v0), pt(u1, v0), pt(u1, v1), pt(u0, v1)].join(" "));
  }

/**
 * Signature scene: one day of a home with a hybrid station. Pinned while scrolling; the four
 * stages also respond to clicks (they scroll the page to that stage, so scroll and state agree).
 */
export function EnergyDay() {
  const root = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);

  useScrollProgress(root, (p) => {
    root.current?.style.setProperty("--p", p.toFixed(3));
    setStage(Math.min(3, Math.floor(clamp(p * 4, 0, 3.999))));
  });

  const go = (i: number) => {
    const el = root.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * ((i + 0.5) / 4), behavior: "smooth" });
  };

  const s = stages[stage];
  return (
    <section className="day" ref={root} data-stage={stage} aria-label="Як працює гібридна сонячна станція протягом доби">
      <div className="day-sticky">
        <div className="container day-grid">
          <div className="day-text">
            <p className="eyebrow">Гібридна станція · одна доба</p>
            <h2 className="day-h">
              Один день <span className="accent">вашого дому</span>
            </h2>
            <div className="day-steps">
              {stages.map((st, i) => (
                <div key={st.time} className={`day-step${i === stage ? " is-on" : ""}`} aria-hidden={i !== stage}>
                  <span className="mono">
                    {String(i + 1).padStart(2, "0")} · {st.time}
                  </span>
                  <h3>{st.title}</h3>
                  <p>{st.body}</p>
                </div>
              ))}
            </div>
            <div className="day-tabs" role="tablist" aria-label="Етапи доби">
              {stages.map((st, i) => (
                <button key={st.time} type="button" role="tab" aria-selected={i === stage} className={i === stage ? "is-on" : undefined} onClick={() => go(i)}>
                  <i />
                  {st.time}
                </button>
              ))}
            </div>
          </div>

          <div className="day-scene">
            <svg viewBox="0 0 1000 620" role="img" aria-label={`${s.time}: ${s.title}`}>
              <defs>
                <linearGradient id="daySky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" className="sky-top" />
                  <stop offset="1" className="sky-bottom" />
                </linearGradient>
                <radialGradient id="daySun">
                  <stop offset="0" stopColor="#fffbd0" />
                  <stop offset="0.45" stopColor="#efea00" />
                  <stop offset="1" stopColor="#efea00" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="dayPanel" x1="0" y1="1" x2="0.3" y2="0">
                  <stop offset="0" stopColor="#0d2a44" />
                  <stop offset="1" stopColor="#1d4f7a" />
                </linearGradient>
                <clipPath id="daySkyClip">
                  <rect x="0" y="0" width="1000" height="560" rx="28" />
                </clipPath>
                <clipPath id="dayBat">
                  <rect x="698" y="476" width="40" height="68" rx="3" />
                </clipPath>
              </defs>

              <rect className="day-sky" x="0" y="0" width="1000" height="560" rx="28" fill="url(#daySky)" />
              <g className="day-stars">
                {[
                  [120, 70], [260, 140], [420, 60], [560, 120], [760, 70], [880, 150], [330, 210], [940, 60],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r={i % 3 ? 1.4 : 2} />
                ))}
              </g>
              <g clipPath="url(#daySkyClip)">
                <g className="day-sun">
                  <circle r="90" fill="url(#daySun)" opacity="0.55" />
                  <circle r="30" fill="#f7f26a" />
                </g>
              </g>
              <circle className="day-moon" cx="170" cy="100" r="18" />

              <line className="day-ground" x1="0" y1="560" x2="1000" y2="560" />

              {/* neighbour */}
              <g className="day-neighbour">
                <polygon points="52,434 148,364 244,434" />
                <rect x="66" y="432" width="164" height="128" />
                <rect className="win" x="94" y="464" width="40" height="36" rx="3" />
                <rect className="win" x="162" y="464" width="40" height="36" rx="3" />
              </g>

              {/* home */}
              <g className="day-house">
                <rect className="wall" x="380" y="352" width="280" height="208" />
                <polygon className="roof" points={`${roof.bl} ${roof.br} ${roof.tr} ${roof.tl}`} />
                {cells.map((c, i) => (
                  <polygon key={i} className="cell" points={c} style={{ animationDelay: `${(i % COLS) * 0.12}s` }} />
                ))}
                <rect className="win" x="418" y="404" width="72" height="58" rx="4" />
                <rect className="win" x="550" y="404" width="72" height="58" rx="4" />
                <rect className="door" x="498" y="470" width="44" height="90" rx="3" />
                <rect className="meter" x="664" y="318" width="20" height="28" rx="3" />
              </g>

              {/* inverter + battery */}
              <g className="day-units">
                <rect className="inv" x="692" y="382" width="52" height="74" rx="7" />
                <rect className="inv-screen" x="704" y="396" width="28" height="16" rx="2" />
                <rect className="bat" x="692" y="470" width="52" height="80" rx="7" />
                <g clipPath="url(#dayBat)">
                  <rect className="bat-level" x="698" y="476" width="40" height="68" />
                </g>
              </g>

              {/* EV */}
              <g className="day-ev">
                <path d="M792 548 v-18 l20-26 h76 l26 26 v18 z" />
                <circle cx="822" cy="550" r="11" />
                <circle cx="888" cy="550" r="11" />
              </g>

              {/* grid */}
              <g className="day-grid-pole">
                <line x1="968" y1="292" x2="968" y2="560" />
                <line x1="948" y1="302" x2="988" y2="302" />
              </g>
              <path className="day-wire" d="M684 326 Q830 356 968 302" />

              {/* flows */}
              <path className="flow f-pv" d="M640 296 C700 296 718 340 718 382" />
              <path className="flow f-home" d="M692 420 H660" />
              <path className="flow f-charge" d="M718 456 V470" />
              <path className="flow f-dis" d="M692 512 C676 512 676 470 660 470" />
              <path className="flow f-sell" d="M684 326 Q830 356 968 302" />
              <path className="flow f-ev" d="M744 520 C770 520 784 524 800 530" />
              <g className="day-cut">
                <path d="M818 318 l18 18 M836 318 l-18 18" />
              </g>
            </svg>

            <div className="day-tags" aria-hidden="true">
              <span className="day-tag t-pv">
                <Icon name="sun" size={15} /> {s.tags.pv}
              </span>
              <span className="day-tag t-bat">
                <Icon name="battery" size={15} /> {s.tags.bat}
              </span>
              <span className="day-tag t-grid">
                <Icon name="bolt" size={15} /> {s.tags.grid}
              </span>
              <span className="day-tag t-switch">
                <Icon name="shield" size={15} /> Перемикання — за частку секунди
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
