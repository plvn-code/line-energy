import type { Metadata } from "next";
import { Faq } from "@/components/home/Sections";
import { ContactBand, PageHero } from "@/components/Shared";
import { faq } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Питання та відповіді",
  description: "Чи буде світло в блекаут, скільки коштує станція, зелений тариф, кредит, гарантії — відповіді Line Energy.",
};

const ld = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Питання та відповіді" lead="Найчастіше нас питають про блекаути, ціни, зелений тариф і гарантії." crumbs={[{ label: "FAQ", href: "/faq" }]} />
      <div className="section-pull">
        <Faq limit={faq.length} title="Відповідаємо чесно" />
      </div>
      <ContactBand />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
