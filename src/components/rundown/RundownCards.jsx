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

const RundownCards = ({ activities }) => {
  return (
    <div className="sm:hidden space-y-2">
      {activities.map((item, index) => (
        <div
          key={index}
          className="bg-gray-800/40 rounded-lg p-3 border border-gray-700/50"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-white">
              {item.start}
              {item.end && item.end !== "end" && (
                <span className="text-gray-500"> - {item.end}</span>
              )}
            </span>
          </div>

          <p className="text-xs text-white leading-relaxed">
            {item.activity}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RundownCards;
