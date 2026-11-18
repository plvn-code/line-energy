"use client";

import Link from "next/link";
import { useState } from "react";
import { stationTypes } from "@/lib/copy";
import { objects } from "@/lib/objects";
import { Icon } from "../Icons";
import { LeadButton } from "../LeadModal";

/** Three kinds of station as tabs; the diagram lights the parts each one has. */
export function StationTypes() {
  const [active, setActive] = useState(1);
  const t = stationTypes[active];
  const count = objects.filter((o) => o.type === t.id).length;

  return (
    <section className="section types" id="typy">
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Яку станцію обрати</p>
          <h2 className="h2">
            Не існує однієї станції <span className="accent">для всіх</span>
          </h2>
          <p className="section-sub">Комусь важливо зменшити рахунки, комусь — мати світло в блекаут, а комусь — повна незалежність. Від задачі залежить тип системи.</p>
        </div>

        <div className="types-tabs" role="tablist" data-reveal>
          {stationTypes.map((s, i) => (
            <button key={s.id} type="button" role="tab" aria-selected={i === active} className={i === active ? "is-on" : undefined} onClick={() => setActive(i)}>
              <span className="mono">0{i + 1}</span>
              <strong>{s.name}</strong>
              <span>{s.tagline}</span>
            </button>
          ))}
        </div>

        <div className="types-panel" key={t.id} data-type={t.id}>
          <div className="types-diagram" aria-hidden="true">
            <div className="td-node td-sun">
              <Icon name="sun" size={26} />
              <span>Панелі</span>
            </div>
            <div className="td-line td-l1" />
            <div className="td-node td-inv">
              <Icon name="bolt" size={26} />
              <span>Інвертор</span>
            </div>
            <div className="td-line td-l2" />
            <div className="td-node td-home">
              <Icon name="home" size={26} />
              <span>Дім</span>
            </div>
            <div className="td-line td-l3" />
            <div className="td-node td-bat">
              <Icon name="battery" size={26} />
              <span>Акумулятор</span>
            </div>
            <div className="td-line td-l4" />
            <div className="td-node td-grid">
              <Icon name="grid" size={26} />
              <span>Мережа</span>
            </div>
          </div>

          <div className="types-info">
            <h3>{t.goal}</h3>
            <p>{t.body}</p>
            <dl>
              <div>
                <dt>Під час блекауту</dt>
                <dd>{t.blackout}</dd>
              </div>
              <div>
                <dt>Акумулятор</dt>
                <dd>{t.battery}</dd>
              </div>
              <div>
                <dt>Зелений тариф</dt>
                <dd>{t.greenTariff}</dd>
              </div>
              <div>
                <dt>Кому підходить</dt>
                <dd>{t.fits}</dd>
              </div>
            </dl>
            <div className="types-actions">
              <LeadButton title={`${t.name} станція: розрахунок`} details={`Цікавить: ${t.name.toLowerCase()} станція`} className="btn btn-primary">
                Розрахувати {t.name.toLowerCase()} <Icon name="arrow" size={18} />
              </LeadButton>
              {count > 0 && (
                <Link href={`/obiekty?type=${t.id}`} className="btn btn-outline">
                  Наші об’єкти · {count}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
