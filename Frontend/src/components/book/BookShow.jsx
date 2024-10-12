import { useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { useBookStore } from "../../store/bookStore";
import { useCartStore } from "../../store/cartStore";
import { useNavigate } from "react-router-dom";
import { LuBookKey } from "react-icons/lu";

import Modal from "../modal/modal";

import "@fortawesome/fontawesome-free/css/all.min.css";
import toast from "react-hot-toast";

export default function BookShow({ books }) {
  const { addToCart } = useCartStore();
  const { updateReviews, wishList } = useBookStore();
  const [openModal, setOpenModal] = useState(false);
  const [bookData, setBookData] = useState(null);
  const navigate = useNavigate();

  const handleClic = (id) => {
    navigate(`/book/${id}`);
  };

  const handleOpenModal = (item) => {
    setOpenModal(true);
    setBookData(item);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-lg mx-auto px-4 py-10">
      {books.map((book, index) => {
        const isWishlisted =
          book && book._id && wishList.find((item) => item._id === book._id);
        return (
          <div
            key={index}
            className="flex flex-col h-fit cursor-pointer group hover:shadow-2xl hover:rounded-lg hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-in-out"
          >
            <div className="w-3/4 mx-auto relative hover:rounded-xl hover:shadow-lg hover:-translate-y-2 transition-all duration-300 ease-in-out group">
              <img
                src={book.image}
                alt={book.title}
                className="h-full rounded-xl"
              />

              <div className="absolute top-3 right-3 bg-white flex flex-col space-y-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <button
                  onClick={() => handleClic(book._id)}
                  className="bg-white px-4 pt-3 rounded-full"
                >
                  <i className="">
                    <LuBookKey />
                  </i>
                </button>
                <button
                  className={`bg-white px-4 pb-3 rounded-full ${
                    isWishlisted ? "text-red-500" : "text-gray-500"
                  }`}
                  onClick={() => updateReviews(book._id)}
                >
                  <i className="fa fa-heart"></i>
                </button>
              </div>

              <div
                className="absolute bottom-0 w-full px-2 opacity-0 
              translate-y-full group-hover:opacity-100 group-hover:translate-y-0 
              transition-all duration-700 ease-in-out bg-white rounded-b-xl"
              >
                <button
                  onClick={() => handleOpenModal(book)}
                  className="bg-white text-black px-4 py-2 w-full rounded-b-xl"
                >
                  Quick view
                </button>
              </div>
            </div>

            <div className="py-4 px-2">
              <p className="text-center font-bold hover:text-blue-500">
                {book.title}
              </p>
              <h3 className="text-center text-blue-700">
                Price: ${book.price}
              </h3>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pb-2 px-2">
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
                className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full flex items-center justify-center gap-2"
              >
                <BsCartPlus size={20} /> Add to Cart
              </button>
            </div>
          </div>
        );
      })}

      {openModal && <Modal bookData={bookData} setOpenModal={setOpenModal} />}
    </div>
  );
}
