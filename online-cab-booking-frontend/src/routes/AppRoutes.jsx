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

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

import AdminDashboard from "../pages/admin/Dashboard";
import UserList from "../pages/admin/users/UserList";
import DriverList from "../pages/admin/drivers/DriverList";
import BookingList from "../pages/admin/bookings/BookingList";
import BookingReport from "../pages/admin/reports/BookingReport";
import RevenueReport from "../pages/admin/reports/RevenueReport";
import DriverReport from "../pages/admin/reports/DriverReport";
import PassengerReport from "../pages/admin/reports/PassengerReport";

import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

import DriverLayout from "../layouts/DriverLayout";
import DriverDashboard from "../pages/driver/Dashboard";
import DriverProfile from "../pages/driver/DriverProfile";
import Vehicle from "../pages/driver/Vehicle";
import Location from "../pages/driver/Location";
import AssignedRide from "../pages/driver/AssignedRide";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>

          {/* ================= Public Routes ================= */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register/passenger" element={<PassengerRegister />} />
            <Route path="/register/driver" element={<DriverRegister />} />
            <Route path="/register/admin" element={<AdminRegister />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          {/* ================= Admin Routes ================= */}
          <Route element={<PrivateRoute />}>
            <Route element={<RoleRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />

                {/* Users */}
                <Route path="users" element={<UserList />} />

                {/* Drivers */}
                <Route path="drivers" element={<DriverList />} />

                {/* Bookings */}
                <Route path="bookings" element={<BookingList />} />

                {/* Reports */}
                <Route path="reports/bookings" element={<BookingReport />} />
                <Route path="reports/revenue" element={<RevenueReport />} />
                <Route path="reports/drivers" element={<DriverReport />} />
                <Route path="reports/passengers" element={<PassengerReport />} />
              </Route>
            </Route>
          </Route>

          {/* ================= Driver Routes ================= */}
          <Route element={<PrivateRoute />}>
            <Route element={<RoleRoute allowedRoles={["DRIVER"]} />}>
              <Route path="/driver" element={<DriverLayout />}>
                <Route path="dashboard" element={<DriverDashboard />} />
                <Route path="profile" element={<DriverProfile />} />
                <Route path="vehicle" element={<Vehicle />} />
                <Route path="location" element={<Location />} />
                <Route path="assigned-ride" element={<AssignedRide />} />
              </Route>
            </Route>
          </Route>

          {/* ================= Passenger Routes ================= */}
          {/*
          <Route element={<PrivateRoute />}>
            <Route element={<RoleRoute allowedRoles={["PASSENGER"]} />}>
              <Route path="/passenger" element={<PassengerLayout />}>
                <Route index element={<PassengerDashboard />} />
              </Route>
            </Route>
          </Route>
          */}

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}