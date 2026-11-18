/**
 * Station estimate for the calculator. A rough guide only: the real offer comes after a free
 * consultation. Prices are fitted to the client's own published turnkey cases
 * (5 кВт hybrid — $4 500, 12 кВт hybrid — $9 500, 15 кВт with batteries — $15 000) and must be
 * confirmed by the client before launch (see docs/STATUS.md).
 */
export type Goal = "save" | "backup" | "autonomy";

export const goals: { id: Goal; label: string; hint: string }[] = [
  { id: "save", label: "Економія", hint: "Мережева станція, надлишки — за зеленим тарифом" },
  { id: "backup", label: "Економія + резерв", hint: "Гібридна станція з акумулятором на блекаути" },
  { id: "autonomy", label: "Автономія", hint: "Великий запас енергії, мінімум залежності від мережі" },
];

export const PRICE = {
  perKw: 550, // $ per kW of panels + inverter + mounting, turnkey
  perKwh: 220, // $ per kWh of battery storage
  base: 600, // $ protection, cabling, commissioning
};

/** Annual output of 1 kW of panels in Odesa region, kWh. */
const YIELD = 1300;
const PANEL_W = 620;

export type Scenario = { id: "econom" | "optimum" | "comfort"; name: string; kw: number; panels: number; kwh: number; price: [number, number]; note: string };

const roundKw = (v: number) => Math.max(2, Math.round(v * 2) / 2);
const roundUsd = (v: number) => Math.round(v / 100) * 100;

export function estimate(monthlyKwh: number, goal: Goal): Scenario[] {
  const need = (monthlyKwh * 12) / YIELD;
  const dailyKwh = monthlyKwh / 30;
  const variants = [
    { id: "econom" as const, name: "Економ", k: 0.75, note: "Закриває основну частину рахунку" },
    { id: "optimum" as const, name: "Оптимум", k: 1, note: "Покриває річне споживання" },
    { id: "comfort" as const, name: "Комфорт", k: 1.3, note: "Із запасом під нові прилади чи авто" },
  ];
  return variants.map((v) => {
    const kw = roundKw(need * v.k);
    let kwh = 0;
    if (goal === "backup") kwh = Math.max(5, Math.round((dailyKwh * 0.35 * v.k) / 5) * 5);
    if (goal === "autonomy") kwh = Math.max(10, Math.round((dailyKwh * v.k) / 5) * 5);
    const cost = kw * PRICE.perKw + kwh * PRICE.perKwh + PRICE.base;
    return {
      id: v.id,
      name: v.name,
      kw,
      panels: Math.ceil((kw * 1000) / PANEL_W),
      kwh,
      price: [roundUsd(cost * 0.88), roundUsd(cost * 1.12)],
      note: v.note,
    };
  });
}

export const usd = (v: number) => "$" + String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** Loads for the blackout planner, in watts. */
export const appliances = [
  { id: "light", label: "Освітлення", w: 100, critical: true },
  { id: "wifi", label: "Wi-Fi та роутер", w: 20, critical: true },
  { id: "fridge", label: "Холодильник", w: 150, critical: true },
  { id: "boiler", label: "Котел (електроніка)", w: 150, critical: true },
  { id: "pump", label: "Насос води", w: 750, critical: true },
  { id: "laptop", label: "Ноутбуки й телефони", w: 120, critical: false },
  { id: "tv", label: "Телевізор", w: 100, critical: false },
  { id: "washer", label: "Пральна машина", w: 500, critical: false },
  { id: "ac", label: "Кондиціонер", w: 1000, critical: false },
  { id: "kettle", label: "Чайник / мікрохвильовка", w: 1500, critical: false },
  { id: "ev", label: "Зарядка електромобіля", w: 3500, critical: false },
] as const;

/** Share of the hour an appliance actually draws (fridge cycles, pump runs in bursts…). */
export const duty: Record<string, number> = { light: 1, wifi: 1, fridge: 0.4, boiler: 1, pump: 0.15, laptop: 1, tv: 1, washer: 0.3, ac: 0.6, kettle: 0.08, ev: 1 };

export const batteries = [5, 10, 16, 32] as const;
