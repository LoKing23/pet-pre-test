import { Product } from './../types';
// useCartStore.ts
import { create, StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartProduct = {
    quantity: number;
} & Product;

// 定義狀態的型別
type State = {
    productsMap: { [key: string]: CartProduct },
}

// 定義操作的型別
type Actions = {
    addProduct: (product: CartProduct) => void,
    setProductQuantity: (id: string, quantity: number) => void,
    clearCart: () => void,
}

// 定義存儲的型別，將狀態和操作組合起來
type CartStore = State & Actions;

// 創建存儲並指定型別
const createCartStore: StateCreator<CartStore> = (set, get) => ({
  productsMap: {},
  addProduct: (product) => {
    const { productsMap } = get();
    const draft = structuredClone(productsMap);
    const hasProduct = draft.hasOwnProperty(product.id);

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

    if (hasProduct) {

      quantity <= 0 
        ? delete draft[id] 
        : (draft[id].quantity = quantity);
      
      set({ productsMap: draft }); 
    }

  },
  clearCart: () => {
    set({ productsMap: {} });
  }

});

// 使用 persist 函式將存儲持久化
const persistedCartStore = persist<CartStore>(
  createCartStore,
  {
    name: 'cart-storage',
  }
);

const useCartStore = create(persistedCartStore);

export default useCartStore;
