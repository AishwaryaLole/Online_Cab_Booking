import { UserSearch } from "lucide-react";
import { useEffect, useState } from "react";



const UserList = () => {

  const [users, setUsers] = useState([]);

  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    console.log("useEffect running");

    async function fetchUsers() {
      console.log("Calling API...");

      try {
        const response = await fetch("http://localhost:8080/api/admins/users");
        console.log("Response:", response.status);

        const result = await response.json();
        console.log(result.data);

        setUsers(result.data);
        setFilteredUsers(result.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchUsers();
  }, []);



  



  const handleSearch = (value) => {

    const searchValue = value.toLowerCase();


    const filtered = users.filter((user)=>{

      return (
        user.name?.toLowerCase().includes(searchValue) ||
        user.email?.toLowerCase().includes(searchValue) ||
        user.phone?.includes(searchValue)
      );

    });


    setFilteredUsers(filtered);

  };



  /*return (

    <div>


      <UserSearch
        onSearch={handleSearch}
      />


      <div className="bg-white rounded-lg shadow">


        {
          filteredUsers.map((user)=>(

            <div 
              key={user.id}
              className="p-4 border-b"
            >

              <h3>
                {user.name}
              </h3>

              <p>
                {user.email}
              </p>

              <p>
                {user.phone}
              </p>


            </div>

          ))
        }


      </div>


    </div>

  );

  };


export default UserList;*/




return (
  <div className="p-6">
    {/* Search Bar */}
    <div className="flex items-center gap-2 mb-6">
      <input
        type="text"
        placeholder="Search by name, email or phone..."
        onChange={(e) => handleSearch(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={() => {
          // Search already happens while typing.
          // This button is for UI consistency.
        }}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        <UserSearch size={18} />
        Search
      </button>
    </div>

    {/* User List */}
    <div className="bg-white rounded-lg shadow">
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <div
            key={user.id}
            className="p-4 border-b last:border-b-0"
          >
            <h3 className="font-semibold">{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </div>
        ))
      ) : (
        <p className="p-4 text-gray-500">No users found.</p>
      )}
    </div>
  </div>
);
};
export default UserList;