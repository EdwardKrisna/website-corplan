const formatDuration = (duration) => {
  if (!duration) return "-";
  const [hours, minutes] = duration.split(":");
  const h = parseInt(hours);
  const m = parseInt(minutes);
  if (h > 0 && m > 0)
    return `${h} Hour${h > 1 ? "s" : ""} ${m} Minute${m > 1 ? "s" : ""}`;
  if (h > 0) return `${h} Hour${h > 1 ? "s" : ""}`;
  if (m > 0) return `${m} Minute${m > 1 ? "s" : ""}`;
  return "-";
};

const RundownTable = ({ activities }) => {
  return (
    <div className="hidden sm:block overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="pb-2 pr-3 text-xs sm:text-sm font-semibold text-white w-24 sm:w-32">
              Time
            </th>
            <th className="pb-2 text-xs sm:text-sm font-semibold text-white">
              Activity
            </th>
          </tr>
        </thead>

        <tbody>
          {activities.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
            >
              <td className="py-2.5 pr-3 text-xs sm:text-sm text-gray-300 align-top">
                {item.start}
                {item.end && item.end !== "end" && (
                  <span className="text-gray-500"> - {item.end}</span>
                )}
              </td>

              <td className="py-2.5 text-xs sm:text-sm text-white">
                {item.activity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RundownTable;
