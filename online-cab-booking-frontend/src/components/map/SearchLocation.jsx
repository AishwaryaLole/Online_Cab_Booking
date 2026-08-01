import { useState, useRef } from "react";
import { searchPlace } from "../../services/mapService";

export default function SearchLocation({ placeholder, onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showList, setShowList] = useState(false);
  const timerRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    clearTimeout(timerRef.current);
    if (value.trim().length < 3) { setResults([]); return; }

    timerRef.current = setTimeout(async () => {
      const res = await searchPlace(value);
      if (res.success) { setResults(res.data); setShowList(true); }
    }, 500);
  };

  const handleSelect = (place) => {
    setQuery(place.display_name);
    setShowList(false);
    onSelect({ address: place.display_name, latitude: parseFloat(place.lat), longitude: parseFloat(place.lon) });
  };

  return (
    <div className="relative">
      <input value={query} onChange={handleChange} placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
      {showList && results.length > 0 && (
        <ul className="absolute z-[1000] bg-white border border-gray-200 rounded-lg mt-1 w-full max-h-52 overflow-auto shadow-lg">
          {results.map((place) => (
            <li key={place.place_id} onClick={() => handleSelect(place)}
              className="px-3 py-2 text-sm hover:bg-indigo-50 cursor-pointer">
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}