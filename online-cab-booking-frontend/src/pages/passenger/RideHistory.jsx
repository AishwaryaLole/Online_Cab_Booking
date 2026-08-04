<<<<<<< HEAD
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getDriverRideHistory,
} from "../../services/rideService";



const RideHistory = () => {


  const [rides, setRides] = useState([]);

  const [loading, setLoading] = useState(true);





  useEffect(() => {

    fetchRideHistory();

  }, []);






  const fetchRideHistory = async () => {


    try {


      setLoading(true);



      const response =
        await getDriverRideHistory();



      setRides(
        response.data
      );



    } catch(error) {


      toast.error(
        "Failed to load ride history"
      );


    } finally {


      setLoading(false);


    }


  };








  if(loading){


    return (

      <div className="
        flex
        justify-center
        items-center
        h-[70vh]
      ">

        <h2 className="
          text-xl
          font-semibold
        ">

          Loading Ride History...

        </h2>


      </div>

    );


  }







  return (

    <div className="
      min-h-screen
      bg-gray-100
      p-6
    ">



      <div className="mb-8">


        <h1 className="
          text-3xl
          font-bold
        ">

          📜 Ride History

        </h1>



        <p className="
          text-gray-500
          mt-2
        ">

          View your completed rides and earnings.

        </p>


      </div>







      {
        rides.length === 0 ?


        (

          <div className="
            bg-white
            rounded-xl
            shadow
            p-10
            text-center
          ">


            <h2 className="
              text-2xl
              font-semibold
            ">

              No Completed Rides

            </h2>



            <p className="
              text-gray-500
              mt-2
            ">

              Your completed rides will appear here.

            </p>


          </div>


        )



        :



        (

          <div className="
            grid
            gap-5
          ">


          {
            rides.map(
              (ride)=>(


                <div

                  key={
                    ride.id
                  }

                  className="
                    bg-white
                    rounded-xl
                    shadow
                    p-6
                    border
                  "

                >


                  <div className="
                    flex
                    justify-between
                    items-center
                    mb-4
                  ">


                    <h2 className="
                      text-xl
                      font-bold
                    ">

                      Ride #{ride.id}

                    </h2>



                    <span className="
                      bg-green-100
                      text-green-700
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-semibold
                    ">

                      Completed

                    </span>


                  </div>






                  <p className="mb-2">

                    👤

                    <b>
                      Passenger:
                    </b>

                    {" "}
                    {ride.passengerName}

                  </p>




                  <p className="mb-2">

                    📍

                    <b>
                      Pickup:
                    </b>

                    {" "}
                    {ride.pickupAddress}

                  </p>





                  <p className="mb-2">

                    🏁

                    <b>
                      Drop:
                    </b>

                    {" "}
                    {ride.dropAddress}

                  </p>





                  <p className="mb-2">

                    💰

                    <b>
                      Earnings:
                    </b>

                    {" "}
                    ₹{ride.fare}

                  </p>





                  <p className="text-gray-500">

                    📅

                    {ride.completedAt}

                  </p>



                </div>


              )

            )

          }



          </div>


        )

      }




    </div>

  );

};

=======
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Search, X } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { getRideHistory, cancelRide } from "../../services/rideService";
import StatusBadge from "../../components/passenger/StatusBadge";
>>>>>>> 0a0591cd9d2f2167ec45a18eb85026850bf6a8e9

const FILTERS = ["ALL", "REQUESTED", "ASSIGNED", "ACCEPTED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

export default function RideHistory() {
  const { userId } = useAuth();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const loadRides = () => {
    if (!userId) return;
    setLoading(true);
    getRideHistory(userId)
      .then((res) => setRides(res?.data || []))
      .catch(() => toast.error("Failed to load ride history."))
      .finally(() => setLoading(false));
  };

  useEffect(loadRides, [userId]);

  const handleCancel = async (rideId) => {
    try {
      const res = await cancelRide(rideId);
      if (res.success) {
        toast.success("Ride cancelled.");
        loadRides();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not cancel ride.");
    }
  };

  const filteredRides = useMemo(() => {
    return rides
      .filter((r) => (filter === "ALL" ? true : r.status === filter))
      .filter((r) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          r.pickupLocation?.toLowerCase().includes(q) ||
          r.dropLocation?.toLowerCase().includes(q) ||
          String(r.id).includes(q)
        );
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [rides, search, filter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Ride history</h1>
        <p className="text-gray-500 text-sm mt-1">Search and filter your past trips.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ride, pickup, drop..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 focus:bg-white"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-gray-200 bg-gray-50 text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            {FILTERS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 uppercase border-b border-gray-100">
                <th className="py-3 pr-4">Ride ID</th>
                <th className="py-3 pr-4">Pickup</th>
                <th className="py-3 pr-4">Drop</th>
                <th className="py-3 pr-4">Fare</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Date</th>
                <th className="py-3 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400">
                    Loading rides...
                  </td>
                </tr>
              )}

              {!loading && filteredRides.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400">
                    No rides found.
                  </td>
                </tr>
              )}

              {!loading &&
                filteredRides.map((r) => (
                  <tr key={r.id} className="border-b border-gray-50 last:border-none">
                    <td className="py-3 pr-4 font-medium text-gray-700">RD-{r.id}</td>
                    <td className="py-3 pr-4 text-gray-600 max-w-[180px] truncate">{r.pickupLocation}</td>
                    <td className="py-3 pr-4 text-gray-600 max-w-[180px] truncate">{r.dropLocation}</td>
                    <td className="py-3 pr-4 font-medium text-gray-800">
                      {r.fare != null ? `₹${r.fare}` : "—"}
                    </td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={r.status} />
                    </td>
                    <td className="py-3 pr-4 text-gray-500">
                      {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="py-3 pr-4">
                      {(r.status === "REQUESTED" || r.status === "ASSIGNED") && (
                        <button
                          onClick={() => handleCancel(r.id)}
                          className="flex items-center gap-1 text-red-500 hover:text-red-600 text-xs font-semibold"
                        >
                          <X size={13} /> Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
