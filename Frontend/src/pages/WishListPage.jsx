import { Link } from "react-router-dom";
import Rating from "../components/book-slider/Rating";
import { useBookStore } from "../store/bookStore";

export default function WishListPage() {

  const { wishList, updateReviews } = useBookStore();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Your Book Wish List
        </h1>

        {wishList.length > 0 ? (
          <ul className="space-y-6">
            {wishList.map((book) => (
              <li
                key={book._id}
                className="bg-gray-100 p-4 rounded-lg flex justify-between items-center"
              >
                <div className="w-20 h-20 flex-shrink-0 mr-4">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-grow">
                  <p className="font-medium mb-1">{book.title}</p>
                  <Rating rating={book.rating} />
                </div>
                <div className="flex flex-col items-center">
                  <i
                    className="fa fa-heart text-red-500 text-xl hover:scale-150 transition-all duration-100  w-fit"
                    onClick={() => updateReviews(book._id)}
                  ></i>
                  <Link
                    to={`/book/${book._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Book
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">Your wish list is empty.</p>
        )}
      </div>
    </div>
  );
}
