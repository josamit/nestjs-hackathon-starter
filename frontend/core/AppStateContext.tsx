import { createContext, useContext, useState } from "react";

const AppStateContext = createContext(null);

export function useAppState() {
  const c = useContext(AppStateContext);

  if (!c) {
    throw new Error("Please wrap with context");
  }

  return c;
}

export function AppStateProvider({ children }) {
  const [state, setState] = useState({
    user: null,
  });

  function setPartialState(partialState) {
    setState({
      ...state,
      ...partialState,
    });
  }

  const value = {
    state,
    setState,
    setUser: (user) => setPartialState({ user }),
  };
  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}
