import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import MainLayout from "../layouts/MainLayout";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import PassengerRegister from "../pages/auth/PassengerRegister";
import  DriverRegister from "../pages/auth/DriverRegister";
import AdminDashboard from "../pages/admin/Dashboard";
import PassengerDashboard from "../pages/passenger/Dashboard";
import DriverDashboard from "../pages/driver/dashboard";


export default function AppRoutes() {
    return (
        <ThemeProvider>
        <AuthProvider>
        <BrowserRouter>
            <Routes>

            <Route element={<MainLayout />}>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register/passenger" element={<PassengerRegister/>} />
                <Route path="/register/driver" element={<DriverRegister/>} />
                <Route path="/admin/dashboard" element={<AdminDashboard/>} />
                <Route path="/passenger/dashboard" element={<PassengerDashboard/>} />
                <Route path="/driver/dashboard" element={<DriverDashboard/>} />

            </Route>

            
                
            </Routes>
        </BrowserRouter>
        </AuthProvider>
        </ThemeProvider>
    );
}