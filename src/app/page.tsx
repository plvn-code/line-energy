import Link from "next/link";
import { Calculator } from "@/components/Calculator";
import { Icon } from "@/components/Icons";
import { Blackout } from "@/components/home/Blackout";
import { EnergyDay } from "@/components/home/EnergyDay";
import { Hero } from "@/components/home/Hero";
import { Manifest } from "@/components/home/Manifest";
import { ObjectsStack } from "@/components/home/ObjectsStack";
import { CreditBand, Faq, Guarantees, Process, VsGenerator, Why } from "@/components/home/Sections";
import { StationTypes } from "@/components/home/StationTypes";
import { ContactBand, Marquee } from "@/components/Shared";
import { brands } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifest />
      <EnergyDay />
      <StationTypes />
      <ObjectsStack />
      <Marquee items={brands} />
      <section className="section calc-section" id="kalkuliator">
        <div className="container">
          <div className="row-head section-head-row" data-reveal>
            <div>
              <p className="eyebrow">Калькулятор станції</p>
              <h2 className="h2">
                3 чесні сценарії <span className="accent">за 10 секунд</span>
              </h2>
            </div>
            <Link href="/kalkuliator" className="text-link">
              Як ми рахуємо <Icon name="arrow" size={16} />
            </Link>
          </div>
          <Calculator />
        </div>
      </section>
      <Blackout />
      <Process />
      <Why />
      <VsGenerator />
      <Guarantees />
      <CreditBand />
      <Faq />
      <ContactBand />
    </>
  );
}
