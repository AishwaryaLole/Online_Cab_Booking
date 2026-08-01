import { Inbox } from "lucide-react";

const EmptyState = ({
  title = "No Data Found",
  description = "There are no records available.",
  buttonText,
  onButtonClick,
  icon,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-10">

      <div className="flex flex-col items-center justify-center text-center">

        {/* Icon */}

        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-5">

          {icon || (
            <Inbox
              size={42}
              className="text-blue-600"
            />
          )}

        </div>

        {/* Title */}

        <h2 className="text-2xl font-bold text-gray-800">
          {title}
        </h2>

        {/* Description */}

        <p className="text-gray-500 mt-3 max-w-md">
          {description}
        </p>

        {/* Button */}

        {buttonText && (

          <button
            onClick={onButtonClick}
            className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            {buttonText}
          </button>

        )}

      </div>

    </div>
  );
};

export default EmptyState;