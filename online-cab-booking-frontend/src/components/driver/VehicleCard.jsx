const VehicleCard = ({ vehicle }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        🚗 Vehicle Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm text-gray-500">
            Vehicle Number
          </p>

          <h3 className="text-lg font-semibold">
            {vehicle?.vehicleNumber || "N/A"}
          </h3>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm text-gray-500">
            Vehicle Type
          </p>

          <h3 className="text-lg font-semibold">
            {vehicle?.vehicleType || "N/A"}
          </h3>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm text-gray-500">
            Model
          </p>

          <h3 className="text-lg font-semibold">
            {vehicle?.model || "N/A"}
          </h3>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm text-gray-500">
            Color
          </p>

          <h3 className="text-lg font-semibold">
            {vehicle?.color || "N/A"}
          </h3>
        </div>

      </div>

    </div>
  );
};

export default VehicleCard;