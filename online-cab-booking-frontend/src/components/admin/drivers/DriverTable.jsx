import {
  Eye,
  CheckCircle,
  XCircle,
  Ban,
  User,
  Mail,
  Phone,
  Car,
} from "lucide-react";

const DriverTable = ({
  drivers,
  onView,
  onApprove,
  onReject,
  onSuspend,
}) => {
  if (!drivers || drivers.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          No Drivers Found
        </h2>

        <p className="text-gray-500 mt-2">
          No driver records are available.
        </p>
      </div>
    );
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "BLOCK":
        return "bg-red-100 text-red-700";

      case "SUSPENDED":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Driver</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Vehicle</th>
              <th className="px-4 py-3 text-left">License</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {drivers.map((driver, index) => (
              <tr
                key={driver.id}
                className="border-b border-gray-100 transition-all duration-200 hover:bg-blue-50 hover:shadow-sm hover:-translate-y-0.5 cursor-pointer"
              >
                <td className="px-4 py-4">{index + 1}</td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <User size={18} className="text-blue-600" />
                    </div>

                    <div>
                      <h3 className="font-semibold">{driver.name}</h3>
                      <p className="text-xs text-gray-500">ID : {driver.id}</p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-gray-500" />
                    {driver.email}
                  </div>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-gray-500" />
                    {driver.phone}
                  </div>
                </td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <Car size={16} className="text-blue-600" />
                    {driver.vehicleNumber}
                  </div>
                </td>

                <td className="px-4 py-4">{driver.licenseNumber}</td>

                <td className="px-4 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(
                      driver.status
                    )}`}
                  >
                    {driver.status}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onView(driver)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                      title="View"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      onClick={() => onApprove(driver.id)}
                      className="bg-green-500 hover:bg-green-600 text-white p-2 rounded"
                      title="Approve"
                    >
                      <CheckCircle size={17} />
                    </button>

                    <button
                      onClick={() => onReject(driver.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                      title="BLOCK"
                    >
                      <XCircle size={17} />
                    </button>

                    <button
                      onClick={() => onSuspend(driver.id)}
                      className="bg-gray-700 hover:bg-gray-800 text-white p-2 rounded"
                      title="PENDING"
                    >
                      <Ban size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverTable;