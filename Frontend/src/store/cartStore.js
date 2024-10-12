import { create } from "zustand";
import axios from "../config/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  total: 0,
  subtotal: 0,

  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      set({ cart: res.data });
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      toast.error(error.response.data.message || "An error occurred", {
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });
    }
  },

  clearCart: async () => {
    set({ cart: [], coupon: null, total: 0, subtotal: 0 });
    get().removeFromCart();
  },

  addToCart: async (book) => {
    try {
      await axios.post("/cart", { bookId: book._id });
      toast.success("Book added to cart", {
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });
      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item._id === book._id
        );
        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === book._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...prevState.cart, { ...book, quantity: 1 }];
        return { cart: newCart };
      });
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred", {
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });
    }
  },

  removeFromCart: async (bookId) => {
    await axios.delete(`/cart`, { data: { bookId } });
    set((prevState) => ({
      cart: prevState.cart.filter((item) => item._id !== bookId),
    }));
    get().calculateTotals();
  },

  updateQuantity: async (bookId, quantity) => {
    if (quantity === 0) {
      get().removeFromCart(bookId);
      return;
    }
    await axios.put(`/cart/${bookId}`, { quantity });
    set((prevState) => ({
      cart: prevState.cart.map((item) =>
        item._id === bookId ? { ...item, quantity } : item
      ),
    }));
    get().calculateTotals();
  },

  calculateTotals: () => {
    const { cart } = get();
    const subtotal = cart.reduce(
      (sum, book) => sum + book.price * book.quantity,
      0
    );
    let total = subtotal;
    set({ subtotal, total });
  },
}));
