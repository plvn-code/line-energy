import type { Metadata } from "next";
import { ObjectsFilter } from "@/components/ObjectsFilter";
import { ContactBand, PageHero } from "@/components/Shared";

export const metadata: Metadata = {
  title: "Наші об’єкти",
  description: "Реалізовані сонячні станції Line Energy в Одесі та області: потужність, обладнання й ціни під ключ.",
};

export default async function ObjectsPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="Портфоліо · 50+ об’єктів"
        title={
          <>
            Реальні об’єкти. <span className="accent">Реальні ціни.</span>
          </>
        }
        lead="Показуємо, що стоїть на даху й у технічному приміщенні: панелі, інвертори, акумулятори, захист — і скільки це коштувало під ключ."
        crumbs={[{ label: "Об’єкти", href: "/obiekty" }]}
      />
      <section className="section section-top-0">
        <div className="container">
          <ObjectsFilter initial={type} />
        </div>
      </section>
      <ContactBand title="Хочете так само?" lead="Залиште телефон — прорахуємо станцію під ваш об’єкт безкоштовно." />
    </>
  );
}
