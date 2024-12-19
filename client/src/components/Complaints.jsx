import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useComplainStore } from "../store/useComplainStore";
import { useEffect } from "react";

export const Complaints = () => {
  const { getComplainList, isLoadingComplain, complaints } = useComplainStore();
  useEffect(() => {
    getComplainList();
  }, [getComplainList]);

  return (
    <div className="flex-grow overflow-y-auto p-4 z-10 relative">
      {isLoadingComplain ? (
        <LoadingState />
      ) : complaints.length === 0 ? (
        <NoComplainFound />
      ) : (
        complaints.map((complain) => (
          <Link
            key={complain._id}
            to={`/admin/dashboard/complaint/${complain._id}`}
          >
            <div className="flex items-center mb-4 cursor-pointer hover:bg-blue-100 p-2 rounded-lg transition-colors duration-300">
              <p className="text-sm text-gray-900 ">ID: {complain._id}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

const NoComplainFound = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <p className="text-gray-500 max-w-xs">No complaints found</p>
  </div>
);

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <Loader className="text-blue-500 mb-4 animate-spin" size={48} />
    <h3 className="text-xl font-semibold text-gray-700 mb-2">
      Loading Complaints
    </h3>
  </div>
);
