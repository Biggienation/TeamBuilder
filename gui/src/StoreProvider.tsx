import React, { createContext ,useReducer, ReactNode } from 'react';

// Define the shape of your state
interface StoreState {
  rootPath: string;
  user: User | null;
  token: string | null;
  // Add other state fields here as needed
}

interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  active: boolean;
  ownedCharacters?: string[];
}

// Initial state
const initialState: StoreState = {
  rootPath: '/home',
  user: null,
  token: localStorage.getItem('authToken') || null,
};

// Simple reducer (expand as needed)
function storeReducer(state: StoreState, action: any): StoreState {
  switch (action.type) {
    case 'SET_ROOT_PATH':
      return { ...state, rootPath: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_TOKEN':
      if (action.payload) {
        localStorage.setItem('authToken', action.payload);
      } else {
        localStorage.removeItem('authToken');
      }
      return { ...state, token: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('authToken');
      return { ...state, user: null, token: null };
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
