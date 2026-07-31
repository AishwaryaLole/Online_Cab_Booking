import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";


// Admin Pages




import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import DriverList from "../pages/admin/drivers/DriverList";
import BookingList from "../pages/admin/bookings/BookingList";
import BookingReport from "../pages/admin/reports/BookingReport";
import RevenueReport from "../pages/admin/reports/RevenueReport";
import DriverReport from "../pages/admin/reports/DriverReport";
import PassengerReport from "../pages/admin/reports/PassengerReport";
import UserList from "../pages/admin/users/UserList";


function AppRoutes() {
  return (
    <Routes>

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
  );
}

export default AppRoutes;