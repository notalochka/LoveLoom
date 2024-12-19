import { HeaderAdmin } from "../components/HeaderAdmin";
import { SidebarAdmin } from "../components/SidebarAdmin";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-purple-200 to-purple-100 overflow-hidden">
      <SidebarAdmin />
      <div className="flex-grow flex flex-col overflow-hidden">
        <HeaderAdmin />
        <main className="flex-grow flex flex-col gap-10 justify-center items-center p-4 relative overflow-hidden">
          <div></div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
