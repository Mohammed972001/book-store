import { useAuthStore } from "../store/authStore";
import Input from "../components/ui/Input";
import { LuLock } from "react-icons/lu";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import Button from "./../components/ui/Button";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { changePassword, isLoading } = useAuthStore();

  const submit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
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
      await changePassword(data.oldPassword, data.newPassword);
      reset({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (e) {
      console.error(e);
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
              Change Password
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit(submit)}>
              <div>
                <Input
                  icon={LuLock}
                  type="password"
                  placeholder="Old Password"
                  {...register("oldPassword", {
                    required: true,
                  })}
                />
                {errors.oldPassword &&
                  errors.oldPassword.type === "required" && (
                    <InputErrorMessage
                      msg={"Old Password is a required field"}
                    />
                  )}
              </div>
              <div>
                <Input
                  icon={LuLock}
                  type="password"
                  placeholder="New Password"
                  {...register("newPassword", {
                    required: true,
                    pattern:
                      /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
                  })}
                />
                {errors.newPassword &&
                  errors.newPassword.type === "required" && (
                    <InputErrorMessage
                      msg={"New Password is a required field"}
                    />
                  )}
                {errors.newPassword &&
                  errors.newPassword.type === "pattern" && (
                    <InputErrorMessage
                      msg={
                        "Password must contain at least 8 characters, including uppercase letters, lowercase letters, numbers, and special characters."
                      }
                    />
                  )}
              </div>
              <div>
                <Input
                  icon={LuLock}
                  type="password"
                  placeholder="Confirm New Password"
                  {...register("confirmPassword", {
                    required: true,
                  })}
                />
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "required" && (
                    <InputErrorMessage
                      msg={"Confirm Password is a required field"}
                    />
                  )}
              </div>
              <Button
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Set New Password"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChangePassword;
