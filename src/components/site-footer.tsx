import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { company, contact, lily, navigation, socials } from "@/content/site";
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
 * Full-width slate footer on risevest.com's structure: a two-column market-report
 * sign-up; brand (RC number, licence line, LILY store badges) and three link
 * columns; a copyright and social row; and the MagnaCap name set large and cropped along the base.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer on-dark">
      <Container className="pbs-20 lg:pbs-28">
        <div className="grid gap-8 border-b border-on-slate-line pbe-16 lg:grid-cols-2 lg:items-center lg:gap-16 lg:pbe-20">
          <div>
            <p className="text-on-slate-muted">Stay sharp with our reports</p>
            <h2 className="mt-3 text-h2">Get our market insights</h2>
            <p className="mt-4 max-w-[46ch] text-lead text-on-slate-muted">
              Keep abreast of key market news with our market, macroeconomic and company reports.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </Container>

      <Container className="grid gap-12 pbs-20 sm:grid-cols-2 lg:grid-cols-[21rem_minmax(0,1fr)] lg:gap-x-24 lg:pbs-28">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-panel bg-paper p-1.5">
              <Image src={shield} alt="" sizes="40px" className="h-auto w-full" />
            </span>
            <div>
              <p className="text-xl font-medium leading-tight tracking-[-0.02em]">{company.name}</p>
              <p className="tabular font-mono text-xs text-on-slate-muted">{company.rcNumber}</p>
            </div>
          </div>
          <p className="mt-4 font-medium">Unlocking value for you.</p>
          <p className="mt-2 text-sm text-on-slate-muted">{company.secLicence}</p>
          <p className="mt-8 text-sm font-medium">Get the LILY app</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a href={lily.appStore} target="_blank" rel="noopener noreferrer" className="store-badge">
              <AppleIcon className="size-6" />
              <span>
                <small>Download on the</small>
                App Store
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href={lily.googlePlay} target="_blank" rel="noopener noreferrer" className="store-badge">
              <PlayIcon className="size-6" />
              <span>
                <small>Get it on</small>
                Google Play
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
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
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-on-slate-line pbs-8">
          <p className="text-sm text-on-slate-muted">
            © <CopyrightYear /> {company.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-sm text-on-slate-muted">Follow {socials.owner}</span>
            <SocialIcons className="flex flex-wrap gap-2" />
          </div>
        </div>
      </Container>

      <p aria-hidden="true" className="site-footer-wordmark">
        {company.name}
      </p>
    </footer>
  );
}
