/* eslint-disable react/no-unescaped-entities */
import "./slider.css";
import FirstBook from "../../images/book1.png";
import SecondBook from "../../images/book2.png";
import ThirdBook from "../../images/book3.png";
import { useState } from "react";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex - 1);
    } else {
      setSlideIndex(slideIndex + 1);
    }
  };
  return (
    <div className="slider-container">
      {slideIndex !== 0 && (
        <FaArrowLeft
          size={35}
          color="white"
          onClick={() => handleClick("left")}
          className="arrow-left"
        />
      )}
      <div
        style={{ transform: `translateX(${slideIndex * -100}vw)` }}
        className="slider-wrapper"
      >
        <div className="slide first-slide">
          <div className="slide-image-wrapper">
            <img src={FirstBook} alt="" />
          </div>
          <div className="slide-info-wrapper">
            <h1 className="slide-info-title">Book Store</h1>
            <p className="slide-info-desc">
              It's not just reading. it's living the adventure
            </p>
          </div>
        </div>
        <div className="slide second-slide">
          <div className="slide-image-wrapper">
            <img src={SecondBook} alt="" />
          </div>
          <div className="slide-info-wrapper">
            <h1 className="slide-info-title">The Books For Everyone</h1>
            <p className="slide-info-desc">
              You can read at the bookstore or at home
            </p>
          </div>
        </div>
        <div className="slide third-slide">
          <div className="slide-image-wrapper">
            <img src={ThirdBook} alt="" />
          </div>
          <div className="slide-info-wrapper">
            <h1 className="slide-info-title">Check Out The New Titles</h1>
            <p className="slide-info-desc">
              We send you the book you want at home
            </p>
          </div>
        </div>
      </div>
      {slideIndex !== 2 && (
        <FaArrowRight
          size={35}
          color="white"
          onClick={() => handleClick("right")}
          className="bi bi-chevron-double-right arrow-right"
        >
          {" "}
        </FaArrowRight>
      )}
    </div>
  );
};

export default Slider;
