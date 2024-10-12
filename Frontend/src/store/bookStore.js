import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../config/axios";

export const useBookStore = create((set, get) => ({
  books: [],
  authorBooks: [],
  wishList: [],
  userOrders: [],
  loading: false,

  getAllBooks: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/books");
      set({ books: response.data.books, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch books", loading: false });
      toast.error(error.response.data.error || "Failed to fetch books");
    }
  },

  getAuthorBooks: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/books/author-books");
      set({ authorBooks: response.data.authorBooks, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch books", loading: false });
      toast.error(error.response.data.error || "Failed to fetch books");
    }
  },

  getWishList: async () => {
    try {
      const res = await axios.get("/books/wishlist");
      set({ wishList: res.data });
    } catch (error) {
      set({ wishList: [] });
      toast.error(error.response.data.message || "An error occurred", {
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });
    }
  },

  getUserOrders: async () => {
    try {
      const res = await axios.get("/payments/orders");
      set({ userOrders: res.data });
    } catch (error) {
      set({ userOrders: [] });
      toast.error(error.response.data.message || "An error occurred", {
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });
    }
  },

  addBook: async (bookData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/books", bookData);
      set((prevState) => ({
        books: [...prevState.books, res.data.book],
        loading: false,
      }));
      toast.success("Book added successfully", {
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });
    } catch (error) {
      toast.error(
        error.response.status == 413
          ? "The uploaded image exceeds the allowed size limit. Please ensure that the image size is less than 100 KB"
          : error.message,
        {
          style: {
            backgroundColor: "black",
            color: "white",
          },
          duration: 5000,
        }
      );
      set({ loading: false });
    }
  },

  editBook: async (bookId, bookData) => {
    set({ loading: true });
    try {
      await axios.put(`/books/${bookId}`, bookData);
      set({ loading: false });
      get().getAuthorBooks();
      get().getAllBooks();
      toast.success("Book updated successfully", {
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });
    } catch (error) {
      toast.error(
        error.response.status == 413
          ? "The uploaded image exceeds the allowed size limit. Please ensure that the image size is less than 100 KB"
          : error.message,
        {
          style: {
            backgroundColor: "black",
            color: "white",
          },
          duration: 5000,
        }
      );
      set({ loading: false });
    }
  },

  updateReviews: async (bookId) => {
    try {
      const res = await axios.put(`/books/update-reviews/${bookId}`);
      toast.success(res.data.message, {
        style: {
          backgroundColor: "black",
          color: "white",
        },
      });
      get().getAllBooks();
      get().getWishList();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      set({ loading: false });
    }
  },

  deleteBook: async (bookId) => {
    set({ loading: true });
    try {
      await axios.delete(`/books/${bookId}`);
      set((prevBooks) => ({
        books: prevBooks.books.filter((book) => book._id !== bookId),
        loading: false,
      }));
      set((prevBooks) => ({
        authorBooks: prevBooks.authorBooks.filter(
          (book) => book._id !== bookId
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.error || "Failed to delete product");
    }
  },
}));
