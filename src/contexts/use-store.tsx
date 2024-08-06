import { createContext, ReactNode, useContext, useState } from "react";
import { Address } from "../types";

interface StoreContextProps {
  getTransactionHash: () => Address | null;
  storeTransactionHash: (hash: Address) => boolean;
  clearStore: () => boolean;
}

interface StoreProviderProps {
  children: ReactNode;
}

const STORE_KEY = "web3-store";

const StoreContext = createContext({} as StoreContextProps);

export function StoreProvider({ children }: StoreProviderProps) {
  const [transactionHash, setTransactionHash] = useState<Address | null>(null);

  function getStore() {
    if (typeof window === "undefined" || !localStorage) return false;

    return localStorage;
  }

  function storeTransactionHash(hash: Address) {
    const store = getStore();
    if (!store) return false;

    try {
      setTransactionHash(hash);
      store.setItem(STORE_KEY, hash);
      return true;
    } catch (error) {
      return false;
    }
  }

  function getTransactionHash() {
    if (transactionHash) return transactionHash;

    const store = getStore();
    if (!store) return null;

    const data = store.getItem(STORE_KEY) as Address | null;
    if (!data) return null;

    setTransactionHash(data);

    return data;
  }

  function clearStore() {
    const store = getStore();
    if (!store) return false;

    try {
      setTransactionHash(null);
      store.removeItem(STORE_KEY);
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <StoreContext.Provider
      value={{ getTransactionHash, storeTransactionHash, clearStore }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
