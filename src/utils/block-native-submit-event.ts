export function blockNativeSubmitEvent(event: KeyboardEvent) {
  if (event.key === "Enter") event.preventDefault();
}
