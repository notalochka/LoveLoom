import { useState, useEffect } from "react";
import { BlockedList } from "./BlockedList";
import { NewUsersList } from "./NewUsersList";
import { Complaints } from "./Complaints";

export const SidebarAdmin = () => {
  const savedTab = localStorage.getItem("activeTab") || "newUsers";

  const [activeTab, setActiveTab] = useState(savedTab);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  useEffect(() => {
    const savedTab = localStorage.getItem("activeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);
  return (
    <div className="fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-md overflow-hidden transition-transform duration-300 ease-in-out translate-x-full lg:translate-x-0 lg:static lg:w-1/4">
      <div className="flex space-x-8 border-b-2 border-gray-300 mb-4 p-3">
        <button
          className={`text-lg font-semibold p-2 transition-colors duration-300 ${
            activeTab === "newUsers"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
          onClick={() => handleTabClick("newUsers")}
        >
          New Users
        </button>
        <button
          className={`text-lg font-semibold p-2 transition-colors duration-300 ${
            activeTab === "complaints"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
          onClick={() => handleTabClick("complaints")}
        >
          Complaints
        </button>

        <button
          className={`text-lg font-semibold p-2 transition-colors duration-300 ${
            activeTab === "blocked"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
          onClick={() => handleTabClick("blocked")}
        >
          Blocked
        </button>
      </div>

      <div>
        {activeTab === "newUsers" && <NewUsersList />}
        {activeTab === "complaints" && <Complaints />}
        {activeTab === "blocked" && <BlockedList />}
      </div>
    </div>
  );
};
