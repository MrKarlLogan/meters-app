import { RootStore, IRootStore } from './models/RootStore';
import { createContext, useContext } from 'react';

let store: IRootStore | null = null;

export const initializeStore = (): IRootStore => {
  if (!store) {
    store = RootStore.create({});
  }
  return store;
};

export const RootStoreContext = createContext<IRootStore>({} as IRootStore);

export const useStore = (): IRootStore => {
  const store = useContext(RootStoreContext);
  if (!store) {
    throw new Error(
      'useStore должен использоваться внутри RootStoreContext.Provider'
    );
  }
  return store;
};
