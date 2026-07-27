import { Search, X } from "lucide-react";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
}) => {
  const clearSearch = () => {
    onChange("");
  };

  return (
    <div className="relative w-full max-w-md">

      {/* Search Icon */}

      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />

      {/* Input */}

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2
        focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Clear Button */}

      {value && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
        >
          <X size={18} />
        </button>
      )}

    </div>
  );
};

export default SearchBar;