import { HeaderAdmin } from "../components/HeaderAdmin";
import { SidebarAdmin } from "../components/SidebarAdmin";
import { useNewUsersStore } from "../store/useNewUsersStore";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const AdminVerification = () => {
  const { newUser, getNewUser, isLoadingUser, verifyUser, blockUser } =
    useNewUsersStore();
  const { id } = useParams();
  useEffect(() => {
    getNewUser(id);
  }, [getNewUser, id]);
  const navigate = useNavigate();
  const handleVerify = () => {
    verifyUser(id);
    navigate("/admin/dashboard");
  };
  const handleBlock = () => {
    blockUser(id);
    navigate("/admin/dashboard");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-purple-200 to-purple-100 overflow-hidden">
      <SidebarAdmin />
      <div className="flex-grow flex flex-col overflow-hidden">
        <HeaderAdmin />
        <main className="flex-grow flex flex-col gap-10 justify-start items-center p-4 mt-4 relative overflow-hidden">
          {isLoadingUser || !newUser ? (
            <LoadingState />
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                User Details
              </h2>
              <img
                src={newUser.image || "/avatar.png"}
                className="w-40 h-40  object-cover mb-4 mx-auto"
              />
              <p></p>
              <p>
                <strong>Name:</strong> {newUser.name}
              </p>
              <p>
                <strong>Email:</strong> {newUser.email}
              </p>
              <p>
                <strong>Age:</strong> {newUser.age}
              </p>
              <p>
                <strong>Gender:</strong> {newUser.gender}
              </p>
              <p>
                <strong>Bio:</strong> {newUser.bio || "No bio provided"}
              </p>
              <p>
                <strong>Gender Preference:</strong> {newUser.genderPreference}
              </p>
              <p>
                <strong>createdAt:</strong> {newUser.createdAt}
              </p>
              <p className="mb-4">
                <strong>updatedAt:</strong> {newUser.updatedAt}
              </p>
              <button
                onClick={handleVerify}
                className="w-full bg-green-600 text-white py-2 mb-4 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Verify User
              </button>
              <button
                onClick={handleBlock}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Block User
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminVerification;

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <Loader className="text-blue-500 mb-4 animate-spin" size={48} />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      Loading New User
    </h3>
  </div>
);
