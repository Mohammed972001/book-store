import { CiLogout } from "react-icons/ci";
import { FaUserEdit } from "react-icons/fa";
import { IoCart } from "react-icons/io5";

// import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Button from "./ui/Button";

const Sidebar = () => {
  const { user, logout } = useAuthStore();
  const sections = [
    // {
    //   Text: "Edit Profile",
    //   Icon: <FaUser size={20} />,
    //   link: "/edit-profile",
    // },
    {
      Text: "Change Password",
      Icon: <FaUserEdit size={20} />,
      link: "/change-Password",
    },
    {
      Text: "Orders",
      Icon: <IoCart size={20} />,
      link: "/orders",
    },
  ];

  return (
    <div className="w-full">
      <aside className="flex-col items-start gap-8 pt-10 text-white">
        <div className="flex flex-col justify-between items-center self-center">
          <img
            className="rounded-full h-32 w-32 object-cover border-4 border-white shadow-md"
            src="avatar.png"
            alt="Profile"
          />
          <h2 className="mt-4 text-white text-2xl font-bold">{user.name}</h2>
          <p className="text-blue-200 text-sm mt-1">
            Avid Reader & Book Enthusiast
          </p>
        </div>
        <div>
          <ul className="flex flex-col justify-between items-start gap-4 pt-10">
            {sections.map((section, index) => (
              <li
                key={index}
                className="w-full p-3 rounded-md hover:bg-white hover:text-blue-500"
              >
                <Link to={section.link}>
                  <div className="flex flex-row items-center gap-3">
                    {section.Icon}
                    <h3>{section.Text}</h3>
                  </div>
                </Link>
              </li>
            ))}
            <Button
              className="p-3 rounded-md hover:bg-white hover:text-blue-500"
              onClick={logout}
            >
              <div className="flex flex-row items-center gap-3">
                <CiLogout size={20} />
                Log Out
              </div>
            </Button>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
