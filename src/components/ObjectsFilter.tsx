"use client";

import { useState } from "react";
import { type StationType, objects, typeName } from "@/lib/objects";
import { ObjectCard } from "./Shared";

type F = "all" | StationType | "ev" | "price";
const FILTERS: { id: F; label: string; test: (o: (typeof objects)[number]) => boolean }[] = [
  { id: "all", label: "Усі", test: () => true },
  { id: "hybrid", label: typeName.hybrid, test: (o) => o.type === "hybrid" },
  { id: "grid", label: typeName.grid, test: (o) => o.type === "grid" },
  { id: "ev", label: "З електромобілем", test: (o) => o.tags.some((t) => /авто|Електромобіль/i.test(t)) },
  { id: "price", label: "З ціною", test: (o) => Boolean(o.price) },
];

export function ObjectsFilter({ initial }: { initial?: string }) {
  const [f, setF] = useState<F>(FILTERS.some((x) => x.id === initial) ? (initial as F) : "all");
  const list = objects.filter(FILTERS.find((x) => x.id === f)!.test);
  return (
    <>
      <div className="tabs tabs-wrap" role="tablist">
        {FILTERS.map((x) => (
          <button key={x.id} type="button" role="tab" aria-selected={f === x.id} className={f === x.id ? "is-on" : undefined} onClick={() => setF(x.id)}>
            {x.label}
            <span>{objects.filter(x.test).length}</span>
          </button>
        ))}
      </div>
      <div className="obj-grid" key={f}>
        {list.map((o, i) => (
          <ObjectCard key={o.slug} o={o} index={i} />
        ))}
      </div>
    </>
  );
}
