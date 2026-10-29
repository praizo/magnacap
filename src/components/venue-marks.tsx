import { PartnerMark } from "@/components/partner-marquee";
import { partnerLogos } from "@/content/partner-logos";
import { Label } from "./ui";

/** Venue names in content.md mapped to their official logos where one is held. */
const venueLogos: Record<string, (typeof partnerLogos)[string] | undefined> = {
  "FMDQ OTC": partnerLogos.FMDQ,
  NGX: partnerLogos.NGX,
  "AFEX OTC": partnerLogos["AFEX Exchange"],
};

/** Where an instrument trades, as logo tiles; instruments without a venue are handled by the desk. */
export function VenueMarks({ name, venues }: { name: string; venues: readonly string[] }) {
  return (
    <>
      <Label as="span" className="text-on-slate-muted">{venues.length ? "Traded on" : "Handled by"}</Label>
      {venues.length ? (
        <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${name} venues`}>
          {venues.map((venue) => (
            <li key={venue} className="service-band-venue">
              <PartnerMark partner={{ name: venue, ...venueLogos[venue] }} area={2200} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 font-medium text-on-slate">Our brokers, on your mandate</p>
      )}
    </>
  );
}
