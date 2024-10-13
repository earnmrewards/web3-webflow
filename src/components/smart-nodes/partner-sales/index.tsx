import { SMART_NODES_PARTNER_SALES_ID } from "../config";
import { SoldOutContainer } from "./sold-out-container";

export function PartnerSales() {
  return (
    <>
      <SoldOutContainer />
    </>
  );
}

PartnerSales.featureId = SMART_NODES_PARTNER_SALES_ID;
