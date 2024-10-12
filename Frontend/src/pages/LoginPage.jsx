/* eslint-disable react/no-unescaped-entities */
import { LuLoader } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useForm } from "react-hook-form";
import { loginSchema } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { LOGIN_FORM } from "../data/index";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { login, isLoading } = useAuthStore();

  const handleLogin = async (data) => {
    try {
      await login(data);
      toast.success(
        "You will navigate to the home page after 2 seconds to login!",
        {
          position: "top-center",
          duration: 1500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        }
      );
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Network Error, Please try again later!", {
          position: "top-center",
          duration: 4000,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });
      } else {
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
    }
  };
  // ** Renders
  const renderRegisterForm = LOGIN_FORM.map((input, idx) => (
    <div key={idx}>
      <Input
        icon={input.icon}
        type={input.type}
        placeholder={input.placeholder}
        {...register(`${input.name}`, input.validation)}
      />
      {errors[input.name] && (
        <InputErrorMessage msg={errors[input.name]?.message} />
      )}
    </div>
  ));

  return (
    <div className="min-h-[705px] flex items-center justify-center bg-gray-100">
      <div className="flex flex-col md:flex-row items-center justify-center w-[100%] h-full">
        <img src="../login.svg" className="w-[50%] h-full" />
        <div
          className="mx-auto max-w-md w-full bg-gray-300 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden m-5"
        >
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-500 text-transparent bg-clip-text">
              Welcome Back
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
              {renderRegisterForm}
              <div className="flex items-center mb-6">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-blue-600
						hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
						focus:ring-offset-gray-900 transition duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LuLoader className="animate-spin mx-auto" size={24} />
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </div>
          <div className="px-8 py-4 bg-gray-300 bg-opacity-50 flex justify-center">
            <p className="text-sm text-gray-800">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-400 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
