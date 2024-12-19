import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useNewUsersStore } from "../store/useNewUsersStore";
import { useEffect } from "react";

export const NewUsersList = () => {
  const { getNewList, isLoadingNew, newUsers } = useNewUsersStore();
  useEffect(() => {
    getNewList();
  }, [getNewList]);

  return (
    <div className="flex-grow overflow-y-auto p-4 z-10 relative">
      {isLoadingNew ? (
        <LoadingState />
      ) : newUsers.length === 0 ? (
        <NoNewFound />
      ) : (
        newUsers.map((user) => (
          <Link key={user._id} to={`/admin/dashboard/newuser/${user._id}`}>
            <div className="flex items-center mb-4 cursor-pointer hover:bg-blue-100 p-2 rounded-lg transition-colors duration-300">
              <h3 className="font-semibold text-gray-800 mr-2">{user.name}</h3>
              <p className="text-sm text-gray-500 ">ID: {user._id}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

const NoNewFound = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <p className="text-gray-500 max-w-xs">No new users found</p>
  </div>
);

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <Loader className="text-blue-500 mb-4 animate-spin" size={48} />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      Loading New Users
    </h3>
  </div>
);
