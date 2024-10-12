import Rating from "./book-slider/Rating";
import { useCartStore } from "../store/cartStore";
import { BsCartPlus } from "react-icons/bs";
import { useAuthStore } from "./../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useBookStore } from "../store/bookStore";

const BookCard = ({ book, handleOpenModal }) => {
  const { user } = useAuthStore();
  const { addToCart } = useCartStore();
  const { updateReviews, wishList } = useBookStore();
  const navigate = useNavigate();
  const isWishlisted = user
    ? wishList.find((item) => item._id === book._id)
    : false;
  return (
    <div>
      <div className="flex flex-col items-center justify-center ">
        <div className="container">
          <div className="w-[340px] h-[600px] mx-[10px] bg-gray-100 shadow-lg rounded-xl p-6">
            <div className="flex flex-col">
              <div>
                <div className="relative w-full mb-3">
                  <div className="absolute flex flex-col top-[-10px] right-[5px] p-3">
                    <button
                      className={`transition ease-in duration-300 bg-gray-800  hover:text-red-700 shadow hover:shadow-md ${
                        isWishlisted ? "text-red-500" : "text-gray-500"
                      }  rounded-full w-8 h-8 text-center p-1`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={() =>
                          user ? updateReviews(book._id) : navigate("/login")
                        }
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-[400px] object-contain"
                  />
                </div>
                <div className="flex-auto justify-evenly">
                  <div className="flex flex-wrap ">
                    <div className="flex items-center w-full justify-between min-w-0 ">
                      <h2 className="text-lg mr-auto cursor-pointer text-gray-800 hover:text-blue-500 truncate font-bold">
                        {book.title}
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xl text-blue-500 font-semibold mt-1">
                      ${book.price}
                    </div>
                    <div className="text-sm text-gray-600 font-bold">
                      {book.inStock ? (
                        <div className="flex items-center bg-green-500 text-white text-xs px-2 py-1 ml-3 rounded-lg">
                          INSTOCK
                        </div>
                      ) : (
                        <div className="flex items-center bg-red-500 text-white text-xs px-2 py-1 ml-3 rounded-lg">
                          OUT OF STOCK
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="lg:flex py-2 text-sm text-gray-600">
                    <div className="flex-1 inline-flex items-center  mb-2">
                      <Rating rating={book.rating} />
                    </div>
                    <div className="text-sm text-gray-600 font-bold">
                      <span>{book.reviews} reviews</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 text-sm font-medium justify-between">
                  <button
                    onClick={() => {
                      if (user) {
                        if (book.inStock) {
                          addToCart(book);
                        } else {
                          toast.error("Book is out of stock", {
                            style: {
                              backgroundColor: "black",
                              color: "white",
                            },
                          });
                        }
                      } else {
                        navigate("/login");
                      }
                    }}
                    className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-blue-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-blue-600 "
                  >
                    <BsCartPlus size={20} className="mx-1" />
                    <span>Add Cart</span>
                  </button>
                  <button
                    onClick={() => handleOpenModal(book)}
                    className="transition ease-in duration-300 bg-gray-700 hover:bg-gray-800 border hover:border-gray-500 border-gray-700 hover:text-white  hover:shadow-lg text-gray-400 rounded-full w-9 h-9 text-center p-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className=""
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
