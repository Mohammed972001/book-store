import { useBookStore } from "../store/bookStore";
import { LuLoader, LuTrash, LuUpload } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { useEffect, useState } from "react";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import { useForm } from "react-hook-form";
import InputErrorMessage from "./ui/InputErrorMessage";
import { bookCategories, languages } from "../data/books";
import { parseingDate } from "./../utils/index";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";

const BooksList = () => {
  const { authorBooks, editBook, deleteBook, loading, getAuthorBooks } =
    useBookStore();

  const [newImage, setNewImage] = useState(null);
  const [selectedBook, setSelectedBook] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const closeEditModal = () => setIsEditOpen(false);
  const openEditModal = () => setIsEditOpen(true);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getAuthorBooks();
    if (selectedBook) {
      reset({
        title: selectedBook.title,
        price: selectedBook.price,
        printLength: selectedBook.printLength,
        category: selectedBook.category,
        language: selectedBook.language,
        PublicationDate: parseingDate(selectedBook.PublicationDate),
        description: selectedBook.description,
        image: selectedBook.image,
        inStock: selectedBook.inStock,
      });
    }
  }, [getAuthorBooks, reset, selectedBook]);

  const submit = async (data) => {
    try {
      await editBook(selectedBook._id, data);
      setSelectedBook({
        title: "",
        description: "",
        price: "",
        printLength: "",
        category: "",
        language: "",
        PublicationDate: "",
        image: "",
        inStock: selectedBook.inStock,
      });
      setNewImage(null);
      closeEditModal();
    } catch {
      console.log("error creating a product");
    }
  };

  const handleEditCloseModal = async (e) => {
    e.preventDefault();
    setSelectedBook({
      title: "",
      description: "",
      price: "",
      printLength: "",
      category: "",
      language: "",
      PublicationDate: "",
      image: "",
      inStock: selectedBook.inStock,
    });
    setNewImage(null);
    closeEditModal();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedBook({ ...selectedBook, image: reader.result });
        setNewImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
      <table className=" min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
            >
              Book
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-blue-500 divide-y divide-gray-300">
          {authorBooks?.map((book) => (
            <tr key={book._id} className="hover:bg-blue-600">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={book.image}
                      alt={book.title}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">
                      {book.title}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-white">
                  ${book.price.toFixed(2)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-white">{book.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-5">
                <button
                  onClick={() => {
                    setSelectedBook(book);
                    openEditModal();
                  }}
                  className="text-white hover:text-blue-200"
                >
                  <FaEdit className="h-6 w-6" />
                </button>
                <button
                  onClick={() => {
                    setSelectedBook(book);
                    openDeleteModal();
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  <LuTrash className="h-6 w-6" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isEditOpen}
        closeModal={closeEditModal}
        title={"Edit Book"}
        isEdit
      >
        <div className={`mx-auto ${selectedBook.image ? "w-full" : ""}`}>
          <div className="flex items-center justify-between gap-2">
            <div className="space-x-3 mt-4 w-full">
              <form className="space-y-2" onSubmit={handleSubmit(submit)}>
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
                  {errors.printLength &&
                    errors.printLength.type === "required" && (
                      <InputErrorMessage
                        msg={"Print Length is a required field"}
                      />
                    )}
                  {errors.printLength && errors.printLength.type === "min" && (
                    <InputErrorMessage
                      msg={"Print Length must be at least 50"}
                    />
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
                    {...register("category", {
                      required: "Category is required",
                    })}
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
                    {...register("language", {
                      required: "Language is required",
                    })}
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
                    {newImage && (
                      <span className="ml-3 text-blue-500">
                        Image uploaded{" "}
                      </span>
                    )}
                    <Button
                    width="w-fit"
                      onClick={() =>
                        setSelectedBook({
                          ...selectedBook,
                          inStock: !selectedBook.inStock,
                        })
                      }
                      className={`${
                        selectedBook.inStock
                          ? "bg-green-400 hover:bg-green-500"
                          : "bg-red-400 hover:bg-red-500"
                      }  p-2 ml-5`}
                      type="button"
                    >
                      {selectedBook.inStock ? (
                        <div className="flex items-center justify-center gap-2">
                          {"IN STOCK"}
                          <IoMdCheckmarkCircleOutline size={24} />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          {"OUT OF STOCK"}
                          <FaXmark size={24} />
                        </div>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    type="submit"
                    onClick={handleSubmit}
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
                      <>Edit Book</>
                    )}
                  </button>
                  <Button
                    type="button"
                    onClick={handleEditCloseModal}
                    className="bg-gray-400 hover:bg-gray-500 p-2 w-full"
                  >
                    Cansel
                  </Button>
                </div>
              </form>
            </div>
            {selectedBook.image && (
              <div className="ml-8">
                <img
                  src={newImage ? newImage : selectedBook.image}
                  className="min-w-80"
                />
              </div>
            )}
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        title="Are you sure you want to remove this book?"
        description="Deleting this book will remove it from your books. Any associated data, other related information will also be deleted. Please make sure this is the intended action."
      >
        <div className="flex items-center space-x-3 mt-4">
          <Button
            className="bg-red-700 hover:bg-red-800 p-2 w-full"
            onClick={() => {
              deleteBook(selectedBook._id);
              setSelectedBook({});
              closeDeleteModal();
            }}
          >
            Yes, remove
          </Button>
          <Button
            className="bg-gray-400 hover:bg-gray-500 p-2 w-full"
            onClick={closeDeleteModal}
          >
            Cancle
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default BooksList;
