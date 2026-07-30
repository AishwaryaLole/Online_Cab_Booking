import { useEffect, useState } from "react";

import DashboardHeader from "../../components/passenger/DashboardHeader";
import DashboardCards from "../../components/passenger/DashboardCards";
import CurrentRide from "../../components/passenger/CurrentRide";
import RideStatistics from "../../components/passenger/RideStatistics";
import QuickActions from "../../components/passenger/QuickActions";


function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalRides: 0,
    completedRides: 0,
    cancelledRides: 0,
    totalSpent: 0,
    currentRide: null,
    recentRide: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      // Replace this with backend API in next step

      const response = {
        totalRides: 25,
        completedRides: 20,
        cancelledRides: 3,
        totalSpent: 4850,
        currentRide: {
          pickup: "Pune Railway Station",
          drop: "CDAC ACTS Pune",
          driver: "Rahul Sharma",
          vehicle: "MH12AB1234",
          status: "Driver Arriving",
        },
        recentRide: {
          date: "28 July 2026",
          fare: 250,
          pickup: "Shivaji Nagar",
          drop: "Hinjewadi Phase 1",
        },
      };

      setDashboardData(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
  <div className="flex justify-center items-center h-64">
  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
</div>
    );
  }

 return (
  <div className="p-6 bg-gray-100 min-h-screen">

      <DashboardHeader />

      <DashboardCards
        totalRides={dashboardData.totalRides}
        completedRides={dashboardData.completedRides}
        cancelledRides={dashboardData.cancelledRides}
        totalSpent={dashboardData.totalSpent}
      />

      <QuickActions />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

        <CurrentRide
          currentRide={dashboardData.currentRide}
        />

        <RideStatistics
          total={dashboardData.totalRides}
          completed={dashboardData.completedRides}
          cancelled={dashboardData.cancelledRides}
        />

      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">

  <h2 className="text-2xl font-bold text-gray-800 mb-5">
    Recent Ride
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <div>
      <p className="text-gray-500 text-sm">Pickup</p>
      <p className="font-semibold text-lg">
        {dashboardData.recentRide?.pickup}
      </p>
    </div>

    <div>
      <p className="text-gray-500 text-sm">Drop</p>
      <p className="font-semibold text-lg">
        {dashboardData.recentRide?.drop}
      </p>
    </div>

    <div>
      <p className="text-gray-500 text-sm">Date</p>
      <p className="font-semibold">
        {dashboardData.recentRide?.date}
      </p>
    </div>

    <div>
      <p className="text-gray-500 text-sm">Fare</p>
      <p className="font-semibold text-green-600 text-xl">
        ₹ {dashboardData.recentRide?.fare}
      </p>
    </div>

  </div>

</div>

</div>
  );
}

export default Dashboard;