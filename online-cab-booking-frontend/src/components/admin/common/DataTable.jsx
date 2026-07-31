const DataTable = ({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "No records found.",
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-10 text-center">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="bg-white rounded-lg shadow p-10 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-100">

            <tr>

              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className="px-4 py-3 text-left font-semibold"
                >
                  {column.header}
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {data.map((row, index) => (

              <tr
                key={row.id || index}
                className="border-b hover:bg-gray-50"
              >

                {columns.map((column) => (

                  <td
                    key={column.accessor}
                    className="px-4 py-3"
                  >
                    {column.render
                      ? column.render(row)
                      : row[column.accessor]}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default DataTable;