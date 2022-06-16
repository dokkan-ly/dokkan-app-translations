import {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { isEmptyObject, load, save } from "../utils/storage";

const STORE_PERSISTENCE_KEY = "@app/store";

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
		setData((p) => {
			const newData = { ...p, [key]: data };
			save(STORE_PERSISTENCE_KEY, newData);
			return newData;
		});
	},
	[]);

	useEffect(() => {
		if (isEmptyObject(data)) {
			const loadedData = load<AppStoreData>(STORE_PERSISTENCE_KEY);
			if (loadedData) setData(loadedData);
		}
	}, [data]);

	return (
		<Context.Provider value={{ data, update }}>{children}</Context.Provider>
	);
}

export const useAppStore = () => {
	const context = useContext(Context);
	if (!context) throw new Error("Store not initialized");
	return context;
};
