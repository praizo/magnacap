import { ServiceDetailPage, serviceMetadata } from "@/components/service-detail-page";

export const metadata = serviceMetadata("brokerage");

export default function Page() {
  return <ServiceDetailPage slug="brokerage" />;
}
