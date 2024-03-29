// React
import { createContext, useReducer } from 'react';

// Reducers
import appReducer, {
  StateType,
  ActionType,
  InitialState,
} from '../reducers/appReducer';

type appContextType = {
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
};

export const AppContext = createContext({} as appContextType);

type AppContextComponentProps = {
  children: React.ReactNode;
};

export default function AppContextComponent({
  children,
}: AppContextComponentProps) {
  const [state, dispatch] = useReducer(appReducer, InitialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
