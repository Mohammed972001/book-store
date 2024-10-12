import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/ui/Input";
import { LuLock } from "react-icons/lu";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, isLoading, message } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
        duration: 4000,
        style: {
          backgroundColor: "black",
          color: "white",
          width: "fit-content",
        },
      });
      return;
    }
    try {
      await resetPassword(token, password);
      toast.success(
        "Password reset successfully, redirecting to login page...",
        {
          position: "top-center",
          duration: 500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        }
      );
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error resetting password");
    }
  };

  return (
    <div className="min-h-[705px] flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row items-center justify-center w-[100%] h-full">
        <img src="../reset-password.svg" className="w-[50%] h-full" />
        <div
          className="mx-auto max-w-md w-full bg-gray-300 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			    overflow-hidden m-5"
        >
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-500 text-transparent bg-clip-text">
              Reset Password
            </h2>
            {message && <p className="text-blue-500 text-sm mb-4">{message}</p>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                icon={LuLock}
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Input
                icon={LuLock}
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Set New Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResetPasswordPage;
