import { createContext, ReactNode, useContext, useState } from "react";

export enum Storage {
  SESSION,
  LOCAL,
}

type StorageItemType<T> = Record<string, T>;

interface StoreContextProps {
  // TODO: Improve the generic T return
  get<T>(key: string, type?: Storage): StorageItemType<T> | null;
  set: (
    key: string,
    data: StorageItemType<string | number>,
    type?: Storage
  ) => void;
  del: (key: string, type?: Storage) => void;
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

  function getStore(type: Storage) {
    switch (type) {
      case Storage.LOCAL:
        return localStorage;
      default:
        return sessionStorage;
    }
  }

  function get<T>(key: string, type: Storage = DEFAULT_STORE) {
    if (storedData !== null) {
      const data = storedData.get(key);
      if (data) return data as StorageItemType<T>;
    }

    const store = getStore(type);
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

  function set(
    key: string,
    data: StorageItemType<string | number>,
    type: Storage = DEFAULT_STORE
  ) {
    const store = getStore(type);

    store.setItem(`${STORE_KEY}/${key}`, JSON.stringify(data));

    const dataMap = new Map();
    dataMap.set(key, data);
    setStoredData(dataMap);
  }

  function del(key: string, type: Storage = DEFAULT_STORE) {
    const store = getStore(type);

    store.removeItem(`${STORE_KEY}/${key}`);

    const dataMap = new Map(storedData);
    dataMap.delete(key);
    setStoredData(dataMap);
  }

  return (
    <StoreContext.Provider value={{ get, set, del }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
