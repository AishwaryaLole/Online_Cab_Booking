import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import EarningsCard from "../../components/driver/EarningsCard";
import { getDriverEarnings } from "../../services/driverService";

const Earnings = () => {
  const [earnings, setEarnings] = useState({
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    total: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      setLoading(true);

      // Change 1 to the logged-in driver's ID once login is wired up
      const data = await getDriverEarnings(1);

      setEarnings(data);
    } catch (error) {
      console.error(error);
      // Backend endpoint isn't ready yet — fail quietly, keep zeros
      toast.error("Earnings API not available yet, showing ₹0.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh] gap-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Loading earnings...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Earnings</h1>
        <p className="text-gray-500 mt-1">Track how much you've earned.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <EarningsCard title="Today" value={`₹${earnings.today}`} color="green" />
        <EarningsCard title="This Week" value={`₹${earnings.thisWeek}`} color="blue" />
        <EarningsCard title="This Month" value={`₹${earnings.thisMonth}`} color="purple" />
        <EarningsCard title="Total Earnings" value={`₹${earnings.total}`} color="indigo" />
      </div>
    </div>
  );
};

export default Earnings;