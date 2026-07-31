const StatusBadge = ({ status }) => {
  const getStatusStyle = () => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
      case "APPROVED":
      case "COMPLETED":
      case "PAID":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "ONGOING":
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-700";

      case "REJECTED":
      case "CANCELLED":
      case "FAILED":
        return "bg-red-100 text-red-700";

      case "SUSPENDED":
      case "INACTIVE":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusStyle()}`}
    >
      {status || "N/A"}
    </span>
  );
};

export default StatusBadge;