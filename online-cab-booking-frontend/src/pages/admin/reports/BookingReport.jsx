import { useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

import adminService from "../../../services/adminService";

const BookingReport = () => {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
     async function loadReport(){
    try {
      setLoading(true);

      const response =
        await adminService.getBookingReport();

      setReports(response.data || response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
    loadReport();
  }, []);

 

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const keyword = search.toLowerCase();

      const searchMatch =
        report.bookingId
          ?.toString()
          .includes(keyword) ||
        report.passengerName
          ?.toLowerCase()
          .includes(keyword) ||
        report.driverName
          ?.toLowerCase()
          .includes(keyword);

      const statusMatch =
        status === "ALL" ||
        report.status === status;

      return searchMatch && statusMatch;
    });
  }, [reports, search, status]);

  const totalBookings = reports.length;

  const completed = reports.filter(
    (r) => r.status === "COMPLETED"
  ).length;

  const pending = reports.filter(
    (r) => r.status === "PENDING"
  ).length;

  const cancelled = reports.filter(
    (r) => r.status === "CANCELLED"
  ).length;

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading Report...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Heading */}

      <div>

        <h1 className="text-3xl font-bold">
          Booking Report
        </h1>

        <p className="text-gray-500">
          Booking statistics and history
        </p>

      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <div className="bg-blue-500 text-white rounded-xl p-5">

          <CalendarCheck size={30} />

          <h3 className="mt-3">
            Total Bookings
          </h3>

          <p className="text-3xl font-bold">
            {totalBookings}
          </p>

        </div>

        <div className="bg-green-500 text-white rounded-xl p-5">

          <CheckCircle size={30} />

          <h3 className="mt-3">
            Completed
          </h3>

          <p className="text-3xl font-bold">
            {completed}
          </p>

        </div>

        <div className="bg-yellow-500 text-white rounded-xl p-5">

          <Clock size={30} />

          <h3 className="mt-3">
            Pending
          </h3>

          <p className="text-3xl font-bold">
            {pending}
          </p>

        </div>

        <div className="bg-red-500 text-white rounded-xl p-5">

          <XCircle size={30} />

          <h3 className="mt-3">
            Cancelled
          </h3>

          <p className="text-3xl font-bold">
            {cancelled}
          </p>

        </div>

      </div>

      {/* Search & Filter */}

      <div className="flex flex-col md:flex-row gap-4">

        <input
          type="text"
          placeholder="Search Booking..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-lg px-4 py-2 flex-1"
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="border rounded-lg px-4 py-2"
        >
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">
            Completed
          </option>
          <option value="CANCELLED">
            Cancelled
          </option>
        </select>

      </div>

      {/* Report Table */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-4 py-3 text-left">
                Booking ID
              </th>

              <th className="px-4 py-3 text-left">
                Passenger
              </th>

              <th className="px-4 py-3 text-left">
                Driver
              </th>

              <th className="px-4 py-3 text-left">
                Fare
              </th>

              <th className="px-4 py-3 text-left">
                Date
              </th>

              <th className="px-4 py-3 text-center">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredReports.map((report) => (

              <tr
                key={report.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="px-4 py-3">
                  #{report.bookingId}
                </td>

                <td className="px-4 py-3">
                  {report.passengerName}
                </td>

                <td className="px-4 py-3">
                  {report.driverName}
                </td>

                <td className="px-4 py-3">
                  ₹ {report.fare}
                </td>

                <td className="px-4 py-3">
                  {report.bookingDate}
                </td>

                <td className="px-4 py-3 text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      report.status ===
                      "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : report.status ===
                          "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {report.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default BookingReport;