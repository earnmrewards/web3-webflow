import { PartnerProvider } from "@/contexts/use-partner";
import { SMART_NODES_PARTNER_SALES_ID } from "../config";
import { SoldOutContainer } from "./sold-out-container";
import { OrderContainer } from "./order-container";
import { NotFound } from "./not-found-container";
import { LogIn } from "./log-in-container";

export function PartnerSales() {
  return (
    <PartnerProvider>
      <SoldOutContainer />
      <NotFound />
      <LogIn />
      <OrderContainer />
    </PartnerProvider>
  );
}

PartnerSales.featureId = SMART_NODES_PARTNER_SALES_ID;
