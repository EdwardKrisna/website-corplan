const TeamAccordion = ({ teamKey, members, theme, isOpen, onToggle }) => {
  // Color mapping for warna_baju (shirt colors)
  const getColorClasses = (colorName) => {
    const colorMap = {
      "Merah": "bg-red-600/20 border-red-600/50 text-red-400",
      "Biru Tua": "bg-blue-800/20 border-blue-800/50 text-blue-300",
      "Oranye": "bg-orange-500/20 border-orange-500/50 text-orange-400",
      "Kuning": "bg-yellow-500/20 border-yellow-500/50 text-yellow-400",
      "Hijau": "bg-green-600/20 border-green-600/50 text-green-400",
      "Biru Muda": "bg-cyan-400/20 border-cyan-400/50 text-cyan-300",
      "Ungu": "bg-purple-600/20 border-purple-600/50 text-purple-400",
      "Pink": "bg-pink-500/20 border-pink-500/50 text-pink-400",
      "Coklat": "bg-amber-700/20 border-amber-700/50 text-amber-500",
      "Hitam": "bg-gray-700/20 border-gray-500/50 text-gray-300",
      "Abu-Abu": "bg-gray-500/20 border-gray-500/50 text-gray-400",
      "Putih": "bg-white/20 border-white/50 text-white",
    };
    return colorMap[colorName] || "bg-green-600/20 border-green-600/50 text-green-400";
  };

  return (
    <div className="rounded-lg border border-gray-700/50 bg-gray-800/30 overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-3 px-3 sm:px-4 py-3 hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <div className="text-left">
            <p className="text-xs sm:text-sm font-semibold text-white">
              {teamKey}
            </p>
            <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
              {members.length} member{members.length !== 1 ? "s" : ""}
            </p>
          </div>
          {theme && (
            <div className={`px-2 py-1 sm:px-3 sm:py-1 border rounded-full ${getColorClasses(theme)}`}>
              <p className="text-[10px] sm:text-xs font-medium">
                {theme}
              </p>
            </div>
          )}
        </div>

        <span
          className={`text-gray-400 text-xs sm:text-sm transition-transform flex-shrink-0 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-3 sm:px-4 pb-3 sm:pb-4">
          <div className="pt-2 border-t border-gray-700/50">
            {/* Mobile: list */}
            <ul className="sm:hidden mt-2 space-y-1">
              {members.map((m, i) => (
                <li key={i} className="text-xs text-gray-200">
                  {i + 1}. {m}
                </li>
              ))}
            </ul>

            {/* Desktop: 2-column grid */}
            <div className="hidden sm:grid mt-3 grid-cols-2 gap-x-6 gap-y-2">
              {members.map((m, i) => (
                <div key={i} className="text-xs sm:text-sm text-gray-200">
                  <span className="text-gray-500 mr-2">{i + 1}.</span>
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamAccordion;
