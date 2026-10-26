/**
 * The five MagnaCap services. All copy is verbatim from content.md.
 *
 * Only Brokerage and Investment Advisory have enough content for their own
 * page under /services/[slug]; the others live on the /services overview and
 * link to their card there (`anchor`). Set `hasPage: true` once more content
 * is supplied.
 */
export type ServiceDetail = {
  slug: string;
  title: string;
  hasPage: boolean;
  /** Card id on the /services overview. */
  anchor: string;
  /** Short label shown above the title on the overview stack. */
  group: "Our services" | "Other services";
  intro: string;
  more?: string;
  /** Heading and points for the highlight panel. */
  highlightsTitle?: string;
  highlights: readonly string[];
};

export const services = [
  {
    slug: "brokerage",
    title: "Brokerage",
    hasPage: true,
    anchor: "brokerage",
    group: "Our services",
    intro:
      "We facilitate and execute trades for both buy-side and sell-side clients. By acting as intermediary, we connect buyers and sellers of sovereign bonds, corporate bonds, Eurobonds, commodities, equities, and money market instruments. Our clients benefit from competitive pricing, efficient execution, confidentiality, and our wide market reach.",
    highlightsTitle: "Our execution service covers the following asset classes:",
    highlights: ["Sovereign Bonds", "Treasury bills", "Corporate bonds", "Eurobonds", "Commercial papers", "Equities", "Commodities", "Currencies"],
  },
  {
    slug: "investment-advisory",
    title: "Investment Advisory",
    hasPage: true,
    anchor: "advisory",
    group: "Our services",
    intro:
      "We understand that navigating the financial markets can be complex. Our investment advisory service is designed to provide you with expert guidance and strategic insights to make informed investment decisions.",
    highlightsTitle: "Our advisory team offers:",
    highlights: ["Customized Financial Planning", "Portfolio Management", "Stock recommendation", "Research"],
  },
  {
    slug: "trading",
    title: "Trading",
    hasPage: false,
    anchor: "proprietary-trading",
    group: "Our services",
    intro:
      "We engage in proprietary trading to capitalize on market opportunities and deliver superior returns to our shareholders. Our trading desk is staffed with experienced professionals who employ sophisticated strategies to trade instruments, including FGN bonds, corporate bonds, Eurobonds, and money market instruments, equities, and commodities.",
    more: "By leveraging our deep market insights, we aim to maximize profits and mitigate risks, ensuring robust portfolio growth.",
    highlights: ["FGN bonds", "Corporate bonds", "Eurobonds", "Money market instruments", "Equities", "Commodities"],
  },
  {
    slug: "custodian-services",
    title: "Custodian Services",
    hasPage: false,
    anchor: "custody",
    group: "Other services",
    intro:
      "We ensure the safety and management of your investment assets with our reliable custodial services. We provide secure storage, transaction settlement, and comprehensive reporting, giving you peace of mind and allowing you to focus on your investment strategy.",
    highlights: ["Secure storage", "Transaction settlement", "Comprehensive reporting"],
  },
  {
    slug: "research",
    title: "Research",
    hasPage: false,
    anchor: "research",
    group: "Other services",
    intro:
      "We provide market insight for our clients’ decision making through our market report, macroeconomic report, company reports and many more. Our team of experts deliver timely market insights, economic forecasts, and sector-specific reports, empowering you with the knowledge needed to navigate the financial markets confidently.",
    highlights: ["Market report", "Macroeconomic report", "Company reports", "Economic forecasts", "Sector-specific reports"],
  },
] as const satisfies readonly ServiceDetail[];

export type ServiceSlug = (typeof services)[number]["slug"];

/** Services that have their own page. */
export const servicePages = services.filter((service) => service.hasPage);

/** The service's own page, or its card on the /services overview. */
export function serviceHref(slug: ServiceSlug) {
  const service = services.find((item) => item.slug === slug)!;
  return service.hasPage ? `/services/${service.slug}` : `/services#${service.anchor}`;
}
