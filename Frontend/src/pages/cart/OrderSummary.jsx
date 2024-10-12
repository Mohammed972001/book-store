import { useCartStore } from "../../store/cartStore";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../../config/axios";
import { LuMoveRight } from "react-icons/lu";

const stripePromise = loadStripe(
  "pk_test_51Pmi7dHY9C3R0yqy9puSPfuVEVHBQAlrirSUg4IStjSpcl4EQvoPYdGsQCKRyDDCzP1qy9EBF2HQAfa9Is4WqRcY00T8egooja"
);

const OrderSummary = () => {
  const { total, subtotal, cart } = useCartStore();

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const res = await axios.post("/payments/create-checkout-session", {
      books: cart,
    });

    const session = res.data;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error("Error:", result.error);
    }
  };

  return (
    <div className="space-y-4 rounded-lg border border-gray-300 bg-gray-200 p-4 shadow-sm sm:p-6">
      <p className="text-xl font-semibold text-blue-600">Order summary</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-900">
              Original price
            </dt>
            <dd className="text-base font-medium text-blue-500">
              ${subtotal.toFixed(2)}
            </dd>
          </dl>
          <dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
            <dt className="text-base font-bold text-gray-900">Total</dt>
            <dd className="text-base font-bold text-blue-600">
              ${total.toFixed(2)}
            </dd>
          </dl>
        </div>

        <button
          className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={handlePayment}
        >
          Proceed to Checkout
        </button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-600">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 underline hover:text-blue-300 hover:no-underline"
          >
            Continue Shopping
            <LuMoveRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default OrderSummary;
