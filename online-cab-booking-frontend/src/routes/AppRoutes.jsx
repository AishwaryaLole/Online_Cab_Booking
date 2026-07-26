import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import PassengerLayout from "../layouts/PassengerLayout";
import DriverLayout from "../layouts/DriverLayout";
import AdminLayout from "../layouts/AdminLayout";

// Route Protection
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

// Public Pages
import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import PassengerRegister from "../pages/auth/PassengerRegister";
import DriverRegister from "../pages/auth/DriverRegister";
import VerifyOTP from "../pages/auth/VerifyOTP";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import AdminRegister from "../pages/auth/AdminRegister";
import NotFound from "../pages/NotFound";

// Passenger Pages
import Dashboard from "../pages/passenger/Dashboard";
import BookRide from "../pages/passenger/BookRide";
import RideHistory from "../pages/passenger/RideHistory";
import Profile from "../pages/passenger/Profile";
import Payment from "../pages/passenger/Payment";

// Driver Pages
import DriverDashboard from "../pages/driver/Dashboard";
import RideRequests from "../pages/driver/RideRequests";
import Earnings from "../pages/driver/Earnings";
import DriverProfile from "../pages/driver/Profile";
import VehicleDetails from "../pages/driver/VehicleDetails";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Drivers from "../pages/admin/Drivers";
import Bookings from "../pages/admin/Bookings";
import Reports from "../pages/admin/Reports";

function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/passenger" element={<PassengerRegister />} />
        <Route path="/register/driver" element={<DriverRegister />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/register/admin" element={<AdminRegister />} />
      </Route>

      {/* Passenger Routes */}
      <Route
        path="/passenger"
        element={
          <PrivateRoute>
            <RoleRoute role="PASSENGER">
              <PassengerLayout />
            </RoleRoute>
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="book-ride" element={<BookRide />} />
        <Route path="ride-history" element={<RideHistory />} />
        <Route path="profile" element={<Profile />} />
        <Route path="payment" element={<Payment />} />
      </Route>

      {/* Driver Routes */}
      <Route
        path="/driver"
        element={
          <PrivateRoute>
            <RoleRoute role="DRIVER">
              <DriverLayout />
            </RoleRoute>
          </PrivateRoute>
        }
      >
        <Route index element={<DriverDashboard />} />
        <Route path="ride-requests" element={<RideRequests />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="profile" element={<DriverProfile />} />
        <Route path="vehicle-details" element={<VehicleDetails />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <RoleRoute role="ADMIN">
              <AdminLayout />
            </RoleRoute>
          </PrivateRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="drivers" element={<Drivers />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;