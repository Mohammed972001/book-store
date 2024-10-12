import { FaTruck, FaGift, FaUndoAlt, FaEnvelope } from "react-icons/fa";

const Services = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-around items-center">
        <div className="flex flex-col items-center text-center p-6 hover:scale-105 text-gray-600 hover:text-blue-500 transition-transform">
          <FaTruck size={40} className="mb-4" />
          <b className="text-lg">Free Shipping</b>
        </div>
        <div className="flex flex-col items-center text-center p-6 hover:scale-105 text-gray-600 hover:text-blue-500 transition-transform">
          <FaGift size={40} className="mb-4" />
          <b className="text-lg">Gift Card</b>
        </div>
        <div className="flex flex-col items-center text-center p-6 hover:scale-105 text-gray-600 hover:text-blue-500 transition-transform">
          <FaUndoAlt size={40} className="mb-4" />
          <b className="text-lg">7 Days Return</b>
        </div>
        <div className="flex flex-col items-center text-center p-6 hover:scale-105 text-gray-600 hover:text-blue-500 transition-transform">
          <FaEnvelope size={40} className="mb-4" />
          <b className="text-lg">Contact Us</b>
        </div>
      </div>
    </div>
  );
};

export default Services;
