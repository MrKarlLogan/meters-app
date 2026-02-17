import { RootStore } from './RootStore.store';
import { createContext, useContext } from 'react';

let store: RootStore | null = null;

export const initializeStore = (): RootStore => {
  if (!store) {
    store = new RootStore();
  }
  return store;
};

export const RootStoreContext = createContext<RootStore>({} as RootStore);

export const useStore = (): RootStore => {
  const store = useContext(RootStoreContext);

  if (!store) {
    throw new Error(
      'useStore должен использоваться внутри RootStoreContext.Provider'
    );
  }

  return store;
};
