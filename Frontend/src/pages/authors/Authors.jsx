import { useEffect, useState } from "react";
import { authors } from "../../data/authors";
import { useBookStore } from "../../store/bookStore";
import { Link } from "react-router-dom"; 

const Authors = () => {
  const [search, setSearch] = useState("");
  const { books } = useBookStore();

  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const handleAuthorClick = (authorName) => {
    setSelectedAuthor(authorName);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedAuthor(null);
  };

  useEffect(() => {
    setAuthorBooks(
      [...books].filter((book) => book.authorName === selectedAuthor)
    );
  }, [books, selectedAuthor]);

  return (
    <section className="p-5 bg-gray-100">
      <div className="mb-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          placeholder="Search authors"
          className="w-full p-2 rounded border border-gray-300"
        />
      </div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {authors
          .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
          .map((author) => (
            <div
              className="bg-white border border-gray-300 rounded-lg p-3 w-64 h-56 cursor-pointer hover:scale-105 transition-transform"
              key={author.id}
              onClick={() => handleAuthorClick(author.name)}
            >
              <img
                src={author.image}
                alt={author.name}
                className="w-full h-40 rounded-lg object-cover"
              />
              <h2 className="text-center text-lg font-semibold mt-4 mb-2">
                {author.name}
              </h2>
            </div>
          ))}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-lg w-80 relative">
            <span
              className="absolute top-3 right-3 cursor-pointer text-2xl p-2 hover:text-red-500"
              onClick={handleClosePopup}
            >
              ×
            </span>
            <h2 className="text-lg mb-4 text-blue-600">
              {selectedAuthor}&apos;s Books
            </h2>
            <div className="flex flex-col gap-5">
              {authorBooks && authorBooks.length > 0 ? (
                authorBooks.map((book) => (
                  <div key={book._id} className="flex items-center gap-3">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-20 h-30 object-cover rounded-md"
                    />
                    <div className="flex flex-col">
                  
                      
                      <Link
                        to={`/book/${book._id}`} // Link to the book details
                        className="bg-blue-600 text-white ml-10 px-8 py-1 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 flex items-center space-x-1 mt-2"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>No books found for this author.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Authors;