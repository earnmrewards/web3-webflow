export function isInsideContainer(containerId: string, elementId: string) {
  const container = document.getElementById(containerId);
  if (!container) return false;

  const elements = container.getElementsByTagName("*");
  for (const element of elements) {
    if (element.id === elementId) {
      return true;
    }
  }

  return false;
}
