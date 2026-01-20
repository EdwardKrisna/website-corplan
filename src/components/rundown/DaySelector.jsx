const DaySelector = ({ selectedDay, onDayChange, totalDays }) => {
  return (
    <div className="mb-4 sm:mb-8 flex flex-wrap justify-center gap-1.5 sm:gap-2">
      <button
        onClick={() => onDayChange("pra")}
        className={`rounded-lg px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium transition-all ${
          selectedDay === "pra"
            ? "bg-[#72b851] text-white shadow-lg"
            : "bg-gray-800 text-gray-400 hover:bg-gray-700"
        }`}
      >
        Pra Corplan
      </button>
      {Array.from({ length: totalDays }, (_, index) => (
        <button
          key={index}
          onClick={() => onDayChange(`day${index + 1}`)}
          className={`rounded-lg px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium transition-all ${
            selectedDay === `day${index + 1}`
              ? "bg-[#72b851] text-white shadow-lg"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
          }`}
        >
          Hari {index + 1}
        </button>
      ))}
    </div>
  );
};

export default DaySelector;
