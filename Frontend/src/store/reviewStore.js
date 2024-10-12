import { create } from "zustand";

export const useReviewStore = create((set) => {
  const existingReviews = JSON.parse(localStorage.getItem("reviews")) || {};

  return {
    reviews: existingReviews,
    addReview: (bookId, review) => {
      set((state) => {
        const bookReviews = state.reviews[bookId] || [];
        const newReviews = {
          ...state.reviews,
          [bookId]: [...bookReviews, review],
        };
        localStorage.setItem("reviews", JSON.stringify(newReviews));
        return { reviews: newReviews };
      });
    },
  };
});
