import { useState } from "react";
import { giveRating } from "../../services/ratingService";
import { submitRating } from "../../services/passengerService";

function Rating() {
  const [form, setForm] = useState({
    rideId: "",
    passengerId: 2, // Temporary (replace after login integration)
    driverId: "",
    rating: 5,
    comments: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "rating"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await giveRating(form);

      alert(response.message);

      setForm({
        rideId: "",
        passengerId: 2,
        driverId: "",
        rating: 5,
        comments: "",
      });

    } catch (error) {
      console.error(error);
      alert("Failed to submit rating.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Rate Your Ride
        </h1>

        <p className="text-gray-500 mb-8">
          Share your experience with the driver.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block font-semibold mb-2">
              Ride ID
            </label>

            <input
              type="number"
              name="rideId"
              value={form.rideId}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Driver ID
            </label>

            <input
              type="number"
              name="driverId"
              value={form.driverId}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Rating
            </label>

            <select
              name="rating"
              value={form.rating}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
              <option value={4}>⭐⭐⭐⭐ (4)</option>
              <option value={3}>⭐⭐⭐ (3)</option>
              <option value={2}>⭐⭐ (2)</option>
              <option value={1}>⭐ (1)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Comments
            </label>

            <textarea
              rows="4"
              name="comments"
              value={form.comments}
              onChange={handleChange}
              className="w-full border rounded-xl p-3"
              placeholder="Write your feedback..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >
            Submit Rating
          </button>

        </form>

      </div>

    </div>
  );
}

export default Rating;