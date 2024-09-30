import { create } from 'zustand';

export const useCartStore = create((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  addItem: (item) => set((state) => {
    const existingItem = state.items.find(i => i.id === item.id);
    if (existingItem) {
      return {
        items: state.items.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      };
    } else {
      return { items: [...state.items, { ...item, quantity: 1 }] };
    }
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  clearCart: () => set({ items: [] }),
  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map(item =>
      item.id === id ? { ...item, quantity } : item
    )
  })),
}));


export const useQuantityStore = create((set) => ({
  quantity: 1,
  
  incrementQuantity: () =>
    set((state) => ({
      quantity: state.quantity + 1,
    })),
  
  decrementQuantity: () =>
    set((state) => ({
      quantity: state.quantity > 1 ? state.quantity - 1 : state.quantity,
    })),
    
   resetQuantity: () =>
    set(() => ({
      quantity: 1,
    })),
}));

export const useSearchState = create((set) => ({
  open: false,
  
  setOpen: () => 
    set((state) => ({
    open: !state.open,
  })),
  
  
}));
