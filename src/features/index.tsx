import { validateFeature } from "@/utils/validate-feature";
import { Sales } from "./smart-nodes/sales";
import { PartnerDashboard } from "./smart-nodes/partner-dashboard";
import { PartnerSales } from "./smart-nodes/partner-sales";
import { TokenExchange } from "./token-exchange";

export function FeatureComponents() {
  const features = [Sales, PartnerDashboard, PartnerSales, TokenExchange];
  const availableComponents: typeof features = [];

  features.forEach((component) => {
    if (validateFeature(component.featureId)) {
      availableComponents.push(component);
    }
  });

  return availableComponents.map((Component, index) => (
    <Component key={index} />
  ));
}
