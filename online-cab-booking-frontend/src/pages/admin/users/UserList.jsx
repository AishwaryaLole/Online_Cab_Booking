import { useEffect, useMemo, useState } from "react";
import adminService from "../../../services/adminService";
import UserSearch from "../../../components/admin/users/UserSearch";
import UserTable from "../../../components/admin/users/UserTable";
import UserModal from "../../../components/admin/users/UserModal";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
      async function fetchUsers() {
    try {
      setLoading(true);
      setError("");

      const response = await adminService.getUsers();

      // Supports both array response and {data:[]}
      setUsers(response.data || response);
    } catch (err) {
      console.error(err);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };
    fetchUsers();
  }, []);



  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await adminService.deleteUser(id);

      setUsers((prev) =>
        prev.filter((user) => user.id !== id)
      );

      alert("User deleted successfully.");
    } catch (err) {
      console.error(err);
      alert("Unable to delete user.");
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const value = search.toLowerCase();

      return (
        user.name?.toLowerCase().includes(value) ||
        user.email?.toLowerCase().includes(value) ||
        user.phone?.toLowerCase().includes(value)
      );
    });
  }, [users, search]);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg">
        Loading Users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div>

      {/* Page Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            User Management
          </h1>

          <p className="text-gray-500">
            View and manage all registered users.
          </p>
        </div>

      </div>

      {/* Search */}

      <UserSearch
        search={search}
        setSearch={setSearch}
      />

      {/* Table */}

      <UserTable
        users={filteredUsers}
        onView={setSelectedUser}
        onDelete={deleteUser}
      />

      {/* Modal */}

      {selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

    </div>
  );
};

export default UserList;