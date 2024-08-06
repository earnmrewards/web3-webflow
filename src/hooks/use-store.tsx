import { useState } from "react";

const STORE_KEY = "web3-store";

export function useStore() {
  const [hash, setHash] = useState<string | null>(null);

  function getStore() {
    if (typeof window === "undefined" || !localStorage) return false;

    return localStorage;
  }

  function getTransactionHash() {
    if (hash) return hash;

    const store = getStore();
    if (!store) return null;

    const data = store.getItem(STORE_KEY);
    if (!data || data.length === 0) return null;

    setHash(data);

    return data;
  }

  function storeTransactionHash(hash: string) {
    const store = getStore();
    if (!store) return false;

    try {
      setHash(hash);
      store.setItem(STORE_KEY, hash);
      return true;
    } catch (error) {
      return false;
    }
  }

  function clearStore() {
    const store = getStore();
    if (!store) return false;

    try {
      setHash(null);
      store.removeItem(STORE_KEY);
      return true;
    } catch (error) {
      return false;
    }
  }

  return { getTransactionHash, storeTransactionHash, clearStore };
}
