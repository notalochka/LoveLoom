import { HeaderAdmin } from "../components/HeaderAdmin";
import { SidebarAdmin } from "../components/SidebarAdmin";
import { useBlockedListStore } from "../store/useBlockedListStore";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const AdminBlocked = () => {
  const { blockedUser, getBlockedUser, isLoadingUser, unblockUser } =
    useBlockedListStore();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getBlockedUser(id);
  }, [getBlockedUser, id]);

  const handleUnblock = () => {
    unblockUser(id);
    navigate("/admin/dashboard");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-purple-200 to-purple-100 overflow-hidden">
      <SidebarAdmin />
      <div className="flex-grow flex flex-col overflow-hidden">
        <HeaderAdmin />
        <main className="flex-grow flex flex-col gap-10 justify-start items-center p-4 mt-4 relative overflow-hidden">
          {isLoadingUser || !blockedUser ? (
            <LoadingState />
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                User Details
              </h2>
              <img
                src={blockedUser.image || "/avatar.png"}
                className="w-40 h-40  object-cover mb-4 mx-auto"
              />
              <p></p>
              <p>
                <strong>Name:</strong> {blockedUser.name}
              </p>
              <p>
                <strong>Email:</strong> {blockedUser.email}
              </p>
              <p>
                <strong>Age:</strong> {blockedUser.age}
              </p>
              <p>
                <strong>Gender:</strong> {blockedUser.gender}
              </p>
              <p>
                <strong>Bio:</strong> {blockedUser.bio || "No bio provided"}
              </p>
              <p>
                <strong>Gender Preference:</strong>{" "}
                {blockedUser.genderPreference}
              </p>
              <p>
                <strong>createdAt:</strong> {blockedUser.createdAt}
              </p>
              <p>
                <strong>updatedAt:</strong> {blockedUser.updatedAt}
              </p>
              <p className="mb-4">
                <strong>Verified:</strong>{" "}
                {blockedUser.isVerified ? "Yes" : "No"}
              </p>
              <button
                onClick={handleUnblock}
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Unblock User
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminBlocked;

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <Loader className="text-blue-500 mb-4 animate-spin" size={48} />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      Loading Blocked User
    </h3>
  </div>
);
