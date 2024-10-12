import { useEffect } from "react";
import { useBookStore } from "../store/bookStore";
import { parseingDate } from "../utils";
import { Link } from "react-router-dom";

export default function OrdersHistoryPage() {
  const { getUserOrders, userOrders } = useBookStore();

  useEffect(() => {
    getUserOrders();
  }, [getUserOrders]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Your Order History
        </h1>

        {userOrders.length > 0 ? (
          <ul className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Order History
            </h3>
            <ul className="mt-4 space-y-4">
              {userOrders.map((order) => (
                <li
                  key={order._id}
                  className="bg-gray-100 p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">Order #{order._id}</p>
                    <p className="text-gray-500 text-sm">
                      Delivered on {parseingDate(order.createdAt)}
                    </p>
                  </div>
                  <Link
                    to={`/order/${order._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                </li>
              ))}
            </ul>
          </ul>
        ) : (
          <p className="text-center text-gray-600">
            You have no previous orders.
          </p>
        )}
      </div>
    </div>
  );
}
