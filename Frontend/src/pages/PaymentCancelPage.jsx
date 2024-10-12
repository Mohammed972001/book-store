import { LuArrowLeft, LuXCircle } from "react-icons/lu";
import { Link } from "react-router-dom";

const PaymentCancelPage = () => {
  return (
    <div className="h-[705px] flex items-center justify-center">
      <div className="max-w-md w-full bg-gray-300 rounded-lg shadow-xl overflow-hidden relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <LuXCircle className="text-red-500 w-16 h-16 mb-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-red-500 mb-2">
            Purchase Cancelled
          </h1>
          <p className="text-gray-800 text-center mb-6">
            Your order has been cancelled. No charges have been made.
          </p>
          <div className="bg-gray-400 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-800 text-center">
              If you encountered any issues during the checkout process, please
              don&apos;t hesitate to contact our support team.
            </p>
          </div>
          <div className="space-y-4">
            <Link
              to={"/"}
              className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
            >
              <LuArrowLeft className="mr-2" size={18} />
              Return to Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;
