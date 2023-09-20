// useSearchParamsStore.ts
import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

export type SearchParams = {
    keyword: string;
    limit: number;
    offset: number;
    [key: string]: string | number;
}

// 定義狀態的型別
export type State = {
    params: {
        [key: string]: SearchParams;
    },
    transactions: Map<string, SearchParams>;
}

// 定義操作的型別
type Actions = {
    setParams: (key: string, params: SearchParams) => void;
}

// 定義存儲的型別，將狀態和操作組合起來
type SearchParamsStore = State & Actions;

const DEFAULT_SEARCH_PARAMS = { keyword: '', limit: 100, offset: 0 }

// 創建存儲並指定型別
const createSearchParamsStore: StateCreator<SearchParamsStore> = (set, get) => ({
    params: { products: DEFAULT_SEARCH_PARAMS },
    transactions: new Map(),
    setParams: (key, params) => {
        set((state) => ({
            params: {
                ...structuredClone(state.params),
                [key]: params,
            },
        }));
    },
});

// 使用 persist 函式將存儲持久化
const persistedSearchParamsStore = persist<SearchParamsStore>(
  createSearchParamsStore,
  {
    name: 'search-params-storage',
    storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name) || 'default';
          return {
            state: {
              ...JSON.parse(str).state,
              transactions: new Map(JSON.parse(str).state.transactions),
            },
          }
        },
        setItem: (name, newValue) => {
          const str = JSON.stringify({
            state: {
              ...newValue.state,
              transactions: Array.from(newValue.state.transactions.entries()),
            },
          })
          localStorage.setItem(name, str)
        },
        removeItem: (name) => localStorage.removeItem(name),
    },
  }
);

const useSearchParamsStore = create(persistedSearchParamsStore);

export default useSearchParamsStore;
