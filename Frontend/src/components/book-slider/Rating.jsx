import { FaRegStar, FaStar, FaRegStarHalfStroke } from "react-icons/fa6";

const Rating = ({ rating }) => {
  return (
    <div className="rating flex items-center">
      {rating >= 1 ? (
        <FaStar size={25} className="mx-[3px]" />
      ) : rating >= 0.5 && rating <= 1 ? (
        <FaRegStarHalfStroke size={25} className="mx-[3px]" />
      ) : (
        <FaRegStar size={25} className="mx-[3px]" />
      )}

      {rating >= 2 ? (
        <FaStar size={25} className="mx-[3px]" />
      ) : rating >= 1.5 && rating <= 2 ? (
        <FaRegStarHalfStroke size={25} className="mx-[3px]" />
      ) : (
        <FaRegStar size={25} className="mx-[3px]" />
      )}

      {rating >= 3 ? (
        <FaStar size={25} className="mx-[3px]" />
      ) : rating >= 2.5 && rating <= 3 ? (
        <FaRegStarHalfStroke size={25} className="mx-[3px]" />
      ) : (
        <FaRegStar size={25} className="mx-[3px]" />
      )}

      {rating >= 4 ? (
        <FaStar size={25} className="mx-[3px]" />
      ) : rating >= 3.5 && rating <= 4 ? (
        <FaRegStarHalfStroke size={25} className="mx-[3px]" />
      ) : (
        <FaRegStar size={25} className="mx-[3px]" />
      )}

      {rating >= 5 ? (
        <FaStar size={25} className="mx-[3px]" />
      ) : rating >= 4.5 && rating <= 5 ? (
        <FaRegStarHalfStroke size={25} className="mx-[3px]" />
      ) : (
        <FaRegStar size={25} className="mx-[3px]" />
      )}

      <span>{rating}</span>
    </div>
  );
};

export default Rating;
