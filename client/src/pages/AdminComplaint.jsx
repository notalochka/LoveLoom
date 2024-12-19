import { HeaderAdmin } from "../components/HeaderAdmin";
import { SidebarAdmin } from "../components/SidebarAdmin";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useComplainStore } from "../store/useComplainStore";

const AdminComplaint = () => {
  const {
    complaintData,
    getComplainInfo,
    isLoadingComplaint,
    blockUser,
    close,
  } = useComplainStore();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getComplainInfo(id);
  }, [getComplainInfo, id]);

  const handleBlock = () => {
    blockUser(id);
    navigate("/admin/dashboard");
  };
  const handleClose = () => {
    close(id);
    navigate("/admin/dashboard");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-purple-200 to-purple-100 overflow-hidden">
      <SidebarAdmin />
      <div className="flex-grow flex flex-col overflow-hidden">
        <HeaderAdmin />
        <main className="flex-grow flex flex-col gap-10 justify-start items-center p-4 mt-4 relative overflow-hidden">
          {isLoadingComplaint || !complaintData ? (
            <LoadingState />
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Complaint Details
              </h2>
              <p>
                <strong>Complaint ID:</strong> {complaintData.complaint._id}
              </p>
              <p>
                <strong>createdAt:</strong> {complaintData.complaint.createdAt}
              </p>
              <h3 className="text-lg font-semibold mt-4">
                Reasons for the Complaint
              </h3>
              <ul>
                {complaintData.complaint.reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mt-4">
                Additional Information
              </h3>
              <p>
                {complaintData.complaint.additionalInfo ||
                  "No additional information"}
              </p>

              <h3 className="text-lg font-semibold mt-4">
                Total Complaints for this User
              </h3>
              <p>{complaintData.complaintCount} complaints</p>

              <h3 className="text-lg font-semibold mt-4">Blocked User</h3>
              <img
                src={complaintData.complaint.blockedUser.image || "/avatar.png"}
                className="w-40 h-40  object-cover mb-4 mx-auto"
              />
              <p>
                <strong>UserID:</strong>{" "}
                {complaintData.complaint.blockedUser._id}
              </p>
              <p>
                <strong>Name:</strong>{" "}
                {complaintData.complaint.blockedUser.name}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {complaintData.complaint.blockedUser.email}
              </p>
              <p>
                <strong>Age:</strong> {complaintData.complaint.blockedUser.age}
              </p>
              <p>
                <strong>Gender:</strong>{" "}
                {complaintData.complaint.blockedUser.gender}
              </p>
              <p>
                <strong>Bio:</strong>{" "}
                {complaintData.complaint.blockedUser.bio || "No bio provided"}
              </p>
              <p>
                <strong>Gender Preference:</strong>{" "}
                {complaintData.complaint.blockedUser.genderPreference}
              </p>
              <p>
                <strong>Verified:</strong>{" "}
                {complaintData.complaint.blockedUser.isVerified ? "Yes" : "No"}
              </p>

              <h3 className="text-lg font-semibold mt-4">
                User Who Filed the Complaint
              </h3>
              <p>
                <strong>UserID:</strong> {complaintData.complaint.user._id}
              </p>
              <p>
                <strong>Name:</strong> {complaintData.complaint.user.name}
              </p>
              <p className="mb-4">
                <strong>Email:</strong> {complaintData.complaint.user.email}
              </p>

              <button
                onClick={handleBlock}
                className="w-full bg-red-600 text-white py-2 px-4 mb-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Block User in System
              </button>
              <button
                onClick={handleClose}
                className="w-full bg-green-600 text-white py-2 mb-4 px-6 rounded-lg hover:bg-green-700 transition-colors"
              >
                Close without Block
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminComplaint;

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <Loader className="text-blue-500 mb-4 animate-spin" size={48} />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      Loading Complaint
    </h3>
  </div>
);
