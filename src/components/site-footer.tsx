import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { company, contact, lily, navigation, riskWarning, socials } from "@/content/site";
import shield from "../../public/brand/magnacap-shield.png";
import { AppleIcon, PlayIcon } from "./lily";
import { NewsletterForm } from "./newsletter-form";
import { SocialIcons } from "./social-icons";
import { Container, externalLinkProps } from "./ui";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

const serviceLinks = [
  { href: "/services/brokerage", label: "Brokerage" },
  { href: "/services/investment-advisory", label: "Investment Advisory" },
  { href: "/services#proprietary-trading", label: "Trading" },
  { href: "/services#custody", label: "Custodian Services" },
  { href: "/services#research", label: "Research" },
] as const;

const linkClass = "hover:text-on-slate hover:underline hover:underline-offset-4";

function FooterColumn({ title, links }: { title: string; links: readonly { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-lg font-medium">{title}</h2>
      <ul className="mt-6 space-y-4 text-on-slate-muted">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} {...externalLinkProps(item.href)} className={linkClass}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Full-width slate footer on risevest.com's structure: a centred market-report
 * sign-up; brand (with licence badge) and three link columns; a copyright row
 * with the LILY store badges; and the MagnaCap name set large and cropped along the base.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer on-dark">
      <Container className="pbs-20 text-center lg:pbs-28">
        <p className="text-on-slate-muted">Stay sharp with our reports</p>
        <h2 className="mt-3 text-h2">Get our market insights</h2>
        <p className="mx-auto mt-4 max-w-[46ch] text-lead text-on-slate-muted">
          Keep abreast of key market news with our market, macroeconomic and company reports.
        </p>
        <NewsletterForm />
      </Container>

      <Container className="grid gap-12 pbs-20 sm:grid-cols-2 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-x-24 lg:pbs-28">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-panel bg-paper p-1.5">
              <Image src={shield} alt="" sizes="40px" className="h-auto w-full" />
            </span>
            <p className="text-xl font-medium tracking-[-0.02em]">{company.name}</p>
          </div>
          <p className="mt-4 font-medium">Unlocking value for you.</p>
          <div className="footer-licence">
            <div className="footer-licence-cells">
              <span>
                <svg aria-hidden="true" viewBox="0 0 20 20" className="size-8 text-signal" fill="none" stroke="currentColor" strokeWidth="1.25">
                  <path d="M10 2.5 3.75 5v4.5c0 3.75 2.6 6.6 6.25 8 3.65-1.4 6.25-4.25 6.25-8V5Z" />
                  <path d="m7.25 10 2 2 3.5-4" />
                </svg>
              </span>
              <span className="tabular font-mono text-sm">{company.rcNumber}</span>
            </div>
            <p>{company.secLicence}</p>
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:col-span-2 sm:grid-cols-3 lg:col-span-1">
          <FooterColumn title="Company" links={navigation} />
          <FooterColumn title="Services" links={serviceLinks} />
          <div className="col-span-2 sm:col-span-1">
            <h2 className="text-lg font-medium">Contact us</h2>
            <address className="mt-6 space-y-4 not-italic text-on-slate-muted">
              {contact.phones.map((phone) => (
                <a key={phone.tel} href={`tel:${phone.tel}`} className={`tabular block whitespace-nowrap ${linkClass}`}>
                  {phone.display}
                </a>
              ))}
              <a href={`mailto:${contact.email}`} className={`block ${linkClass}`}>
                {contact.email}
              </a>
              <a href={contact.address.mapUrl} target="_blank" rel="noopener noreferrer" className={`block ${linkClass}`}>
                {contact.address.lines.join(", ")}
                <span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
            </address>
          </div>
        </nav>
      </Container>

      <Container className="pbs-20">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-3">
            <p className="text-sm text-on-slate-muted">
              © <CopyrightYear /> {company.legalName}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="text-sm text-on-slate-muted">Follow {socials.owner}</span>
              <SocialIcons className="flex flex-wrap gap-x-5 gap-y-2" />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={lily.appStore} target="_blank" rel="noopener noreferrer" className="store-badge">
              <AppleIcon className="size-7" />
              <span>
                <small>Download on the</small>
                App Store
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={lily.googlePlay} target="_blank" rel="noopener noreferrer" className="store-badge">
              <PlayIcon className="size-7" />
              <span>
                <small>Get it on</small>
                Google Play
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
        <p className="mt-8 max-w-3xl text-sm text-on-slate-muted">{riskWarning}</p>
      </Container>

      <p aria-hidden="true" className="site-footer-wordmark">
        {company.name}
      </p>
    </footer>
  );
}
