import { PartnerProvider } from "@/contexts/use-partner";
import { SMART_NODES_PARTNER_SALES_ID } from "../config";
import { SoldOutContainer } from "./sold-out-container";
import { OrderContainer } from "./order-container";
import { NotFoundContainer } from "./not-found-container";
import { LogInContainer } from "./log-in-container";
import { LoaderContainer } from "./loader-component";
import { EmailContainer } from "./email-container";
import { SelectionContainer } from "./selection-container";
import { SuccessContainer } from "./success-container";

export function PartnerSales() {
  return (
    <PartnerProvider>
      <LoaderContainer />
      <SoldOutContainer />
      <NotFoundContainer />
      <EmailContainer />
      <LogInContainer />
      <SelectionContainer />
      <OrderContainer />
      <SuccessContainer />
    </PartnerProvider>
  );
}

PartnerSales.featureId = SMART_NODES_PARTNER_SALES_ID;
