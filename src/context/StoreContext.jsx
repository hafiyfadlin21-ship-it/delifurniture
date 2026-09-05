import { createContext, useContext, useEffect, useMemo, useState } from "react";

const StoreContext = createContext(null);
const KEY = "heim-store-v1";

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { cart: [], list: [], user: null, postcode: "" };
    return JSON.parse(raw);
  } catch {
    return { cart: [], list: [], user: null, postcode: "" };
  }
}

export function StoreProvider({ children }) {
  const [state, setState] = useState(load);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  const api = useMemo(() => {
    const cartCount = state.cart.reduce((n, i) => n + i.qty, 0);
    const cartTotal = state.cart.reduce((n, i) => n + i.price * i.qty, 0);

    return {
      ...state,
      cartCount,
      cartTotal,
      setPostcode: (postcode) => setState((s) => ({ ...s, postcode })),
      login: (user) => setState((s) => ({ ...s, user })),
      logout: () => setState((s) => ({ ...s, user: null })),
      addToCart: (product, extras = {}) =>
        setState((s) => {
          const color = extras.color || product.colors[0];
          const key = `${product.id}|${color}`;
          const existing = s.cart.find((i) => i.key === key);
          const item = {
            key,
            id: product.id,
            name: product.name,
            type: product.type,
            image: product.image,
            price: product.price,
            color,
            qty: extras.qty || 1,
          };
          if (existing) {
            return {
              ...s,
              cart: s.cart.map((i) =>
                i.key === key ? { ...i, qty: i.qty + item.qty } : i
              ),
            };
          }
          return { ...s, cart: [...s.cart, item] };
        }),
      setQty: (key, qty) =>
        setState((s) => ({
          ...s,
          cart:
            qty < 1
              ? s.cart.filter((i) => i.key !== key)
              : s.cart.map((i) => (i.key === key ? { ...i, qty } : i)),
        })),
      removeFromCart: (key) =>
        setState((s) => ({ ...s, cart: s.cart.filter((i) => i.key !== key) })),
      clearCart: () => setState((s) => ({ ...s, cart: [] })),
      toggleList: (product) =>
        setState((s) => {
          const exists = s.list.some((i) => i.id === product.id);
          return {
            ...s,
            list: exists
              ? s.list.filter((i) => i.id !== product.id)
              : [
                  ...s.list,
                  {
                    id: product.id,
                    name: product.name,
                    type: product.type,
                    image: product.image,
                    price: product.price,
                  },
                ],
          };
        }),
      inList: (id) => state.list.some((i) => i.id === id),
    };
  }, [state]);

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
