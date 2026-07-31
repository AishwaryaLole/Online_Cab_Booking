import { useEffect, useMemo, useState } from "react";
import adminService from "../../../services/adminService";
import BookingTable from "../../../components/admin/bookings/BookingTable";
import BookingModal from "../../../components/admin/bookings/BookingModel";


const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBookings() {
    try {
      setLoading(true);

      const response = await adminService.getBookings();

      setBookings(response.data.data || []);

      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load bookings.");
    } finally {
      setLoading(false);
    }
  };
    loadBookings();
  }, []);

  

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const value = search.toLowerCase();

      const matchSearch =
        booking.bookingId?.toString().includes(value) ||
        booking.passengerName?.toLowerCase().includes(value) ||
        booking.driverName?.toLowerCase().includes(value);

      const matchStatus =
        status === "ALL" || booking.status === status;

      return matchSearch && matchStatus;
    });
  }, [bookings, search, status]);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg">
        Loading Bookings...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div>

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Booking Management
          </h1>

          <p className="text-gray-500">
            View and manage all bookings.
          </p>
        </div>

        <div className="flex gap-3">

          {/* Search */}

          <input
            type="text"
            placeholder="Search Booking..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-72 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Filter */}

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>

        </div>

      </div>

      {/* Table */}

      <BookingTable
        bookings={filteredBookings}
        onView={setSelectedBooking}
      />

      {/* Modal */}

      {selectedBooking && (
        <BookingModal
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}

    </div>
  );
};

export default BookingList;