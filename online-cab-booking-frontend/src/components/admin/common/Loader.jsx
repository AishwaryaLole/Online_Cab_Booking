const Loader = ({
  type = "page",
  text = "Loading...",
}) => {
  // ==========================
  // Button Loader
  // ==========================

  if (type === "button") {
    return (
      <span className="flex items-center justify-center gap-2">

        <span
          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
        />

        <span>{text}</span>

      </span>
    );
  }

  // ==========================
  // Inline Loader
  // ==========================

  if (type === "inline") {
    return (
      <div className="flex items-center justify-center gap-3 py-4">

        <div
          className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        />

        <span className="text-gray-600 font-medium">
          {text}
        </span>

      </div>
    );
  }

  // ==========================
  // Full Page Loader
  // ==========================

  return (
    <div className="flex flex-col items-center justify-center h-[70vh]">

      <div
        className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
      />

      <p className="mt-5 text-lg font-semibold text-gray-600">
        {text}
      </p>

    </div>
  );
};

export default Loader;