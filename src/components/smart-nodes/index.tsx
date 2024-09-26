import { LogInContainer } from "./log-in-container";
import { OrderContainer } from "./order-container";
import { PartnerDashboard } from "./partner-dashboard";
import { SuccessContainer } from "./success-container";
import { ThreeWayContainer } from "./three-way-container";

export function SmartNodesComponents() {
  return (
    <>
      <ThreeWayContainer />
      <OrderContainer />
      <SuccessContainer />
      <LogInContainer />
      <PartnerDashboard />
    </>
  );
}
