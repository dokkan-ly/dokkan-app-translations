import React, { createContext, useContext, useMemo, useState } from "react";

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
  const [activeSegmentKey, goTo] = useState<string | undefined>(
    initialSegmentKey || Object.keys(segments)[0] || undefined
  );

  const Component = useMemo(() => {
    if (!activeSegmentKey) return () => <></>;
    return segments[activeSegmentKey] || (() => <></>);
  }, [activeSegmentKey]);

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
