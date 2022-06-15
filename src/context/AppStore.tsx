import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type AppStoreData = {
  csv?: string;
  table?: string[][];
};
type AppStore = {
  data: AppStoreData;
  update<K extends keyof AppStoreData>(key: K, data: AppStoreData[K]): void;
};
const Context = createContext<AppStore | null>(null);

export function AppStoreProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<AppStoreData>({});
  const update = useCallback(function <K extends keyof AppStoreData>(
    key: keyof AppStoreData,
    data: AppStoreData[K]
  ) {
    setData((p) => ({ ...p, [key]: data }));
  },
  []);
  return (
    <Context.Provider value={{ data, update }}>{children}</Context.Provider>
  );
}

export const useAppStore = () => {
  const context = useContext(Context);
  if (!context) throw new Error("Store not initialized");
  return context;
};
