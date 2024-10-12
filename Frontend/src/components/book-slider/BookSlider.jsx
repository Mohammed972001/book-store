import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

import Modal from "../modal/modal";
import "./book-slider.css";
import { useState } from "react";
import BookCard from "../BookCard";

const BookSlider = ({ data }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [bookData, setBookData] = useState(null);

  const handleClick = (direction) => {
    if (direction === "left" && slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    } else if (direction === "right" && slideIndex < data.length - 1) {
      setSlideIndex(slideIndex + 1);
    }
  };

  const handleOpenModal = (item) => {
    setOpenModal(true);
    setBookData(item);
  };

  return (
    <div className="book-slider-container">
      {slideIndex > 0 && (
        <FaCircleArrowLeft
          size={30}
          color="black"
          onClick={() => handleClick("left")}
          className="book-slider-arrow-left"
        />
      )}
      <div
        style={{ transform: `translateX(${slideIndex * -360}px)` }}
        className="book-slider-wrapper"
      >
        {data.map((item) => (
          <BookCard
            key={item._id}
            book={item}
            handleOpenModal={handleOpenModal}
          />
        ))}
      </div>
      {slideIndex < data.length - 4 && (
        <FaCircleArrowRight
          size={30}
          color="black"
          onClick={() => handleClick("right")}
          className="book-slider-arrow-right"
        />
      )}
      {openModal && <Modal bookData={bookData} setOpenModal={setOpenModal} />}
    </div>
  );
};

export default BookSlider;
