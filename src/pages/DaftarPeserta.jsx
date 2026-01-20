import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AnimatedTitle from "../components/common/AnimatedTitle";
import BranchFilter from "../components/participants/BranchFilter";
import ParticipantsTable from "../components/participants/ParticipantsTable";
import ParticipantsCards from "../components/participants/ParticipantsCards";
import Pagination from "../components/participants/Pagination";
import { usePagination } from "../hooks/usePagination";
import { useRoomIndex } from "../hooks/useRoomIndex";
import participantsData from "../../participants.json";
import pembagiankamarData from "../../pembagian_kamar.json";

function Participants({ embedded = false }) {
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [branches, setBranches] = useState([]);

  const itemsPerPage = embedded ? 8 : 10;

  // Use custom hooks
  const { getRoomInfoByName } = useRoomIndex(pembagiankamarData);
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    currentItems: currentParticipants,
    getPageNumbers,
  } = usePagination(filteredParticipants, itemsPerPage);

  useEffect(() => {
    // Extract unique branches
    const uniqueBranches = ["All", ...new Set(participantsData.map((p) => p.Cabang))];
    setBranches(uniqueBranches);
    setFilteredParticipants(participantsData);
  }, []);

  useEffect(() => {
    // Filter participants based on selected branch
    if (selectedBranch === "All") {
      setFilteredParticipants(participantsData);
    } else {
      setFilteredParticipants(participantsData.filter((p) => p.Cabang === selectedBranch));
    }
  }, [selectedBranch]);

  const content = (
    <div className={`text-white ${embedded ? "" : "min-h-screen pt-2 pb-16 sm:pt-16"}`}>
      {/* Hero Section */}
      <div className={`text-center ${embedded ? "mb-6 sm:mb-12" : "container mx-auto px-4 mb-12"}`}>
        <AnimatedTitle
          title="Participants"
          containerClass={embedded ? "!text-3xl sm:!text-5xl md:!text-6xl mb-4 sm:mb-8" : ""}
        />
        <p
          className={`text-white mt-3 ${
            embedded
              ? "text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-bold tracking-wide leading-relaxed"
              : "text-lg font-bold"
          }`}
        >
          Daftar peserta Corporate Planning KJPP RHR 2026
        </p>
      </div>

      {/* Branch Filter */}
      <div className={`${embedded ? "mb-4 sm:mb-8" : "container mx-auto px-4 mb-8"}`}>
        <BranchFilter
          branches={branches}
          selectedBranch={selectedBranch}
          onBranchChange={setSelectedBranch}
        />
      </div>

      {/* Participants Count */}
      <div className={`${embedded ? "mb-3 sm:mb-5" : "container mx-auto px-4 mb-6"}`}>
        <p className="text-white font-bold text-xs sm:text-sm">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredParticipants.length)} of{" "}
          {filteredParticipants.length} participant{filteredParticipants.length !== 1 ? "s" : ""}
          {selectedBranch !== "All" && ` from kantor cabang ${selectedBranch}`}
        </p>
      </div>

      <div
        className={`${
          embedded
            ? "rounded-xl sm:rounded-2xl bg-gradient-to-b from-gray-900/50 to-black/50 p-3 sm:p-5 backdrop-blur-sm border border-gray-800"
            : ""
        }`}
      >
        {/* Participants - Mobile Card Layout */}
        <ParticipantsCards
          participants={currentParticipants}
          startIndex={startIndex}
          getRoomInfo={getRoomInfoByName}
        />

        {/* Participants Table - Desktop */}
        <ParticipantsTable
          participants={currentParticipants}
          startIndex={startIndex}
          getRoomInfo={getRoomInfoByName}
        />
      </div>

      {/* No Results */}
      {filteredParticipants.length === 0 && (
        <div className={`text-center ${embedded ? "py-8" : "py-12"}`}>
          <p className="text-gray-500 text-sm">No participants found for the selected branch</p>
        </div>
      )}

      {/* Pagination */}
      {filteredParticipants.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          getPageNumbers={getPageNumbers}
          onPageChange={setCurrentPage}
          embedded={embedded}
        />
      )}
    </div>
  );

  if (embedded) return content;

  return (
    <main
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/img/page-bg.JPG')",
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <Navbar />
      <div className="relative z-10">{content}</div>
      <Footer />
    </main>
  );
}

export default Participants;
