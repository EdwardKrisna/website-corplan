const RoomTable = ({ rooms, startIndex }) => {
  return (
    <div className="hidden sm:block overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="pb-2 pr-3 text-xs sm:text-sm font-semibold text-white w-20">
              No
            </th>
            <th className="pb-2 text-xs sm:text-sm font-semibold text-white">
              Nama 1
            </th>
            <th className="pb-2 text-xs sm:text-sm font-semibold text-white">
              Nama 2
            </th>
          </tr>
        </thead>

        <tbody>
          {rooms.length === 0 ? (
            <tr className="border-b border-gray-800">
              <td className="py-2.5 pr-3 text-xs sm:text-sm text-gray-300 align-top">-</td>
              <td className="py-2.5 text-xs sm:text-sm text-white" colSpan={2}>
                Informasi akan segera diumumkan
              </td>
            </tr>
          ) : (
            rooms.map((row, idx) => (
              <tr
                key={`${row.no ?? "row"}-${idx}`}
                className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
              >
                <td className="py-2.5 pr-3 text-xs sm:text-sm text-gray-300 align-top">
                  {startIndex + idx + 1}
                </td>
                <td className="py-2.5 text-xs sm:text-sm text-white">
                  {row.nama_1 || "-"}
                </td>
                <td className="py-2.5 text-xs sm:text-sm text-white">
                  {row.nama_2 || "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoomTable;
