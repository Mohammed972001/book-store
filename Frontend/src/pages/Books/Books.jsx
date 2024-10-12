import { useEffect, useState } from "react";
import BookShow from "../../components/book/BookShow";
import SearchComponent from "../../components/serch/SearchComponent";
import { useBookStore } from "../../store/bookStore";
import Categoiyfillter from "../../components/book/CategoryFilter";

export default function BooksPage() {
  const { books, getAllBooks } = useBookStore();
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getAllBooks();
  }, [getAllBooks]);

  const filteredBooks = selectedCategory
    ? books.filter((book) => {
        console.log(
          `Filtering book: ${book.title}, category: ${book.category}`
        );
        return book.category === selectedCategory;
      })
    : books;

  const sortedBooks = filteredBooks.sort((a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
  });

  return (
    <div className="mt- pt-0">
      <SearchComponent books={sortedBooks} className=" " />
      <div className="flex flex-col w-full min-h-screen bg-slate-100 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-3xl font-semibold text-gray-800 ">
            Our Book Collection
          </h1>
          <div className="flex flex-row">
            <div className="mt-6 justify-center">
              <Categoiyfillter onCategorySelect={setSelectedCategory} />
            </div>
            <div className="flex w-2/3 min-h-screen mx-auto bg-slate-100 py-10 items-center flex-col">
              {" "}
              <div className="flex flex-wrap gap-1">
                <BookShow books={sortedBooks} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
