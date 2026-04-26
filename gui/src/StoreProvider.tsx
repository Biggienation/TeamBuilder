import React, { createContext ,useReducer, ReactNode } from 'react';

// Define the shape of your state
interface StoreState {
  rootPath: string;
  // Add other state fields here as needed
}

// Initial state
const initialState: StoreState = {
  rootPath: '/home',
};

// Simple reducer (expand as needed)
function storeReducer(state: StoreState, action: any): StoreState {
  switch (action.type) {
    case 'SET_ROOT_PATH':
      return { ...state, rootPath: action.payload };
    default:
      return state;
  }
}

// Update context type to include dispatch
interface StoreContextType {
  state: StoreState;
  dispatch: React.Dispatch<any>;
}

const initialContext: StoreContextType = {
  state: initialState,
  dispatch: () => {},
};

// Create context
export const StoreContext = createContext<StoreContextType>(initialContext);

// Provider component
export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
