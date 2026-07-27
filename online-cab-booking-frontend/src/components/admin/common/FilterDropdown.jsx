const FilterDropdown = ({
  value,
  onChange,
  options = [],
  label = "",
}) => {
  return (
    <div className="flex items-center gap-3">

      {label && (
        <label className="font-medium text-gray-700">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2
        bg-white focus:outline-none focus:ring-2
        focus:ring-blue-500"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

    </div>
  );
};

export default FilterDropdown;