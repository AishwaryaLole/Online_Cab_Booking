import {
  Eye,
  Trash2,
  Mail,
  Phone,
  User,
} from "lucide-react";

const UserTable = ({ users, onView, onDelete }) => {
  if (!users || users.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-10 text-center">
        <h2 className="text-xl font-semibold text-gray-600">
          No Users Found
        </h2>

        <p className="text-gray-500 mt-2">
          There are no users available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          {/* Table Header */}

          <thead className="bg-gray-100">

            <tr>

              <th className="px-5 py-3 text-left">
                #
              </th>

              <th className="px-5 py-3 text-left">
                User
              </th>

              <th className="px-5 py-3 text-left">
                Email
              </th>

              <th className="px-5 py-3 text-left">
                Phone
              </th>

              <th className="px-5 py-3 text-left">
                Status
              </th>

              <th className="px-5 py-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          {/* Table Body */}

          <tbody>

            {users.map((user, index) => (

              <tr
                key={user.id}
                className="border-b hover:bg-gray-50"
              >

                {/* Serial */}

                <td className="px-5 py-4">
                  {index + 1}
                </td>

                {/* Name */}

                <td className="px-5 py-4">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">

                      <User
                        size={18}
                        className="text-blue-600"
                      />

                    </div>

                    <div>

                      <h3 className="font-semibold">
                        {user.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        ID : {user.id}
                      </p>

                    </div>

                  </div>

                </td>

                {/* Email */}

                <td className="px-5 py-4">

                  <div className="flex items-center gap-2">

                    <Mail
                      size={16}
                      className="text-gray-500"
                    />

                    {user.email}

                  </div>

                </td>

                {/* Phone */}

                <td className="px-5 py-4">

                  <div className="flex items-center gap-2">

                    <Phone
                      size={16}
                      className="text-gray-500"
                    />

                    {user.phone}

                  </div>

                </td>

                {/* Status */}

                <td className="px-5 py-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      user.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status || "ACTIVE"}
                  </span>

                </td>

                {/* Actions */}

                <td className="px-5 py-4">

                  <div className="flex justify-center gap-3">

                    {/* View */}

                    <button
                      onClick={() => onView(user)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                    >
                      <Eye size={18} />
                    </button>

                    {/* Delete */}

                    <button
                      onClick={() => onDelete(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default UserTable;