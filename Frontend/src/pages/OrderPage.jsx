import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../config/axios";
import { parseingDate } from "./../utils/index";

const OrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});

  const getOrder = async () => {
    const res = await axios.get(`/payments/orders/${id}`);
    setOrder(res.data);
  };

  useEffect(() => {
    getOrder();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8 print:p-0">
          {" "}
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Order Details
          </h2>
          <div className="mb-6">
            <p className="text-gray-700 mb-2">
              <strong>Order ID:</strong> {order._id}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Order Date:</strong> {parseingDate(order.createdAt)}
            </p>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Books Ordered
            </h3>
            <div className="space-y-4">
              {order.books &&
                order.books.map((book) => (
                  <div
                    key={book._id}
                    className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                  >
                    <div className="w-24 h-32 flex-shrink-0 mr-4">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="text-lg font-medium text-gray-800">
                        {book.title}
                      </p>
                      <p className="text-gray-600">by {book.authorName}</p>
                      <p className="text-gray-600">Quantity: {book.quantity}</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-blue-600">
                        ${book.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Order Summary
            </h3>
            <div className="flex justify-between text-gray-700 mb-2">
              <p>Subtotal:</p>
              <p>${order.totalAmount}</p>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <p>Shipping Cost:</p>
              <p>${5}</p>
            </div>
            <div className="flex justify-between text-gray-800 font-bold text-lg">
              <p>Total:</p>
              <p>${order.totalAmount + 5}</p>
            </div>
          </div>
          <div className="mt-8 flex justify-center print:hidden">
            {" "}
            <button
              onClick={handlePrint}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition duration-200"
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
