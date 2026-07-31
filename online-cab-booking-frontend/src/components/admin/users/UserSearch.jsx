/*import { Search } from "lucide-react";

const UserSearch = ({ search, setSearch }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="relative">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search by Name, Email or Phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default UserSearch;*/


import { Search } from "lucide-react";
import { useState } from "react";


const UserSearch = ({ onSearch }) => {

  const [search, setSearch] = useState("");


  const handleChange = (e) => {

    const value = e.target.value;

    setSearch(value);

    // send value to parent if required
    if(onSearch){
      onSearch(value);
    }

  };


  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">

      <div className="flex items-center border rounded-lg px-3">

        <Search 
          size={20}
          className="text-gray-400"
        />

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={handleChange}
          className="w-full p-2 outline-none"
        />

      </div>

    </div>
  );
};


export default UserSearch;