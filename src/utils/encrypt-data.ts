export function encryptData(data: Record<string, string>) {
  const stringData = JSON.stringify(data);
  return btoa(stringData);
}
