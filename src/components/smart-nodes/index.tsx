import { EmailContainer } from "./email-container";
import { LogInContainer } from "./log-in-container";
import { OrderContainer } from "./order-container";
import { PartnerDashboard } from "./partner-dashboard";
import { SuccessContainer } from "./success-container";
import { ThreeWayContainer } from "./three-way-container";

export function SmartNodesComponents() {
  return (
    <>
      <EmailContainer />
      <LogInContainer />
      <ThreeWayContainer />
      <OrderContainer />
      <SuccessContainer />
      <PartnerDashboard />
    </>
  );
}
