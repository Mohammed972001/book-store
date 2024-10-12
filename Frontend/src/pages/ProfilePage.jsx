import { useAuthStore } from "../store/authStore";
import { parseingDate } from "../utils";

import Sidebar from "../components/Sidebar";

const ProfilePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-center flex flex-col items-center">
            <Sidebar />
          </div>
          <div className="col-span-2 p-8">
            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800">
                Personal Information
              </h3>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-gray-600">Email</p>
                  <p className="text-gray-800">{user.email}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Favorite Genre</p>
                  <p className="text-gray-800">Science Fiction</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Joined</p>
                  <p className="text-gray-800">
                    {parseingDate(user.createdAt)}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
