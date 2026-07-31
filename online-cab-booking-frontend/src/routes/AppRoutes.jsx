import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
import Dashboard from "../pages/admin/Dashboard";
import DriverList from "../pages/admin/drivers/DriverList";
import BookingList from "../pages/admin/bookings/BookingList";
import BookingReport from "../pages/admin/reports/BookingReport";
import RevenueReport from "../pages/admin/reports/RevenueReport";
import DriverReport from "../pages/admin/reports/DriverReport";
import PassengerReport from "../pages/admin/reports/PassengerReport";
import UserList from "../pages/admin/users/UserList";

import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

 


export default function AppRoutes() {

  return (
  
        <>
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
         {/* <Routes> */}

            /*----- Admin -------*/

      {/* Public Routes */}
      <Route element={<MainLayout />}></Route>
       {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<Dashboard/>} />
      {/* Users */}

          <Route
            path="users"
            element={<UserList/>}
          />

          {/* Drivers */}

          <Route
            path="drivers"
            element={<DriverList/>}
          />

          {/* Bookings */}

          <Route
            path="bookings"
            element={<BookingList/>}
          />

          {/* Reports */}

          <Route
            path="reports/bookings"
            element={<BookingReport/>}
          />

          <Route
            path="reports/revenue"
            element={<RevenueReport/>}
          />

          <Route
            path="reports/drivers"
            element={<DriverReport/>}
          />

          <Route
            path="reports/passengers"
            element={<PassengerReport/>}
          />

        </Route>
    </Routes>

    /* ---- driver ------- */


    /* ------- pasanger  -------- */

  
     
    
    </>
  );
}