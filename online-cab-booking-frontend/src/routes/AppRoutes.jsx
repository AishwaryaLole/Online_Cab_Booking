import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "../context/AuthContext";

// Public Pages
import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import PassengerRegister from "../pages/auth/PassengerRegister";
import DriverRegister from "../pages/auth/DriverRegister";
import AdminRegister from "../pages/auth/AdminRegister";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// Layouts
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import DriverLayout from "../layouts/DriverLayout";
import PassengerLayout from "../layouts/PassengerLayout";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import UserList from "../pages/admin/users/UserList";
import DriverList from "../pages/admin/drivers/DriverList";
import BookingList from "../pages/admin/bookings/BookingList";
import BookingReport from "../pages/admin/reports/BookingReport";
import RevenueReport from "../pages/admin/reports/RevenueReport";
import DriverReport from "../pages/admin/reports/DriverReport";
import PassengerReport from "../pages/admin/reports/PassengerReport";

// Driver Pages
import DriverDashboard from "../pages/driver/Dashboard";
import DriverProfile from "../pages/driver/DriverProfile";
import Vehicle from "../pages/driver/Vehicle";
import Location from "../pages/driver/Location";
import AssignedRide from "../pages/driver/AssignedRide";

// Passenger Pages
import PassengerDashboard from "../pages/passenger/PassengerDashboard";
import BookRide from "../pages/passenger/BookRide";
import PassengerRideHistory from "../pages/passenger/RideHistory";
import PassengerProfile from "../pages/passenger/Profile";
import Payment from "../pages/passenger/Payment";
import Rating from "../pages/passenger/Rating";

// Protected Routes
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/register/passenger"
              element={<PassengerRegister />}
            />
            <Route
              path="/register/driver"
              element={<DriverRegister />}
            />
            <Route
              path="/register/admin"
              element={<AdminRegister />}
            />
            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />
            <Route
              path="/reset-password"
              element={<ResetPassword />}
            />
          </Route>

          {/* Admin Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<RoleRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route
                  path="dashboard"
                  element={<AdminDashboard />}
                />

                <Route path="users" element={<UserList />} />
                <Route path="drivers" element={<DriverList />} />
                <Route path="bookings" element={<BookingList />} />

                <Route
                  path="reports/bookings"
                  element={<BookingReport />}
                />
                <Route
                  path="reports/revenue"
                  element={<RevenueReport />}
                />
                <Route
                  path="reports/drivers"
                  element={<DriverReport />}
                />
                <Route
                  path="reports/passengers"
                  element={<PassengerReport />}
                />
              </Route>
            </Route>
          </Route>

          {/* Driver Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<RoleRoute allowedRoles={["DRIVER"]} />}>
              <Route path="/driver" element={<DriverLayout />}>
                <Route index element={<DriverDashboard />} />
                <Route
                  path="dashboard"
                  element={<DriverDashboard />}
                />
                <Route
                  path="profile"
                  element={<DriverProfile />}
                />
                <Route
                  path="vehicle"
                  element={<Vehicle />}
                />
                <Route
                  path="location"
                  element={<Location />}
                />
                <Route
                  path="assigned-ride"
                  element={<AssignedRide />}
                />
              </Route>
            </Route>
          </Route>

          {/* Passenger Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<RoleRoute allowedRoles={["PASSENGER"]} />}>
              <Route path="/passenger" element={<PassengerLayout />}>
                <Route index element={<PassengerDashboard />} />
                <Route
                  path="dashboard"
                  element={<PassengerDashboard />}
                />
                <Route
                  path="book-ride"
                  element={<BookRide />}
                />
                <Route
                  path="ride-history"
                  element={<RideHistory />}
                />
                <Route
                  path="profile"
                  element={<Profile />}
                />
                <Route
                  path="payment"
                  element={<Payment />}
                />
                <Route
                  path="rating"
                  element={<Rating />}
                />
              </Route>
            </Route>
          </Route>

          {/* <Route path="*" element={<NotFound />} /> */}

        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </BrowserRouter>
    </AuthProvider>
  );
}