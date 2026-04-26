import { useContext } from 'react';
import { StoreContext } from './StoreProvider';

export function useStore<T>(selector: (state: any) => T): [T, React.Dispatch<any>] {
  const { state, dispatch } = useContext(StoreContext);
  return [selector(state), dispatch];
}
