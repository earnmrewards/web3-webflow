type Response<T> = T & {
  error?: unknown;
};

export function getEncryptedData<T>(encrypted: string): Response<T> {
  const decryptedData = atob(encrypted);

  try {
    return JSON.parse(decryptedData);
  } catch (error) {
    return { error } as Response<T>;
  }
}
