import { useEffect, useState } from "react";
import {
  Users,
  Car,
  CalendarCheck,
  DollarSign,
} from "lucide-react";

import StatCard from "../../components/admin/dashboard/StatCard";
import SummaryWidget from "../../components/admin/dashboard/SummaryWidget";
import adminService from "../../services/adminService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDrivers: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [activeDrivers, setActiveDrivers] = useState([]);
  const [pendingDrivers, setPendingDrivers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
     const loadDashboard = async () => {
    console.log("Dashboard mounted");
    console.log("Calling Dashboard API...");

    try {
      setLoading(true);

      const response = await adminService.getDashboardStats();

      console.log("Dashboard API Response:", response);

      const data = response.data;

      setStats({
        totalUsers: data.totalUsers || 0,
        totalDrivers: data.totalDrivers || 0,
        totalBookings: data.totalBookings || 0,
        totalRevenue: data.totalRevenue || 0,
      });

      setRecentBookings(data.recentBookings || []);
      setActiveDrivers(data.activeDrivers || []);
      setPendingDrivers(data.pendingDrivers || []);
    } catch (error) {
      console.error("Dashboard API Error:", error);
    } finally {
      setLoading(false);
    }
  };
    loadDashboard();
  }, []);

 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-lg font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">
          Welcome to Admin Dashboard
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users size={28} />}
          color="bg-blue-500"
        />

        <StatCard
          title="Total Drivers"
          value={stats.totalDrivers}
          icon={<Car size={28} />}
          color="bg-green-500"
        />

        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={<CalendarCheck size={28} />}
          color="bg-yellow-500"
        />

        <StatCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue}`}
          icon={<DollarSign size={28} />}
          color="bg-purple-500"
        />
      </div>

      {/* Summary Widgets */}
      <div className="grid lg:grid-cols-3 gap-6">
        <SummaryWidget
          title="Recent Bookings"
          items={recentBookings}
        />

        <SummaryWidget
          title="Active Drivers"
          items={activeDrivers}
        />

        <SummaryWidget
          title="Pending Drivers"
          items={pendingDrivers}
        />
      </div>
    </div>
  );
};

export default Dashboard;