import { LuLoader } from "react-icons/lu";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useForm } from "react-hook-form";
import { registerSchema } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { REGISTER_FORM } from "../data/index";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import toast from "react-hot-toast";
import { useState } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { signup, isLoading } = useAuthStore();
  const [role, setRole] = useState("user");

  const handleSignUp = async (data) => {
    try {
      await signup({ ...data, role });
      toast.success(
        "You will navigate to the verify email page after 1 seconds to login!",
        {
          position: "top-center",
          duration: 1000,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        }
      );
      setTimeout(() => {
        navigate("/verify-email");
      }, 1000);
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
  const renderRegisterForm = REGISTER_FORM.map((input, idx) => (
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
        <img src="welcome.svg" className="w-[50%] h-full" />
        <div
          className="mx-auto max-w-md w-full bg-gray-300 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden m-5"
        >
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-500 text-transparent bg-clip-text">
              Create Account
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
              {renderRegisterForm}
              <Button
                className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-gray-200 to-gray-300  
						font-bold rounded-lg shadow-lg hover:from-gray-300
						hover:to-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
						transition duration-200"
                type="button"
                style={{ color: "#2563eb" }}
                onClick={() => setRole(role == "author" ? "user" : "author")}
              >
                {role == "author" ? (
                  <div className="flex items-center justify-center gap-2">
                    {"Join As Author"}
                    <IoMdCheckmarkCircleOutline size={24} />
                  </div>
                ) : (
                  "Join As Author"
                )}
              </Button>
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
                  "Sign Up"
                )}
              </Button>
            </form>
          </div>
          <div className="px-8 py-4 bg-gray-300 bg-opacity-50 flex justify-center">
            <p className="text-sm text-gray-800">
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-400 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
