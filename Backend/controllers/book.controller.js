import Book from "./../models/book.model.js";
import cloudinary from "./../utils/cloudinary.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ books});
  } catch (error) {
    console.log("Error in getAllBooks controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAuthorBooks = async (req, res) => {
  try {
    const author = req.user;
    const authorBooks = await Book.find({ authorId: author._id });
    res.status(200).json({ authorBooks });
  } catch (error) {
    console.log("Error in getAuthorsBooks controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getWishList = async (req, res) => {
  try {
    const books = await Book.find({ _id: { $in: req.user.wishList } });
    res.json(books);
  } catch (error) {
    console.log("Error in getWishList controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createBook = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      printLength,
      language,
      PublicationDate,
      image,
      authorId,
      authorName,
    } = req.body;

    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "books",
      });
    }

    const book = await Book.create({
      title,
      description,
      category,
      price,
      printLength,
      language,
      PublicationDate,
      image: cloudinaryResponse?.secure_url
        ? cloudinaryResponse.secure_url
        : "",
      authorId,
      authorName,
    });
    await book.save();
    res.status(201).json({ book });
  } catch (error) {
    console.log("Error in createBook controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  const {
    title,
    description,
    category,
    price,
    printLength,
    language,
    PublicationDate,
    inStock,
    image,
  } = req.body;

  let cloudinaryResponse = null;
  if (image != book.image) {
    cloudinaryResponse = await cloudinary.uploader.upload(image, {
      folder: "books",
      public_id: book.image.split("/").pop().split(".")[0],
      overwrite: true,
    });
  }
  book.title = title;
  book.description = description;
  book.category = category;
  book.price = price;
  book.printLength = printLength;
  book.language = language;
  book.PublicationDate = PublicationDate;
  book.inStock = inStock;
  book.image = cloudinaryResponse?.secure_url
    ? cloudinaryResponse.secure_url
    : book.image;
  await book.save();
  res.status(201).json({ book });
};

export const updateReviews = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    const user = req.user;
    const existingItem = user.wishList.find((item) => item.id === bookId);
    if (book) {
      let message = "";
      if (!existingItem) {
        book.reviews = book.reviews + 1;
        book.rating =
          book.rating >= 5 ? 5 : parseFloat((book.rating + 0.1).toFixed(1));
        user.wishList.push(bookId);
        message = "Book added to wish list";
      } else {
        book.reviews = book.reviews - 1;
        book.rating =
          book.rating <= 0 ? 0 : parseFloat((book.rating - 0.1).toFixed(1));
        user.wishList = user.wishList.filter((item) => item.id !== bookId);
        message = "Book removed from wish list";
      }
      await user.save();
      await book.save();
      res.status(200).json({ message });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    console.log("Error in updateReviews controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.image) {
      const publicId = book.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`books/${publicId}`);
        console.log("deleted image from cloduinary");
      } catch (error) {
        console.log("error deleting image from cloduinary", error);
      }
    }

    await Book.findByIdAndDelete(req.params.id);

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log("Error in deleteBook controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
