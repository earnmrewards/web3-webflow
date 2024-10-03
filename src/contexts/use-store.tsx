import { createContext, ReactNode, useContext, useState } from "react";

enum Storage {
  SESSION,
  LOCAL,
}

type StorageItemType<T> = Record<string, T>;

interface StoreContextProps {
  // TODO: Improve the generic T return
  get<T>(key: string): StorageItemType<T> | null;
  set: (key: string, data: StorageItemType<string | number>) => void;
}

interface StoreProviderProps {
  children: ReactNode;
}

const STORE_KEY = "@web3-store";
const DEFAULT_STORE: Storage = Storage.SESSION;

const StoreContext = createContext({} as StoreContextProps);

export function StoreProvider({ children }: StoreProviderProps) {
  const [storedData, setStoredData] = useState<Map<
    string,
    StorageItemType<string | number>
  > | null>(null);

  function getStore() {
    switch (DEFAULT_STORE) {
      case Storage.LOCAL:
        return localStorage;
      default:
        return sessionStorage;
    }
  }

  function get<T>(key: string) {
    if (storedData !== null) {
      const data = storedData.get(key);
      if (data) return data as StorageItemType<T>;
    }

    const store = getStore();
    const data = store.getItem(`${STORE_KEY}/${key}`);
    if (!data) return null;

    try {
      const parsedData = JSON.parse(data) as StorageItemType<T>;
      const dataMap = new Map();

      dataMap.set(key, parsedData as StorageItemType<T>);
      setStoredData(dataMap);

      return parsedData;
    } catch {
      return null;
    }
  }

  function set(key: string, data: StorageItemType<string | number>) {
    const store = getStore();

    store.setItem(`${STORE_KEY}/${key}`, JSON.stringify(data));

    const dataMap = new Map();
    dataMap.set(key, data);
    setStoredData(dataMap);
  }

  return (
    <StoreContext.Provider value={{ get, set }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
