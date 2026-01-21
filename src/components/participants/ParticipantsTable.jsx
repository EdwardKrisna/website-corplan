const ParticipantsTable = ({ participants, startIndex }) => {
  return (
    <div className="hidden sm:block overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="pb-2 pr-3 text-xs sm:text-sm font-semibold text-white w-24 sm:w-32">
              No
            </th>
            <th className="pb-2 pr-3 text-xs sm:text-sm font-semibold text-white">
              Name
            </th>
            <th className="pb-2 text-xs sm:text-sm font-semibold text-white">
              Branch
            </th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant, index) => (
            <tr
              key={index}
              className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
            >
              <td className="py-2.5 pr-3 text-xs sm:text-sm text-gray-300 align-top">
                {startIndex + index + 1}
              </td>
              <td className="py-2.5 pr-3 text-xs sm:text-sm text-white">
                {participant.Nama}
              </td>
              <td className="py-2.5 text-xs sm:text-sm text-gray-400">
                {participant.Cabang}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParticipantsTable;
