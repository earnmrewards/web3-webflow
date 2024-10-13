import { validateFeature } from "../../utils/validate-feature";
import { PartnerDashboard } from "./partner-dashboard";
import { Sales } from "./sales";

export function SmartNodesComponents() {
  const features = [Sales, PartnerDashboard];
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
