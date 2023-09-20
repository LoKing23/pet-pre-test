import { Product } from './../types';
// useStagingStore.ts
import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

export type StagingProduct = {
    quantity: number;
} & Product;

// 定義狀態的型別
type State = {
    productsMap: { [key: string]: StagingProduct },
    transactions: Map<string, StagingProduct>;
}

// 定義操作的型別
type Actions = {
    addProduct: (product: Product) => void,
    setProductQuantity: (id: string, quantity: number) => void,
    clearStaging: () => void,
}

// 定義存儲的型別，將狀態和操作組合起來
type StagingStore = State & Actions;

// 創建存儲並指定型別
const createStagingStore: StateCreator<StagingStore> = (set, get) => ({
  productsMap: {},
  transactions: new Map(),
  addProduct: (product) => {
    const { productsMap } = get();
    const draft = structuredClone(productsMap);
    const hasProduct = draft.hasOwnProperty(product.id);

    console.log({
      product,
      productsMap,
      draft,
      hasProduct,
    })

    if (hasProduct) {
      draft[product.id].quantity++;
    } else {
      draft[product.id] = {
        ...product,
        quantity: 1,
      };
    }

    set({ productsMap: draft });
  },
  setProductQuantity: (id, quantity) => {
    const { productsMap } = get();
    const draft = structuredClone(productsMap);
    const hasProduct = draft.hasOwnProperty(id);

    console.log('setProductQuantity', id, quantity, hasProduct);
    

    if (hasProduct) {

      quantity <= 0 
        ? delete draft[id] 
        : (draft[id].quantity = quantity);
      
      set({ productsMap: draft }); 
    }
  },
  clearStaging: () => {
    set({ productsMap: {} });
  }

});

// 使用 persist 函式將存儲持久化
const persistedStagingStore = persist<StagingStore>(
  createStagingStore,
  {
    name: 'staging-storage',
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
  }
  }
);

const useStagingStore = create(persistedStagingStore);

export default useStagingStore;
