import { useParams } from "react-router-dom";
import { useState } from "react";
import { useBookStore } from "./../../store/bookStore";
import {
  BsCalendar3,
  BsCartPlus,
  BsFileEarmarkBreak,
  BsGlobe,
} from "react-icons/bs";
import { useCartStore } from "../../store/cartStore";
import { useReviewStore } from "../../store/reviewStore";
import toast from "react-hot-toast";
import { parseingDate } from "./../../utils/index";

const BookPage = () => {
  const { books } = useBookStore();
  const { id } = useParams();
  const { addToCart } = useCartStore();
  const addReview = useReviewStore((state) => state.addReview);
  const book = books.find((b) => b._id === id);

  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState("");

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    addReview(book._id, reviewText);
    setReviewText("");
    setShowModal(false);
  };

  return (
    <div className="min-h-[705px] container mx-auto px-4 py-12 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/4 p-4">
            {" "}
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-3/4 p-8 flex flex-col justify-between">
            {" "}
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {book.title}
              </h1>
              <div className="text-lg text-gray-500 mb-8">
                <span>by </span>
                <span className="font-semibold text-gray-700">
                  {book.authorName}
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">
                {book.description}
              </p>

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() =>
                    book.inStock
                      ? addToCart(book)
                      : toast.error("Book is out of stock", {
                          style: {
                            backgroundColor: "black",
                            color: "white",
                          },
                        })
                  }
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center space-x-2"
                >
                  <BsCartPlus />
                  <span>Add To Cart</span>
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105"
                >
                  Give a Review
                </button>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <BsFileEarmarkBreak className="text-gray-600 text-xl" />
                <div>
                  <small className="text-gray-500">Print Length</small>
                  <p className="text-gray-700 font-semibold">
                    {book.printLength} pages
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <BsGlobe className="text-gray-600 text-xl" />
                <div>
                  <small className="text-gray-500">Language</small>
                  <p className="text-gray-700 font-semibold">{book.language}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <BsCalendar3 className="text-gray-600 text-xl" />
                <div>
                  <small className="text-gray-500">Publication Date</small>
                  <p className="text-gray-700 font-semibold">
                    {parseingDate(book.PublicationDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg transform transition-all">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Write a Review
            </h2>
            <form onSubmit={handleReviewSubmit}>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review here..."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 transition-all"
                rows="5"
              />
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-all"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookPage;
