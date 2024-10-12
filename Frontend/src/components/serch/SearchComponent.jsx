import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';

const SearchComponent = ({ books }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const navigate=useNavigate();
 
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      const results = books.filter(book =>
        book.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredBooks(results);
    } else {
      setFilteredBooks([]);
    }
   
  };
  const handleClic = (id) => {
    navigate(`/book/${id}`);
  };
  


  return (
    <div className="fixed top-14 z-40   flex sm:justify-center md:justify-end w-full bg-white pb-1 md:pr-36 md:mt-4 lg:mt-3">
      <div className="relative flex items-center border-b-2 rounded-lg md:w-1/2 lg:w-1/5 hover:border hover:border-blue-500 pr-36 ">
        <span className="ml-2 text-gray-400">
          <CiSearch />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
          className="ml-2 p-2 w-full focus:outline-none"
        />
        
      {filteredBooks.length > 0 && (
        <div className="absolute top-11 left-0 right-0  bg-white shadow-lg rounded-lg z-10 p-4">
          <h4 className="text-gray-600 mb-2">Products</h4>
          <ul >
          {filteredBooks.map((book, index) => (
            <li
              onClick={() => handleClic(book._id)}
              key={index}
              className="border-b p-2 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-10 h-10 rounded-lg mr-2"
                />
                  <div>
                    <h5 className="text-sm font-medium">{book.title}</h5>
                    <p className="text-xs text-gray-500">{book.author}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>

    </div>
  );
};

export default SearchComponent;
