/**
 * Single source of truth for MagnaCap company content.
 *
 * Every statement here is edited from the client-supplied content.md, the
 * supplied logo (RC number) or lily.ng (store links). Items still awaiting
 * client confirmation are tracked in docs/LAUNCH-CHECKLIST.md, not on the site.
 */

export const company = {
  name: "MagnaCap",
  legalName: "MagnaCap Limited",
  rcNumber: "RC 1322472",
  secLicence: "Licensed by the Securities and Exchange Commission",
  url: "https://www.magnacap.org",
  displayUrl: "www.magnacap.org",
  description:
    "MagnaCap Limited is an SEC-licensed brokerage and investment advisory company providing trade execution across fixed income, equities, money market instruments, commodities and FX.",
} as const;

export const contact = {
  email: "info@magnacap.org",
  address: {
    lines: ["3 Birrel Avenue", "Sabo, Yaba", "Lagos"],
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=3+Birrel+Avenue%2C+Sabo%2C+Yaba%2C+Lagos",
  },
  phones: [
    { display: "+234 802 241 2162", tel: "+2348022412162" },
    { display: "+234 816 064 8707", tel: "+2348160648707" },
    { display: "+234 816 924 1740", tel: "+2348169241740" },
  ],
} as const;

export function mailto(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${contact.email}${query ? `?${query}` : ""}`;
}

/** Links taken from lily.ng and checked against the live store listings. */
export const lily = {
  website: "https://lily.ng/",
  websiteLabel: "lily.ng",
  appStore: "https://apps.apple.com/us/app/lily-finance-save-invest/id6746137757",
  googlePlay: "https://play.google.com/store/apps/details?id=com.magnacap.lilyvest",
} as const;

export const navigation = [
  { href: "/about", label: "About" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services/brokerage", label: "Brokerage" },
      { href: "/services/investment-advisory", label: "Investment Advisory" },
      { href: "/services#proprietary-trading", label: "Trading" },
      { href: "/services#custody", label: "Custodian Services" },
      { href: "/services#research", label: "Research" },
    ],
  },
  /* LILY lives on its own site; external links open in a new tab. */
  { href: lily.website, label: "LILY" },
  { href: "/insights", label: "Market insights" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Social accounts shown in the footer. MagnaCap's old site linked its icons to
 * "#", so these are LILY's verified accounts (from lily.ng). Replace or extend
 * with MagnaCap's own accounts when they exist.
 */
export const socials = {
  owner: "LILY",
  links: [
    { network: "LinkedIn", href: "https://www.linkedin.com/company/lilyfinancehq" },
    { network: "X", href: "https://x.com/lilyfinancehq" },
    { network: "Instagram", href: "https://www.instagram.com/lilyfinancehq" },
    { network: "Facebook", href: "https://www.facebook.com/lilyfinancehq" },
    { network: "TikTok", href: "https://www.tiktok.com/@lilyfinancehq" },
  ],
} as const;

/** The five asset classes named in content.md's opening line. */
export const assetClassesTraded = ["Fixed income", "Equities", "Money market", "Commodities", "FX"] as const;

export const assetClasses = [
  "Sovereign bonds",
  "Treasury bills",
  "Corporate bonds",
  "Eurobonds",
  "Commercial papers",
  "Equities",
  "Commodities",
  "Currencies",
] as const;

/** Markets named in the supplied instrument descriptions. */
export const venues = ["FMDQ OTC", "NGX", "NASD OTC", "AFEX OTC"] as const;

export const clientele = [
  "Banking institutions",
  "Pension fund administrators",
  "Asset managers",
  "Insurance companies",
  "High-net-worth individuals",
  "Retail investors",
] as const;

export const advantages = [
  {
    title: "Efficient trading",
    body: "Speedy execution of mandates at the best price.",
  },
  {
    title: "Confidentiality and anonymity",
    body: "Our traders bring discretion to every dealing with clients.",
  },
  {
    title: "Strong reputation",
    body: "Reliable and trusted by counterparties and stakeholders.",
  },
  {
    title: "Price discovery",
    body: "Two-way quotes on most instruments help clients discover price.",
  },
  {
    title: "Market insight",
    body: "Actionable insight from our brokers, and periodic market reports.",
  },
] as const;

export const values = [
  "Integrity",
  "Excellence",
  "Client centricity",
  "Accountability",
  "Competence",
] as const;

export const mission =
  "To create maximum value for all stakeholders through innovation and a dedicated workforce.";

export const vision = "To be the most dynamic financial market company out of Africa.";

/** Instrument descriptions, verbatim from content.md (venues are the markets named in each). */
export const instruments = [
  {
    name: "Bonds",
    body: "We facilitate trades for all FMDQ OTC listed FGN bonds, Sukuk, state bond and corporate bonds, across the yield curve, ensuring liquidity and competitive pricing.",
    venues: ["FMDQ OTC"],
  },
  {
    name: "Money market instruments",
    body: "Interested in short term discounted debt instruments to provide liquidity and preserve capital, like treasury bills or commercial papers? Our brokers will take care of your demand or supply mandates at the most competitive rate.",
    venues: [],
  },
  {
    name: "Equities",
    body: "We create value by offering execution service for all listed securities on the Nigerian stock exchange and NASD OTC. Our trading application “Lily” also gives you direct access to the market.",
    venues: ["NGX", "NASD OTC"],
  },
  {
    name: "Commodities",
    body: "Explore the world of commodities trading and investment with MagnaCap, through AFEX OTC. Commodities trading is not only a form of investment but also a strategy to diversify your portfolio and manage risk effectively.",
    venues: ["AFEX OTC"],
  },
] as const;

/**
 * Advisory offerings, verbatim from content.md. Portfolio Management and
 * Research are listed there without a description of their own.
 */
export const advisoryServices = [
  {
    title: "Personalized Financial Planning",
    body: "We will work closely with you to understand your short-term and long-term financial objectives, creating a roadmap to help you achieve them efficiently.",
  },
  { title: "Portfolio Management", body: undefined },
  {
    title: "Portfolio Reconstruction",
    body: "Our expert advisors will assess your current portfolio and work with you to strategically reconstruct it for optimal performance. Whether you are looking to diversify, rebalance, or align your investments with specific objectives, we will customize a plan that suits your needs.",
  },
  {
    title: "Customized Stock Recommendations",
    body: "Receive personalized stock recommendations based on thorough market analysis and your individual risk tolerance. Our advisors leverage their deep industry knowledge to identify opportunities that align with your investment strategy and preference.",
  },
  { title: "Research", body: undefined },
] as const;

export const reportTypes = [
  "Market reports",
  "Macroeconomic reports",
  "Company reports",
  "Sector-specific reports",
] as const;

/**
 * Supplied by the client as "some of our partners". Names are kept as
 * supplied (capitalisation only). No logos until supplied and cleared.
 */
export const partners = {
  marketInfrastructure: ["FMDQ", "NGX", "AFEX Exchange"],
  institutions: [
    "Access Bank",
    "Afrinvest WA",
    "Alternative Bank",
    "ContiCap",
    "Coronation MBank",
    "FBN UK",
    "FBNM Bank",
    "FCMB",
    "FSDH",
    "Globus Bank",
    "GTB",
    "Keystone Bank",
    "Lotus Bank",
    "Parallex Bank",
    "Polaris",
    "Savvy Securities Ghana",
    "Stanbic IBTC Bank",
    "Sterling Bank",
    "UBA GIS",
    "Zenith",
    "Zenith UK",
  ],
} as const;

export const riskWarning =
  "Investing involves risk. The value of investments can fall as well as rise, and you may get back less than you invest. Past performance is not a reliable indicator of future results.";
