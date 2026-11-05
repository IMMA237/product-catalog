import { create } from 'zustand';

// Global cart state (React PDF, Module 9.2). Any component can read it
// directly, with no props passed down and no Provider needed.
const useCartStore = create((set) => ({
  items: [], // each item: { id, name, price, emoji, quantity }

  // Add a product, or increase its quantity if it is already in the cart
  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        // Immutable update: build a NEW array and a NEW object (Module 4.4)
        return {
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }

      const { id, name, price, emoji } = product;
      return { items: [...state.items, { id, name, price, emoji, quantity: 1 }] };
    }),

  // Remove a product completely
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

  // Empty the cart
  clearCart: () => set({ items: [] }),
}));

export default useCartStore;