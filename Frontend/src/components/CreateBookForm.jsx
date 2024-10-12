import { useState } from "react";
import { LuLoader, LuPlusCircle, LuUpload } from "react-icons/lu";
import { useBookStore } from "../store/bookStore";
import { useAuthStore } from "../store/authStore";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import { useForm } from "react-hook-form";
import InputErrorMessage from "./ui/InputErrorMessage";
import { bookCategories, languages } from "../data/books";

const CreateBookForm = () => {
  const { user } = useAuthStore();
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(null);
  const { addBook, loading } = useBookStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    if (!image) {
      setImageError("Please select a book cover image");
      return;
    } else {
      setImageError(null);
    }
    try {
      await addBook({
        ...data,
        image,
        authorId: user._id,
        authorName: user.name,
      });
      setImage(null);
      reset({
        title: "",
        price: "",
        printLength: "",
        category: "",
        language: "",
        PublicationDate: "",
        description: "",
      });
    } catch {
      console.log("error creating a product");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setImageError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`mx-auto ${
        image ? "w-full" : "max-w-lg w-full"
      } bg-gray-300 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden m-5`}
    >
      <div className="flex flex-col xl:flex-row items-center">
        <div className="p-8 w-full">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-500 text-transparent bg-clip-text">
            Add New Book
          </h2>

          <form onSubmit={handleSubmit(submit)} className="space-y-2">
            <div>
              <Input
                type="text"
                placeholder="Title"
                {...register("title", {
                  required: true,
                  pattern: /^\D+$/,
                  minLength: 5,
                })}
              />
              {errors.title && errors.title.type === "required" && (
                <InputErrorMessage msg={"Title is a required field"} />
              )}
              {errors.title && errors.title.type === "pattern" && (
                <InputErrorMessage
                  msg={"The title must contain only letters"}
                />
              )}
              {errors.title && errors.title.type === "minLength" && (
                <InputErrorMessage
                  msg={"Title should be at least 5 characters."}
                />
              )}
            </div>

            <div>
              <Input
                type="number"
                step="0.01"
                placeholder="Price"
                {...register("price", {
                  required: true,
                  min: 0,
                })}
              />
              {errors.price && errors.price.type === "required" && (
                <InputErrorMessage msg={"Price is a required field"} />
              )}
              {errors.price && errors.price.type === "min" && (
                <InputErrorMessage msg={"Price must be at least 0"} />
              )}
            </div>

            <div>
              <Input
                type="number"
                placeholder="Print Length"
                {...register("printLength", {
                  required: true,
                  min: 50,
                })}
              />
              {errors.printLength && errors.printLength.type === "required" && (
                <InputErrorMessage msg={"Print Length is a required field"} />
              )}
              {errors.printLength && errors.printLength.type === "min" && (
                <InputErrorMessage msg={"Print Length must be at least 50"} />
              )}
            </div>

            <div>
              <Input
                type="date"
                placeholder="Publication Date"
                {...register("PublicationDate", {
                  required: "Date is required",
                })}
              />
              {errors["date"] && (
                <InputErrorMessage msg={errors["date"].message} />
              )}
            </div>

            <div>
              <select
                {...register("category", { required: "Category is required" })}
                className="block w-full bg-gray-200 border border-gray-300 rounded-md
              shadow-sm py-2 px-3 text-gray-800 focus:outline-none 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a category</option>
                {bookCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors["category"] && (
                <InputErrorMessage msg={errors["category"].message} />
              )}
            </div>

            <div>
              <select
                {...register("language", { required: "Language is required" })}
                className="block w-full bg-gray-200 border border-gray-300 rounded-md
              shadow-sm py-2 px-3 text-gray-800 focus:outline-none 
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a language</option>
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
              {errors["language"] && (
                <InputErrorMessage msg={errors["language"].message} />
              )}
            </div>

            <div>
              <Textarea
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Description"
              />
              {errors["description"] && (
                <InputErrorMessage msg={errors["description"].message} />
              )}
            </div>
            <div>
              <div className="flex items-center">
                <input
                  id="image"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <label
                  htmlFor="image"
                  className="cursor-pointer bg-gray-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-800 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:border-blue-500 focus:ring-blue-500"
                >
                  <LuUpload className="h-5 w-5 inline-block mr-2 text-gray-800" />
                  Upload Image
                </label>
                {image && (
                  <span className="ml-3 text-blue-500">Image uploaded </span>
                )}
              </div>
              {imageError && <InputErrorMessage msg={imageError} />}
            </div>

            <button
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <>
                  <LuLoader
                    className="mr-2 h-5 w-5 animate-spin"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                <>
                  <LuPlusCircle className="mr-2 h-5 w-5" />
                  Add Book
                </>
              )}
            </button>
          </form>
        </div>
        {image && (
          <div className="p-8">
            <img src={image} className="min-w-96" />
          </div>
        )}
      </div>
    </div>
  );
};
export default CreateBookForm;
