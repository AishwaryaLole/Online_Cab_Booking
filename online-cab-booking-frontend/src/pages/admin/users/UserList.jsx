import { Trash2, UserSearch } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import adminService from "../../../services/adminService";
import UserModal from "../../../components/admin/users/UserModal";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await adminService.getUsers();
      const userList = Array.isArray(response?.data?.data) ? response.data.data : [];
      setUsers(userList);
      setFilteredUsers(userList);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  const handleSearch = (value) => {
    const searchValue = value.toLowerCase();
    const filtered = users.filter((user) => {
      return (
        user.name?.toLowerCase().includes(searchValue) ||
        user.email?.toLowerCase().includes(searchValue) ||
        user.phone?.includes(searchValue)
      );
    });

    setFilteredUsers(filtered);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
    setDeleteError("");
    setDeleteSuccess("");
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
    setDeleteError("");
    setDeleteSuccess("");
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
    setDeleteError("");
    setDeleteSuccess("");
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
    setSelectedUser(null);
    setDeleteError("");
    setDeleteSuccess("");
  };

  const handleUserUpdated = async (updatedUser) => {
    try {
      await adminService.updateUser(updatedUser.id, {
        name: updatedUser.name,
        phone: updatedUser.phone,
        email:updatedUser.email,
        address : updatedUser.address,
        role: updatedUser.role,
        isVerified: updatedUser.isVerified,
      });

      await fetchUsers();
      toast.success("User updated successfully.");
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || "Failed to update user.";
      toast.error(message);
    } finally {
      closeUserModal();
    }
  };

  const confirmDelete = async () => {
    if (!selectedUser?.id) return;

    setIsDeleting(true);
    setDeleteError("");
    setDeleteSuccess("");

    try {
      await adminService.deleteUser(selectedUser.id);
      closeDeleteModal();
      await fetchUsers();
      setDeleteSuccess("User deleted successfully.");
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || "Delete failed.";
      setDeleteError(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Search by name, email or phone..."
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="button"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <UserSearch size={18} />
          Search
        </button>
      </div>

      {deleteSuccess && (
        <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-700">
          {deleteSuccess}
        </div>
      )}

          <div className="space-y-3">
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <div
            key={user.id}
            className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => openUserModal(user)}
                className="flex-1 text-left"
              >
                <h3 className="font-semibold">{user.name}</h3>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p className="text-sm text-gray-500">
                  Role: <span className="font-medium">{user.role || "User"}</span>
                </p>
              </button>

              <button
                type="button"
                onClick={() => openDeleteModal(user)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="p-4 text-gray-500">No users found.</p>
      )}
    </div>

      {isDeleteModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 overflow-y-auto">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl max-h-[calc(100vh-3rem)] overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-900">Confirm Delete</h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{selectedUser.name}</span>?
            </p>

            {deleteError && (
              <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
                {deleteError}
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isUserModalOpen && selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={closeUserModal}
          onSave={handleUserUpdated}
        />
      )}
    </div>
  );
};

export default UserList;