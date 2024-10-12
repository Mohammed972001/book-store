import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import Cartbook from "../../pages/cart/CartItem"; 
import { LuShoppingCart } from "react-icons/lu";
import OrderSummary from "./OrderSummary";

const CartPage = () => {
  const { cart } = useCartStore();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow py-8 md:py-16 overflow-y-auto">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              {cart.length === 0 ? (
                <EmptyCartUI />
              ) : (
                <div className="space-y-6">
                  {cart.map((book) => (
                    <Cartbook key={book._id} book={book} />
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <OrderSummary />
              </div>
            )}
          </div>
        </div>
      </div>
    
    </div>
  );
};

const EmptyCartUI = () => (
  <div className="flex flex-col items-center justify-center space-y-4 py-16">
    <LuShoppingCart className="h-24 w-24 text-gray-600" />
    <h3 className="text-2xl font-semibold">Your cart is empty</h3>
    <p className="text-gray-600">
      Looks like you {"haven't"} added anything to your cart yet.
    </p>
    <Link
      className="mt-4 rounded-md bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
      to="/"
    >
      Start Shopping
    </Link>
  </div>
);

export default CartPage;
