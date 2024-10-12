import { useState } from "react";
import { useReviewStore } from "../../store/reviewStore";
import { useBookStore } from "../../store/bookStore";

const ReviewsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const reviewsStore = useReviewStore((state) => state.reviews);
  const { books } = useBookStore(); // Getting books from the bookstore

  const handleImageClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  // Getting reviews based on the id of the selectedBook
  const reviews = selectedBook ? reviewsStore[selectedBook._id] || [] : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl text-blue-700 font-bold mb-4 pt-10 pb-5">
        Book Reviews
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-gray-100 p-10 rounded-md cursor-pointer text-center"
            onClick={() => handleImageClick(book)}
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-44 h-55 rounded-md mx-auto"
            />
            <h2 className="text-lg font-bold mt-2 text-blue-600">{book.title}</h2>
            <p className="text-grey-600">{book.authorName}</p>
          </div>
        ))}
      </div>

      {showModal && selectedBook && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center">
          <div className="bg-white p-8 md:p-12 lg:p-16 rounded-lg shadow-lg transition-transform transform scale-105">
            <h2 className="text-2xl font-bold mb-6 text-gray-600">
              {selectedBook.title} Reviews
            </h2>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-5 rounded-md mb-4 shadow-sm"
                >
                  <p className="text-blue-500">{review}</p>
                </div>
              ))
            ) : (
              <p className="text-blue-500">No reviews yet for this book</p>
            )}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleCloseModal}
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
