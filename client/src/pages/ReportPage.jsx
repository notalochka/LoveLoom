import { useState } from "react";
import { Header } from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useBlockUserStore } from "../store/useBlockUserStore";

const ReportPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedReasons, setSelectedReasons] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const reasons = [
    "Inappropriate behavior",
    "Spam or scam",
    "Offensive language",
    "Fake profile",
    "Harassment",
    "Didn't enjoy the conversation",
  ];

  const handleCheckboxChange = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User ID:", id);
    console.log("Reasons:", selectedReasons);
    console.log("Additional Information:", additionalInfo);

    if (selectedReasons.length === 0) {
      alert("Please select at least one reason for blocking.");
      return;
    }

    useBlockUserStore.getState().blockUser({
      userId: id,
      reasons: selectedReasons,
      additionalInfo,
    });
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 bg-opacity-50">
      <Header />
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Report User
          </h2>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend className="mb-2 text-gray-700 font-medium">
                Select reason(s) for blocking:
              </legend>
              {reasons.map((reason, index) => (
                <label key={index} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value={reason}
                    checked={selectedReasons.includes(reason)}
                    onChange={() => handleCheckboxChange(reason)}
                    className="mr-2 accent-red-500"
                  />
                  <span className="text-gray-700">{reason}</span>
                </label>
              ))}
            </fieldset>

            <label
              htmlFor="additionalInfo"
              className="block mt-4 mb-2 text-gray-700"
            >
              Additional Information (optional):
            </label>
            <textarea
              id="additionalInfo"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Provide more details..."
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              rows="4"
            ></textarea>

            <button
              type="submit"
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Confirm Block
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
