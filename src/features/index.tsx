import { validateFeature } from "@/utils/validate-feature";
import { Sales } from "./smart-nodes/sales";
import { PartnerDashboard } from "./smart-nodes/partner-dashboard";
import { PartnerSales } from "./smart-nodes/partner-sales";

export function FeatureComponents() {
  const features = [Sales, PartnerDashboard, PartnerSales];
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
