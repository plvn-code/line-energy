/** Contacts and navigation. Every fact here comes from lineenergysolar.com or @lineenergy.solar. */
export const site = {
  name: "Line Energy",
  legal: "«ЛАЙН-ЕНЕРДЖИ»",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://lineenergy.vercel.app",
  description:
    "Сонячні електростанції під ключ в Одесі та області: проєкт, монтаж за 3–5 днів, зелений тариф і сервіс. 50+ об’єктів, гарантія на обладнання до 12 років.",
  region: "Одеса та Одеська область",
  phone: "+38 (099) 210-21-19",
  phoneHref: "tel:+380992102119",
  phones: [
    { label: "Консультації", person: "Вячеслав", phone: "+38 (099) 210-21-19", href: "tel:+380992102119" },
    { label: "Відділ продажів", person: "Катерина", phone: "+38 (093) 217-42-80", href: "tel:+380932174280" },
  ],
  email: "Lineenergy250678@gmail.com",
  instagram: "https://www.instagram.com/lineenergy.solar/",
  instagramHandle: "@lineenergy.solar",
  direct: "https://ig.me/m/lineenergy.solar",
} as const;

export const nav = [
  { label: "Об’єкти", href: "/obiekty" },
  { label: "Послуги", href: "/posluhy" },
  { label: "Калькулятор", href: "/kalkuliator" },
  { label: "Кредит 0,01%", href: "/kredyt" },
  { label: "Про нас", href: "/pro-nas" },
  { label: "FAQ", href: "/faq" },
  { label: "Контакти", href: "/kontakty" },
] as const;

export const facts = [
  { value: 50, suffix: "+", label: "реалізованих об’єктів для дому та бізнесу", href: "/obiekty" },
  { value: 5, suffix: " років", label: "на ринку сонячної енергетики", href: "/pro-nas" },
  { value: 5, prefix: "3–", suffix: " днів", label: "монтаж станції на об’єкті", href: "/posluhy#protses" },
  { value: 12, prefix: "до ", suffix: " років", label: "гарантії на обладнання", href: "/pro-nas#harantii" },
] as const;

export const brands = ["Deye", "Dyness", "JA Solar", "Tongwei Solar", "Felicity Solar", "LuxPower", "Huawei"] as const;
