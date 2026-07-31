import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "../context/AuthContext";

import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import PassengerRegister from "../pages/auth/PassengerRegister";
import DriverRegister from "../pages/auth/DriverRegister";
import AdminRegister from "../pages/auth/AdminRegister";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/passenger" element={<PassengerRegister />} />
          <Route path="/register/driver" element={<DriverRegister />} />
          <Route path="/register/admin" element={<AdminRegister />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Teammates: wrap dashboard routes like this once their pages exist
          <Route element={<PrivateRoute />}>
            <Route element={<RoleRoute allowedRoles={["PASSENGER"]} />}>
              <Route path="/passenger/dashboard" element={<PassengerDashboard />} />
            </Route>
          </Route>
          */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}