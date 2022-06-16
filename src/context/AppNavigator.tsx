import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { load, save } from "../utils/storage";

const NAVIGATOR_PERSISTENCE_KEY = "@dkn/nav";

type AppNavigatorSegments = Record<string, React.FC>;

export type AppNavigatorContext = {
	segments: AppNavigatorSegments;
	activeSegmentKey?: string;
	goTo(key: string): void;
};

const Context = createContext<AppNavigatorContext>({
	segments: {},
	activeSegmentKey: undefined,
	goTo: () => {},
});

interface AppNavigatorProps {
	segments: AppNavigatorSegments;
	initialSegmentKey?: string;
}

export function AppNavigator({
	segments,
	initialSegmentKey,
}: AppNavigatorProps) {
	const [activeSegmentKey, setActiveSegmentKey] = useState<string | undefined>(
		initialSegmentKey || Object.keys(segments)[0] || undefined
	);

	const Component = useMemo(() => {
		if (!activeSegmentKey) return () => <></>;
		return segments[activeSegmentKey] || (() => <></>);
	}, [activeSegmentKey]);

	function goTo(key: string) {
		setActiveSegmentKey(key);
		save(NAVIGATOR_PERSISTENCE_KEY, key);
	}

	useEffect(() => {
		const persistedSegmentKey = load<string>(NAVIGATOR_PERSISTENCE_KEY);
		if (persistedSegmentKey) setActiveSegmentKey(persistedSegmentKey);
	}, []);

	return (
		<Context.Provider
			value={{
				segments,
				activeSegmentKey,
				goTo,
			}}
		>
			<Component />
		</Context.Provider>
	);
}

export const useAppNavigator = () => useContext(Context);
