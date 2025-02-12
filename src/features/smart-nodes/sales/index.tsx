import { SMART_NODES_SALES_FEATURE_ID } from "../config";
import { EmailContainer } from "./email-container";
import { LogInContainer } from "./log-in-container";
import { OrderContainer } from "./order-container";
import { SuccessContainer } from "./success-container";
import { ThreeWayContainer } from "./three-way-container";

export function Sales() {
  return (
    <>
      <EmailContainer />
      <LogInContainer />
      <ThreeWayContainer />
      <OrderContainer />
      <SuccessContainer />
    </>
  );
}

Sales.featureId = SMART_NODES_SALES_FEATURE_ID;
