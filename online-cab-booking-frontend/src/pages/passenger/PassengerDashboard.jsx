
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



const PassengerDashboard = () => {


    const [passenger,setPassenger] = useState({});

    const navigate = useNavigate();



    useEffect(()=>{

        fetchProfile();

    },[]);



    const fetchProfile = async()=>{

        try{

            const data = await passengerService.getPassengerProfile();

            setPassenger(data);

        }
        catch(error){

            console.log(error);

        }

    };



    const logout = ()=>{

        localStorage.removeItem("token");

        navigate("/login");

    };




    return (

        <div className="min-h-screen bg-gray-100 p-6">


            {/* Navbar */}

            <div className="max-w-6xl mx-auto flex justify-between items-center bg-white p-5 rounded-xl shadow">


                <h1 className="text-2xl font-bold text-blue-600">
                    CabGo
                </h1>


                <button
                onClick={logout}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>


            </div>




            {/* Welcome Section */}

            <div className="max-w-6xl mx-auto mt-8">


                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8">


                    <h2 className="text-3xl font-bold">
                        Welcome, {passenger.name || "Passenger"} 👋
                    </h2>


                    <p className="mt-2">
                        Book your ride quickly and safely.
                    </p>


                    <Link
                    to="/book-ride"
                    className="inline-block mt-5 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold"
                    >
                        Book Ride
                    </Link>


                </div>



            </div>





            {/* Cards */}


            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mt-8">



                <div className="bg-white shadow rounded-xl p-6">

                    <h3 className="text-xl font-bold">
                        My Profile
                    </h3>


                    <p className="text-gray-500 mt-2">
                        View and update your details
                    </p>


                    <Link
                    to="/passenger/profile"
                    className="inline-block mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                        View Profile
                    </Link>


                </div>






                <div className="bg-white shadow rounded-xl p-6">

                    <h3 className="text-xl font-bold">
                        Ride History
                    </h3>


                    <p className="text-gray-500 mt-2">
                        Check your previous rides
                    </p>


                    <Link
                    to="/passenger/rides"
                    className="inline-block mt-4 bg-green-600 text-white px-5 py-2 rounded-lg"
                    >
                        View Rides
                    </Link>


                </div>






                <div className="bg-white shadow rounded-xl p-6">


                    <h3 className="text-xl font-bold">
                        Notifications
                    </h3>


                    <p className="text-gray-500 mt-2">
                        Check latest updates
                    </p>


                    <Link
                    to="/notifications"
                    className="inline-block mt-4 bg-purple-600 text-white px-5 py-2 rounded-lg"
                    >
                        Open
                    </Link>


                </div>



            </div>



        </div>

    );

};


export default PassengerDashboard;