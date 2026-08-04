import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IndianRupee,
  Wallet,
  CreditCard,
  CalendarDays,
} from "lucide-react";

import adminService from "../../../services/adminService";

const RevenueReport = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  const [summary, setSummary] = useState({
    totalRevenue: 0,
    paidPayments: 0,
    pendingPayments: 0,
  });

  useEffect(() => {
    async function loadRevenueReport() {
      try {
        setLoading(true);

        const response =
          await adminService.getRevenueReport();

        setReports(
          response.data.data.transactions || []
        );

        setSummary(
          response.data.data.summary || {
            totalRevenue: 0,
            paidPayments: 0,
            pendingPayments: 0,
          }
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadRevenueReport();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading Revenue Report...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      <div>
        <h1 className="text-3xl font-bold">
          Revenue Report
        </h1>

        <p className="text-gray-500">
          Revenue generated from completed rides.
        </p>
      </div>

      <div>

        <select
          value="/admin/reports/revenue"
          onChange={(e) => navigate(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2
                    bg-white shadow-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500"
        >
          <option value="/admin/reports/bookings">
            📖 Booking Report
          </option>

          <option value="/admin/reports/drivers">
            🚖 Driver Report
          </option>

          <option value="/admin/reports/revenue">
            💰 Revenue Report
          </option>

        </select>

      </div>

    </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-green-500 text-white rounded-xl p-6 shadow">

          <IndianRupee size={30} />

          <h3 className="mt-3">
            Total Revenue
          </h3>

          <p className="text-3xl font-bold">
  ₹ {Number(summary.totalRevenue || 0).toFixed(1)}
</p>

        </div>

        <div className="bg-blue-500 text-white rounded-xl p-6 shadow">

          <Wallet size={30} />

          <h3 className="mt-3">
            Paid Payments
          </h3>

          <p className="text-3xl font-bold">
            {summary.paidPayments}
          </p>

        </div>

        <div className="bg-yellow-500 text-white rounded-xl p-6 shadow">

          <CreditCard size={30} />

          <h3 className="mt-3">
            Pending Payments
          </h3>

          <p className="text-3xl font-bold">
            {summary.pendingPayments}
          </p>

        </div>

      </div>

      {/* Revenue Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="overflow-x-auto">

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
                  Amount
                </th>

                <th className="px-4 py-3 text-left">
                  Payment Status
                </th>

                <th className="px-4 py-3 text-left">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {reports.length > 0 ? (
                reports.map((report) => (

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

                   <td className="px-4 py-3 font-semibold">
                      ₹ {Number(report.amount || 0).toFixed(1)}
                    </td>

                    <td className="px-4 py-3">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          report.paymentStatus === "PAID"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {report.paymentStatus}
                      </span>

                    </td>

                    <td className="px-4 py-3">

                      <div className="flex items-center gap-2">

                        <CalendarDays size={16} />

                        {report.paymentDate}

                      </div>

                    </td>

                  </tr>

                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500"
                  >
                    No revenue records found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default RevenueReport;