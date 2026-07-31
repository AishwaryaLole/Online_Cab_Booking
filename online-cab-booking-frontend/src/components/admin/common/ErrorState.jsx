import { AlertTriangle, RefreshCw } from "lucide-react";

const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't load the requested data. Please try again.",
  buttonText = "Retry",
  onRetry,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-10">

      <div className="flex flex-col items-center justify-center text-center">

        {/* Error Icon */}

        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-5">

          <AlertTriangle
            size={42}
            className="text-red-600"
          />

        </div>

        {/* Title */}

        <h2 className="text-2xl font-bold text-gray-800">
          {title}
        </h2>

        {/* Message */}

        <p className="mt-3 text-gray-500 max-w-lg">
          {message}
        </p>

        {/* Retry Button */}

        {onRetry && (

          <button
            onClick={onRetry}
            className="mt-6 flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            <RefreshCw size={18} />
            {buttonText}
          </button>

        )}

      </div>

    </div>
  );
};

export default ErrorState;