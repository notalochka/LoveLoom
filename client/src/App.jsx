import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import ReportPage from "./pages/ReportPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBlocked from "./pages/AdminBlocked";
import AdminVerification from "./pages/AdminVerification";
import AdminComplaint from "./pages/AdminComplaint";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, authUser, checkingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return null;

  const isBlocked = authUser?.isBlocked;

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <Routes>
        <Route
          path="/"
          element={
            authUser && authUser.role === "user" && !isBlocked ? (
              <HomePage />
            ) : (
              <Navigate to={"/auth"} />
            )
          }
        />
        <Route
          path="/auth"
          element={
            !authUser ? (
              <AuthPage />
            ) : authUser.role === "user" && !isBlocked ? (
              <Navigate to={"/"} />
            ) : (
              <Navigate to={"/admin/dashboard"} />
            )
          }
        />
        <Route
          path="/profile"
          element={
            authUser && authUser.role === "user" && !isBlocked ? (
              <ProfilePage />
            ) : (
              <Navigate to={"/auth"} />
            )
          }
        />
        <Route
          path="/chat/:id"
          element={
            authUser && authUser.role === "user" && !isBlocked ? (
              <ChatPage />
            ) : (
              <Navigate to={"/auth"} />
            )
          }
        />
        <Route
          path="/report/:id"
          element={
            authUser && authUser.role === "user" && !isBlocked ? (
              <ReportPage />
            ) : (
              <Navigate to={"/auth"} />
            )
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            authUser && authUser.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to={"/auth"} />
            )
          }
        />
        <Route
          path="/admin/dashboard/blocked/:id"
          element={
            authUser && authUser.role === "admin" ? (
              <AdminBlocked />
            ) : (
              <Navigate to={"/auth"} />
            )
          }
        />
        <Route
          path="/admin/dashboard/newuser/:id"
          element={
            authUser && authUser.role === "admin" ? (
              <AdminVerification />
            ) : (
              <Navigate to={"/auth"} />
            )
          }
        />
        <Route
          path="/admin/dashboard/complaint/:id"
          element={
            authUser && authUser.role === "admin" ? (
              <AdminComplaint />
            ) : (
              <Navigate to={"/auth"} />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
