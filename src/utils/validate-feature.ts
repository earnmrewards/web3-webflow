export function validateFeature(featureId: string) {
  const root = document.getElementById("root");
  if (!root) return false;

  const feature = root.getAttribute("feature");
  if (!feature) return false;

  if (feature.trim().includes(" ")) {
    const features = feature.split(" ");
    return features.includes(featureId);
  }

  return feature === featureId;
}
