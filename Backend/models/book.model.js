import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      default: 0,
      required: false,
    },
    reviews: {
      type: Number,
      min: 0,
      default: 0,
      required: false,
    },
    printLength: {
      type: Number,
      min: 50,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    PublicationDate: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: false,
      default: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    authorName: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
