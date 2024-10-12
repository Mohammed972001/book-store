import {  useState } from "react";
import CreateBookForm from "../components/CreateBookForm";
import BooksList from "../components/BooksList";
import { LuBarChart, LuPlusCircle } from "react-icons/lu";
import { BsBookshelf } from "react-icons/bs";
import Analytics from "../components/Analytics";

const tabs = [
  { id: "add", label: "Add Book", icon: LuPlusCircle },
  { id: "books", label: "Books", icon: BsBookshelf },
  { id: "analytics", label: "Analytics", icon: LuBarChart },
];

const AuthorPage = () => {
  const [activeTab, setActiveTab] = useState("add");


  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "add" && <CreateBookForm />}
        {activeTab === "books" && <BooksList />}
        {activeTab === "analytics" && <Analytics />}
      </div>
    </div>
  );
};
export default AuthorPage;
