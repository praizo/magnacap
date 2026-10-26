import Image from "next/image";
import { clientele } from "@/content/site";
import shield from "../../public/brand/magnacap-shield.png";
import { Label, cx } from "./ui";

/**
 * Schematic of MagnaCap's brokerage role: clients on one side, markets on the
 * other, MagnaCap connecting them. All labels come from the supplied content;
 * it carries no prices, volumes or performance data.
 */

const markets = [
  { name: "FMDQ OTC", trades: "FGN, state and corporate bonds, Sukuk" },
  { name: "NGX", trades: "Equities" },
  { name: "NASD OTC", trades: "Equities" },
  { name: "AFEX OTC", trades: "Commodities" },
] as const;

/** Dashed link between columns: vertical when stacked, horizontal on desktop. */
function Connector({ dot }: { dot: "start" | "end" }) {
  return (
    <div aria-hidden="true" className="relative mx-auto h-10 w-px lg:h-px lg:w-full">
      <div className="absolute inset-0 border-l border-dashed border-line-strong lg:border-l-0 lg:border-t" />
      <span
        className={cx(
          "absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-signal lg:left-auto lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2",
          dot === "end" ? "bottom-0 translate-y-1/2 lg:-right-1 lg:bottom-auto" : "top-0 -translate-y-1/2 lg:-left-1 lg:top-1/2",
        )}
      />
    </div>
  );
}

export function IntermediationDiagram() {
  return (
    <figure className="dot-grid rounded-band border border-line px-5 py-8 sm:px-10 lg:px-12 lg:py-12">
      <div className="grid items-center lg:grid-cols-[auto_minmax(3rem,1fr)_auto_minmax(3rem,1fr)_auto]">
        <div className="rounded-panel bg-paper/80 p-5 lg:bg-transparent lg:p-0">
          <Label className="text-muted">
            Our clients
          </Label>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[1.0625rem] leading-snug text-ink lg:grid-cols-1 lg:gap-y-2">
            {clientele.map((client) => (
              <li key={client}>{client}</li>
            ))}
          </ul>
        </div>

        <Connector dot="end" />

        <div className="mx-auto flex items-center gap-4 rounded-panel border border-ink/80 bg-paper px-6 py-5 lg:flex-col lg:px-8 lg:py-8 lg:text-center">
          <Image src={shield} alt="" sizes="56px" className="size-11 lg:size-14" />
          <div>
            <p className="text-xl font-medium tracking-[-0.015em] text-ink">MagnaCap</p>
            <p className="text-[0.9375rem] text-muted">Execution and advice</p>
          </div>
        </div>

        <Connector dot="start" />

        <div className="rounded-panel bg-paper/80 p-5 lg:bg-transparent lg:p-0">
          <Label className="text-muted">
            Markets we trade on
          </Label>
          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1 lg:gap-y-2.5">
            {markets.map((market) => (
              <div key={market.name}>
                <dt className="text-[1.0625rem] font-medium leading-snug text-ink">{market.name}</dt>
                <dd className="text-[0.9375rem] leading-snug text-muted">{market.trades}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <figcaption className="sr-only">
        MagnaCap connects its clients with the markets it trades on.
      </figcaption>
    </figure>
  );
}
