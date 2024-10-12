import React from "react";
import { bookCategories } from "../../data/books";

export default function Categoiyfillter({ onCategorySelect }) {
  return (
    <div>
      <h1 className=" pb-8 text-3xl ">Filter by</h1>
      <hr />
      <p className="text-center text-xl mb-2 mt-2">category</p>
      <ul className="space-y-3  border-r bg-[rgba(251,251,251,0.5)]">
        <li
          onClick={() => {
            onCategorySelect(null);
          }}
          className="pl-3 cursor-pointer hover:underline hover:text-blue-500"
        >
          All
        </li>
        {bookCategories.map((category) => (
          <li
            key={category}
            onClick={() => {
              console.log(`Selected category: ${category}`);
              onCategorySelect(category);
            }}
            className=" pl-3 cursor-pointer hover:underline hover:text-blue-500"
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
