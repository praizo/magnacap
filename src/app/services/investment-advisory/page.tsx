import { ServiceDetailPage, serviceMetadata } from "@/components/service-detail-page";

export const metadata = serviceMetadata("investment-advisory");

export default function Page() {
  return <ServiceDetailPage slug="investment-advisory" />;
}
