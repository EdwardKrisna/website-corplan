const ParticipantsCards = ({ participants, startIndex }) => {
  return (
    <div className="sm:hidden space-y-2">
      {participants.map((participant, index) => (
        <div key={index} className="bg-gray-800/40 rounded-lg p-3 border border-gray-700/50">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{participant.Nama}</p>
              <p className="text-gray-500 text-xs mt-0.5">{participant.Cabang}</p>
            </div>
            <span className="text-gray-600 text-xs">#{startIndex + index + 1}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParticipantsCards;
