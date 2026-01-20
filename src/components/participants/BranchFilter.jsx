const BranchFilter = ({ branches, selectedBranch, onBranchChange }) => {
  return (
    <div className="mb-4 sm:mb-8 text-center">
      <p className="text-white font-bold mb-2 sm:mb-3 text-xs sm:text-sm">Filter by Branch:</p>
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
        {branches.map((branch) => (
          <button
            key={branch}
            onClick={() => onBranchChange(branch)}
            className={`rounded-lg px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium transition-all ${
              selectedBranch === branch
                ? "bg-[#72b851] text-white shadow-lg"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            {branch}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BranchFilter;
