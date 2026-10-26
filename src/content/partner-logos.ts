import type { StaticImageData } from "next/image";
import accessBank from "../../public/partners/access-bank.svg";
import afex from "../../public/partners/afex.svg";
import afrinvest from "../../public/partners/afrinvest.svg";
import alternativeBank from "../../public/partners/alternative-bank.png";
import coronation from "../../public/partners/coronation-mbank.svg";
import fcmb from "../../public/partners/fcmb.svg";
import firstbankUk from "../../public/partners/firstbank-uk.png";
import fmdq from "../../public/partners/fmdq.svg";
import fsdh from "../../public/partners/fsdh.jpg";
import globusBank from "../../public/partners/globus-bank.svg";
import gtbank from "../../public/partners/gtbank.svg";
import keystoneBank from "../../public/partners/keystone-bank.png";
import lotusBank from "../../public/partners/lotus-bank.png";
import ngx from "../../public/partners/ngx.png";
import parallexBank from "../../public/partners/parallex-bank.svg";
import polarisBank from "../../public/partners/polaris-bank.jpg";
import savvySecurities from "../../public/partners/savvy-securities.svg";
import stanbicIbtc from "../../public/partners/stanbic-ibtc-bank-white.svg";
import sterlingBank from "../../public/partners/sterling-bank.png";
import zenith from "../../public/partners/zenith.svg";

/**
 * Official partner logos, sourced from each organisation's website or its
 * Wikimedia Commons page (see docs/partner-logos-manifest.json for sources).
 * Partners without a confident, authentic logo are set as names instead:
 * FBNM Bank and ContiCap (unidentified), UBA GIS (unit of UBA; low confidence)
 * and Zenith UK (only the group mark exists, which would duplicate Zenith).
 */
export type PartnerLogoData = {
  logo?: StaticImageData;
  /** The only available file is white; invert it for light backgrounds. */
  invert?: boolean;
};

export const partnerLogos: Record<string, PartnerLogoData> = {
  FMDQ: { logo: fmdq },
  NGX: { logo: ngx },
  "AFEX Exchange": { logo: afex },
  "Access Bank": { logo: accessBank },
  "Afrinvest WA": { logo: afrinvest },
  "Alternative Bank": { logo: alternativeBank },
  "Coronation MBank": { logo: coronation },
  "FBN UK": { logo: firstbankUk },
  FCMB: { logo: fcmb },
  FSDH: { logo: fsdh },
  "Globus Bank": { logo: globusBank },
  GTB: { logo: gtbank },
  "Keystone Bank": { logo: keystoneBank },
  "Lotus Bank": { logo: lotusBank },
  "Parallex Bank": { logo: parallexBank },
  Polaris: { logo: polarisBank },
  "Savvy Securities Ghana": { logo: savvySecurities },
  "Stanbic IBTC Bank": { logo: stanbicIbtc, invert: true },
  "Sterling Bank": { logo: sterlingBank },
  Zenith: { logo: zenith },
};
