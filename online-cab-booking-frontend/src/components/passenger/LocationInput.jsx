import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation2, Loader2 } from "lucide-react";
import { searchLocation } from "../../services/mapService";

/**
 * Text input with a live dropdown of address suggestions (via OpenStreetMap/Nominatim).
 *
 * Props:
 *  - label: string
 *  - placeholder: string
 *  - value: string (the text currently typed/shown)
 *  - variant: "pickup" | "drop" (just controls the icon color)
 *  - onChange(text): called as the user types (raw text, no place chosen yet)
 *  - onSelect(place): called when the user picks a suggestion
 *      place = { label, lat, lng }
 */
export default function LocationInput({
  label,
  placeholder,
  value,
  variant = "pickup",
  onChange,
  onSelect,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const debounceRef = useRef(null);

  const Icon = variant === "drop" ? Navigation2 : MapPin;
  const iconColor = variant === "drop" ? "text-red-500" : "text-violet-600";

  // Debounced search as the user types
  useEffect(() => {
    if (!value || value.trim().length < 3) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const results = await searchLocation(value);
      setSuggestions(results || []);
      setLoading(false);
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (place) => {
    onSelect({
      label: place.display_name,
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
    });
    setSuggestions([]);
    setOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-sm font-medium text-gray-600 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconColor}`} />
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
        />
        {loading && (
          <Loader2
            size={15}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 animate-spin"
          />
        )}
      </div>

      {open && suggestions.length > 0 && (
        <ul className="absolute z-20 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-56 overflow-y-auto">
          {suggestions.map((place, idx) => (
            <li key={`${place.lat}-${place.lon}-${idx}`}>
              <button
                type="button"
                onClick={() => handleSelect(place)}
                className="w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-violet-50 flex items-start gap-2 border-b border-gray-50 last:border-b-0"
              >
                <MapPin size={14} className="text-gray-400 mt-0.5 shrink-0" />
                <span className="line-clamp-2">{place.display_name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && !loading && value.trim().length >= 3 && suggestions.length === 0 && (
        <div className="absolute z-20 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-lg px-3 py-2.5 text-sm text-gray-400">
          No matching places found.
        </div>
      )}
    </div>
  );
}
