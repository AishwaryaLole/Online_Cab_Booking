import { useEffect, useState } from "react";

import DashboardHeader from "../../components/passenger/DashboardHeader";
import DashboardCards from "../../components/passenger/DashboardCards";
import CurrentRide from "../../components/passenger/CurrentRide";
import RideStatistics from "../../components/passenger/RideStatistics";
import QuickActions from "../../components/passenger/QuickActions";

import { getRideHistory } from "../../services/passengerService";

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
      // Replace with logged-in user ID later
      const passengerId = 2;

      const response = await getRideHistory(passengerId);

      const rides = response.data || [];

      const completedRides = rides.filter(
        (ride) => ride.status === "COMPLETED"
      );

      const cancelledRides = rides.filter(
        (ride) => ride.status === "CANCELLED"
      );

      const currentRide =
        rides.find(
          (ride) =>
            ride.status === "REQUESTED" ||
            ride.status === "ACCEPTED" ||
            ride.status === "IN_PROGRESS"
        ) || null;

      const recentRide = rides.length > 0 ? rides[0] : null;

      const totalSpent = completedRides.reduce(
        (sum, ride) => sum + (ride.fare || 0),
        0
      );

      setDashboardData({
        totalRides: rides.length,
        completedRides: completedRides.length,
        cancelledRides: cancelledRides.length,
        totalSpent,
        currentRide,
        recentRide,
      });
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
        <CurrentRide currentRide={dashboardData.currentRide} />

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

        {dashboardData.recentRide ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-sm">Pickup</p>
              <p className="font-semibold text-lg">
                {dashboardData.recentRide.pickupLocation}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Drop</p>
              <p className="font-semibold text-lg">
                {dashboardData.recentRide.dropLocation}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Date</p>
              <p className="font-semibold">
                {new Date(
                  dashboardData.recentRide.createdAt
                ).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Fare</p>
              <p className="font-semibold text-green-600 text-xl">
                ₹ {dashboardData.recentRide.fare ?? "Not Available"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Status</p>
              <p className="font-semibold text-blue-600">
                {dashboardData.recentRide.status}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No rides available.
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;