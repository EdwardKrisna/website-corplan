const RoomCards = ({ rooms, startIndex }) => {
  return (
    <div className="sm:hidden space-y-2">
      {rooms.length === 0 ? (
        <div className="bg-gray-800/40 rounded-lg p-3 border border-gray-700/50">
          <p className="text-xs text-white">
            Informasi pembagian kamar akan segera diumumkan
          </p>
        </div>
      ) : (
        rooms.map((row, idx) => (
          <div
            key={`${row.no ?? "row"}-${idx}`}
            className="bg-gray-800/40 rounded-lg p-3 border border-gray-700/50"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white font-medium">
                  #{startIndex + idx + 1}
                </p>
                <div className="mt-1 space-y-1">
                  {row.nama_1 && <p className="text-xs text-gray-200">{row.nama_1}</p>}
                  {row.nama_2 && <p className="text-xs text-gray-200">{row.nama_2}</p>}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RoomCards;
