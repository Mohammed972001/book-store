import { Toaster } from "react-hot-toast";
import router from "./router/index";
import { RouterProvider } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import { useCartStore } from "./store/cartStore";
import { useBookStore } from "./store/bookStore";

function App() {
  const { isCheckingAuth, checkAuth, user } = useAuthStore();
  const { getCartItems } = useCartStore();
  const { getWishList, getAllBooks } = useBookStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    getAllBooks();
    if (!user) return;
    getCartItems();
    getWishList();
  }, [getAllBooks, getCartItems, getWishList, user]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;

// 4000056655665556
