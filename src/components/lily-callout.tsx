import Image from "next/image";
import { lily } from "@/content/site";
import lilyWordmark from "../../public/lily/lily-wordmark.png";
import { AppleIcon, LilyScreens, PlayIcon } from "./lily";
import { ButtonLink, Container } from "./ui";

/**
 * LILY app callout: copy left, authentic screens rising off the base. Rendered
 * above the footer on every page, on black with LILY orange accents.
 */
export function LilyCallout() {
  return (
    <section aria-labelledby="lily-title" className="py-16 lg:py-24">
      <Container>
        <div className="lily-banner">
          <div className="lily-banner-copy">
            {/* Official wordmark from lily.ng, in its own orange on the black field. */}
            <Image src={lilyWordmark} alt="LILY" className="h-9 w-auto brightness-0 invert" />
            <h2 id="lily-title" className="lily-banner-title mbs-5">
              Make your money work. <span className="block">Save, trade and invest.</span>
            </h2>
            <p className="mbs-4 max-w-[46ch] text-[1.0625rem] leading-relaxed">
              Direct access to fixed income products, stocks and commodities, plus automated
              savings goals, in one simple wealth creation app.
            </p>
            <div className="mbs-7 flex flex-wrap items-center gap-3">
              <a href={lily.appStore} target="_blank" rel="noopener noreferrer" className="lily-store button-link">
                <AppleIcon />
                App Store
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={lily.googlePlay} target="_blank" rel="noopener noreferrer" className="lily-store button-link">
                <PlayIcon />
                Google Play
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <ButtonLink href={lily.website} target="_blank" rel="noopener noreferrer" variant="text" className="ms-2 text-paper!">
                More about LILY
                <span className="sr-only"> (opens in a new tab)</span>
              </ButtonLink>
            </div>
          </div>
          <div className="lily-banner-media">
            <LilyScreens size="feature" className="lg:max-w-[22rem]!" />
          </div>
        </div>
      </Container>
    </section>
  );
}
