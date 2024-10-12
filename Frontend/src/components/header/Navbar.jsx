import { Link, NavLink, useLocation } from "react-router-dom";
import { useCartStore } from "./../../store/cartStore";
import { useAuthStore } from "./../../store/authStore";
import { LuLock, LuLogIn, LuUserPlus } from "react-icons/lu";
import { BsBook, BsCart2, BsXLg, BsList } from "react-icons/bs";
import UserMenu from "../UserMenu";
import { FaRegHeart } from "react-icons/fa6";

const Navbar = ({ toggle, setToggle }) => {
  const { user } = useAuthStore();
  const isAuthor = user?.role === "author";
  const { cart } = useCartStore();
  const location = useLocation();

  // Check if we are on the Books page
  const isBooksPage = location.pathname === "/Books";

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white shadow-lg z-50 p-3 ${
        isBooksPage ? "shadow-none pb-0 pt-1" : "shadow-lg"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center ">
        <Link
          to="/"
          className="text-xl font-bold flex items-center text-gray-800"
        >
          <span className="text-blue-700">Book</span>
          <BsBook className="text-2xl mx-1 text-yellow-500" />
          <span className="text-blue-700">Store</span>
        </Link>
        {user && (
          <div className="hidden sm:space-x-5 md:flex space-x-20 items-center">
            <NavLink
              to="/"
              className="text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
            >
              Home
            </NavLink>
            <NavLink
              to="/Books"
              className="text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
            >
              Books
            </NavLink>
            <NavLink
              to="/authors"
              className="text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
            >
              Authors
            </NavLink>
            <NavLink
              to="/about"
              className="text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
            >
              About Us
            </NavLink>
            <NavLink
              to="/reviews"
              className="text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
            >
              Reviews
            </NavLink>
            {isAuthor && (
              <NavLink
                className="text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
                to="dashboard"
              >
                <LuLock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </NavLink>
            )}
            <NavLink
              to={"/cart"}
              className="relative text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
            >
              <BsCart2
                className="inline-block mr-1 group-hover:text-blue-500"
                size={20}
              />
              <span className="hidden sm:inline">Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-red-500 hover:text-white transition duration-300 ease-in-out">
                  {cart.length}
                </span>
              )}
            </NavLink>
          </div>
        )}
        <div className="relative flex items-center space-x-3">
          {user ? (
            <>
              <NavLink
                to={"/wish-list"}
                className="text-gray-600 hover:text-red-600 px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
              >
                <FaRegHeart size={25} />
              </NavLink>
              <UserMenu />
            </>
          ) : (
            <>
              <Link
                to={"/register"}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
              >
                <LuUserPlus className="mr-2" size={18} />
                <span className="hidden sm:inline ml-2">Sign Up</span>
              </Link>
              <Link
                to={"/login"}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out"
              >
                <LuLogIn className="mr-2" size={18} />
                <span className="hidden sm:inline ml-2">Login</span>
              </Link>
            </>
          )}
          {user && (
            <button
              onClick={() => setToggle(!toggle)}
              className="ml-4 md:hidden text-gray-800 text-3xl focus:outline-none z-50"
            >
              {toggle ? <BsXLg /> : <BsList />}
            </button>
          )}
        </div>
      </div>
      {user && (
        <div className={`md:hidden ${toggle ? "block" : "hidden"} bg-white`}>
          <div className="flex flex-col items-center space-y-4 py-4">
            <NavLink
              to="/"
              onClick={() => setToggle(false)}
              className="text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
            >
              Home
            </NavLink>
            <NavLink
              to="/books"
              onClick={() => setToggle(false)}
              className="text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
            >
              Books
            </NavLink>
            <NavLink
              to="/authors"
              onClick={() => setToggle(false)}
              className="text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
            >
              Authors
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setToggle(false)}
              className="text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
            >
              About Us
            </NavLink>
            <NavLink
              to="/reviews"
              onClick={() => setToggle(false)}
              className="text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
            >
              Reviews
            </NavLink>
            {isAuthor && (
              <NavLink
                className="text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
                to="dashboard"
              >
                <LuLock className="inline-block mr-1" size={18} />
                <span className="sm:inline">Dashboard</span>
              </NavLink>
            )}
            <NavLink
              to="/cart"
              onClick={() => setToggle(false)}
              className="relative text-gray-600 hover:bg-blue-500 hover:text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center"
            >
              <BsCart2
                className="inline-block mr-1 group-hover:text-blue-500"
                size={20}
              />
              <span>Cart</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-red-500 hover:text-white transition duration-300 ease-in-out">
                  {cart.length}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
