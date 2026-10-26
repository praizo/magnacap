import Image from "next/image";
import { company } from "@/content/site";
import logo from "../../public/brand/magnacap-logo.png";
import { cx } from "./ui";

/** Official MagnaCap lockup (shield, wordmark and RC number), from the previous website. */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt={company.legalName}
      priority
      sizes="110px"
      className={cx("w-auto", className ?? "h-16")}
    />
  );
}
