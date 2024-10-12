/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/ui/Input";
import { LuArrowLeft, LuLoader, LuMail } from "react-icons/lu";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      toast.error(`${error.response?.data.message}`, {
        position: "top-center",
        duration: 4000,
        style: {
          backgroundColor: "black",
          color: "white",
          width: "fit-content",
        },
      });
    }
  };

  return (
    <div className="h-[705px] flex items-center justify-center">
      <div className="mx-auto max-w-md w-full bg-gray-300 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-500 text-transparent bg-clip-text">
            Forgot Password
          </h2>

          {!isSubmitted ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <p className="text-gray-800 mb-6 text-center">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
              <Input
                icon={LuMail}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-blue-600
						hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
						focus:ring-offset-gray-900 transition duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LuLoader className="size-6 animate-spin mx-auto" />
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <LuMail className="h-8 w-8 text-white" />
              </motion.div>
              <p className="text-gray-800 mb-6">
                If an account exists for {email}, you will receive a password
                reset link shortly.
              </p>
            </div>
          )}
        </div>

        <div className="px-8 py-4 bg-gray-300 bg-opacity-50 flex justify-center">
          <Link
            to={"/login"}
            className="text-sm text-blue-700 hover:underline flex items-center"
          >
            <LuArrowLeft className="h-4 w-4 mr-2" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ForgotPasswordPage;
