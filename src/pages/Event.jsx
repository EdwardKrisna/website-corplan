import { useMemo, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MapBoxRedirect from "../components/common/MapBoxRedirect";


gsap.registerPlugin(ScrollTrigger);
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AnimatedTitle from "../components/common/AnimatedTitle";
import DaySelector from "../components/rundown/DaySelector";
import RundownTable from "../components/rundown/RundownTable";
import RundownCards from "../components/rundown/RundownCards";
import TeamAccordion from "../components/rundown/TeamAccordion";
import RoomTable from "../components/rundown/RoomTable";
import RoomCards from "../components/rundown/RoomCards";
import GalaAwardsTable from "../components/rundown/GalaAwardsTable";
import Pagination from "../components/participants/Pagination";
import { usePagination } from "../hooks/usePagination";
import rundownData from "../../rundown_kegiatan_rev1.json";
import Participants from "./DaftarPeserta";
import pembagiankamarData from "../../pembagian_kamar.json";
import pembagianTeamData from "../../performance_team.json";
import galaAwardsData from "../../gala_awards_2026.json";

// ===== Helpers =====
const normalizeRoomRow = (row) => ({
  no: row?.no ?? null,
  no_kamar: row?.no_kamar ?? "-",
  lantai: row?.lantai ?? "-",
  nama_1: row?.nama_1 ?? null,
  nama_2: row?.nama_2 ?? null,
});

const getRoomRowsByGroup = (data, group) => {
  const rows = (data?.[group] || []).map(normalizeRoomRow);

  // optional sort by room numeric-friendly
  return rows.sort((a, b) => {
    const na = parseInt(a.no_kamar, 10);
    const nb = parseInt(b.no_kamar, 10);
    if (Number.isNaN(na) || Number.isNaN(nb)) {
      return String(a.no_kamar).localeCompare(String(b.no_kamar));
    }
    return na - nb;
  });
};

function Event() {
  const heroRef = useRef(null);
  const rundownRef = useRef(null);
  const teamRef = useRef(null);
  const roomRef = useRef(null);
  const participantsRef = useRef(null);
  const awardsRef = useRef(null);

  const [selectedDay, setSelectedDay] = useState("pra");

  // Page load animation (same as Publications page)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation on page load
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      // Scroll-triggered animations for sections
      const sections = [
        rundownRef.current,
        teamRef.current,
        roomRef.current,
        participantsRef.current,
        awardsRef.current,
      ];

      sections.forEach((section) => {
        if (section) {
          gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none none",
            },
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // ===============================
  // Rundown pagination
  // ===============================
  const [rundownPage, setRundownPage] = useState(1);
  const rundownItemsPerPage = 6;

  // Reset rundown page when day changes
  useEffect(() => {
    setRundownPage(1);
  }, [selectedDay]);

  // ===============================
  // Performance Team accordion + pagination
  // ===============================
  const [openTeamKey, setOpenTeamKey] = useState(null);

  const teamKeys = useMemo(() => {
    // Sort: Kelompok 1, 2, 3, ... 12
    const keys = Object.keys(pembagianTeamData || {});
    return keys.sort((a, b) => {
      const na = parseInt(a.replace(/\D/g, ""), 10);
      const nb = parseInt(b.replace(/\D/g, ""), 10);
      if (Number.isNaN(na) || Number.isNaN(nb)) {
        return a.localeCompare(b);
      }
      return na - nb;
    });
  }, []);

  const {
    currentPage: teamPage,
    setCurrentPage: setTeamPage,
    totalPages: teamTotalPages,
    startIndex: teamStartIndex,
    endIndex: teamEndIndex,
    currentItems: currentTeamKeys,
    getPageNumbers: getTeamPageNumbers,
  } = usePagination(teamKeys, 6);

  // ===============================
  // Pembagian Kamar filter + pagination
  // ===============================
  const [selectedRoomGroup, setSelectedRoomGroup] = useState("Partner");
  const roomGroups = useMemo(() => ["Partner", "Peserta", "Panitia"], []);

  const roomRows = useMemo(() => {
    return getRoomRowsByGroup(pembagiankamarData, selectedRoomGroup);
  }, [selectedRoomGroup]);

  const {
    currentPage: roomPage,
    setCurrentPage: setRoomPage,
    totalPages: roomTotalPages,
    startIndex: roomStartIndex,
    endIndex: roomEndIndex,
    currentItems: currentRoomRows,
    getPageNumbers: getRoomPageNumbers,
  } = usePagination(roomRows, 5);

  const locations = {
    "Menara Kuningan": { 
      lat: -6.21823500333064, 
      lng: 106.83068271853284,
      googleUrl: "https://www.google.com/maps/place/Menara+Kuningan/@-6.218235,106.828106,996m/data=!3m1!1e3!4m6!3m5!1s0x2e69f3cbd9ee81e7:0x730534af13796af4!8m2!3d-6.218235!4d106.8306809!16s%2Fg%2F11fp76bgbb?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D",
    },
    "R Hotel Rancamaya": {
      lat: -6.658684469347514,
      lng: 106.82344828177779,
      googleUrl: "https://www.google.com/maps/place/R+Hotel+Rancamaya/@-6.6586908,106.8234422,995m/data=!3m1!1e3!4m20!1m10!3m9!1s0x2e69c8dbd022ccf7:0x6e7acb1a875cfb7d!2sR+Hotel+Rancamaya!5m2!4m1!1i2!8m2!3d-6.6586908!4d106.8234422!16s%2Fg%2F1tfvw82p!3m8!1s0x2e69c8dbd022ccf7:0x6e7acb1a875cfb7d!5m2!4m1!1i2!8m2!3d-6.6586908!4d106.8234422!16s%2Fg%2F1tfvw82p?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D",
    },
  };

  const { event_name, pra_corporate_planning, corporate_planning } = rundownData;

  const getCurrentAgenda = () => {
    if (selectedDay === "pra") {
      return {
        day: pra_corporate_planning.day,
        date: "23 Januari 2026",
        location: pra_corporate_planning.location,
        locationKey: "Menara Kuningan",
        agenda: pra_corporate_planning.agenda,
      };
    } else {
      const dayIndex = parseInt(selectedDay.replace("day", "")) - 1;
      const dayData = corporate_planning.days[dayIndex];
      return {
        day: dayData.day,
        date: new Date(dayData.date).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        location: corporate_planning.location,
        locationKey: "R Hotel Rancamaya",
        agenda: dayData.agenda,
      };
    }
  };

  const currentAgenda = getCurrentAgenda();

  // Rundown pagination calculations
  const rundownTotalPages = Math.ceil(currentAgenda.agenda.length / rundownItemsPerPage) || 1;
  const rundownStartIndex = (rundownPage - 1) * rundownItemsPerPage;
  const rundownEndIndex = rundownStartIndex + rundownItemsPerPage;
  const currentRundownItems = currentAgenda.agenda.slice(rundownStartIndex, rundownEndIndex);

  return (
    <main
      className="relative min-h-screen w-screen overflow-x-hidden text-white"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/img/page-bg.JPG')",
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <Navbar />

      <div
        ref={heroRef}
        className="relative mt-4 sm:mt-14 flex min-h-[30vh] sm:min-h-[40vh] w-screen flex-col items-center justify-center overflow-hidden py-4 sm:py-8"
      >
        <div className="px-4 text-center sm:px-10">
          <div className="text-center mb-6 sm:mb-10">
            <AnimatedTitle
              title={event_name}
              containerClass="text-center mb-4 sm:mb-8 !text-4xl sm:!text-6xl md:!text-7xl"
            />
          </div>
          <p className="mb-3 mt-3 max-w-4xl mx-auto text-sm sm:text-base md:text-lg font-bold tracking-wide text-white">
            Jadwal lengkap kegiatan Corporate Planning KJPP RHR 2026
          </p>
        </div>
      </div>

      {/* Rundown Section */}
      <div ref={rundownRef} className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-10 sm:pb-16">
        <div className="text-center mb-6 sm:mb-12">
          <AnimatedTitle
            title="Rundown "
            containerClass="text-center mb-4 sm:mb-8 !text-3xl sm:!text-5xl md:!text-6xl"
          />
          <p className="text-white mt-3 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-bold tracking-wide leading-relaxed">
            The event of Corporate Planning KJPP RHR 2026
          </p>
        </div>

        <DaySelector
          selectedDay={selectedDay}
          onDayChange={setSelectedDay}
          totalDays={corporate_planning.days.length}
        />

        {/* Count */}
        <div className="mb-3 sm:mb-5">
          <p className="text-white font-bold text-xs sm:text-sm">
            Showing {currentAgenda.agenda.length === 0 ? 0 : rundownStartIndex + 1}-
            {Math.min(rundownEndIndex, currentAgenda.agenda.length)} of {currentAgenda.agenda.length} activities
          </p>
        </div>

        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-gray-900/50 to-black/50 p-3 sm:p-5 backdrop-blur-sm border border-gray-800">
          <div className="mb-3 sm:mb-5">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
              {currentAgenda.day}
            </h3>
            <p className="text-sm sm:text-base text-gray-300 mb-0.5">
              {currentAgenda.date}
            </p>
            <p className="text-sm sm:text-base text-gray-300 mb-1">
              {currentAgenda.location.venue}, {currentAgenda.location.city}
            </p>

            <MapBoxRedirect
              lat={locations[currentAgenda.locationKey].lat}
              lng={locations[currentAgenda.locationKey].lng}
              venue={`${currentAgenda.location.venue}, ${currentAgenda.location.city}`}
              googleUrl={locations[currentAgenda.locationKey].googleUrl}
            />



          </div>

          <RundownCards activities={currentRundownItems} />
          <RundownTable activities={currentRundownItems} />
        </div>

        {/* Pagination */}
        {currentAgenda.agenda.length > 0 && (
          <Pagination
            currentPage={rundownPage}
            totalPages={rundownTotalPages}
            getPageNumbers={() => {
              const pages = [];
              const maxPagesToShow = 5;

              if (rundownTotalPages <= maxPagesToShow) {
                for (let i = 1; i <= rundownTotalPages; i++) pages.push(i);
              } else {
                if (rundownPage <= 3) {
                  for (let i = 1; i <= 4; i++) pages.push(i);
                  pages.push("...");
                  pages.push(rundownTotalPages);
                } else if (rundownPage >= rundownTotalPages - 2) {
                  pages.push(1);
                  pages.push("...");
                  for (let i = rundownTotalPages - 3; i <= rundownTotalPages; i++) pages.push(i);
                } else {
                  pages.push(1);
                  pages.push("...");
                  pages.push(rundownPage - 1);
                  pages.push(rundownPage);
                  pages.push(rundownPage + 1);
                  pages.push("...");
                  pages.push(rundownTotalPages);
                }
              }
              return pages;
            }}
            onPageChange={setRundownPage}
          />
        )}
      </div>

      {/* Performance Team Section */}
      <div ref={teamRef} className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-10 sm:pb-16">
        <div className="text-center mb-6 sm:mb-12">
          <AnimatedTitle
            title="Performance Team"
            containerClass="text-center mb-4 sm:mb-8 !text-3xl sm:!text-5xl md:!text-6xl"
          />
          <p className="text-white mt-3 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-bold tracking-wide leading-relaxed">
            Tim penampilan untuk Corporate Planning KJPP RHR 2026
          </p>
        </div>

        {/* Count */}
        <div className="mb-3 sm:mb-5">
          <p className="text-white font-bold text-xs sm:text-sm">
            Showing {teamKeys.length === 0 ? 0 : teamStartIndex + 1}-
            {Math.min(teamEndIndex, teamKeys.length)} of {teamKeys.length} teams
          </p>
        </div>

        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-gray-900/50 to-black/50 p-3 sm:p-5 backdrop-blur-sm border border-gray-800">
          {teamKeys.length === 0 ? (
            <div className="bg-gray-800/40 rounded-lg p-3 border border-gray-700/50">
              <p className="text-xs sm:text-sm text-white">
                Informasi tim akan segera diumumkan
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {currentTeamKeys.map((key) => {
                const teamData = pembagianTeamData[key] || {};
                const members = teamData.members || [];
                const theme = teamData.theme || "";
                const isOpen = openTeamKey === key;

                return (
                  <TeamAccordion
                    key={key}
                    teamKey={key}
                    members={members}
                    theme={theme}
                    isOpen={isOpen}
                    onToggle={() => setOpenTeamKey((prev) => (prev === key ? null : key))}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Pagination */}
        {teamKeys.length > 0 && (
          <Pagination
            currentPage={teamPage}
            totalPages={teamTotalPages}
            getPageNumbers={getTeamPageNumbers}
            onPageChange={setTeamPage}
          />
        )}
      </div>

      {/* Pembagian Kamar Section */}
      <div ref={roomRef} className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-10 sm:pb-16">
        <div className="text-center mb-6 sm:mb-12">
          <AnimatedTitle
            title="Pembagian Kamar"
            containerClass="text-center mb-4 sm:mb-8 !text-3xl sm:!text-5xl md:!text-6xl"
          />
          <p className="text-white mt-3 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-bold tracking-wide leading-relaxed">
            Pembagian kamar peserta Corporate Planning KJPP RHR 2026
          </p>
        </div>

        {/* Group filter buttons */}
        <div className="mb-4 sm:mb-8 flex flex-wrap justify-center gap-1.5 sm:gap-2">
          {roomGroups.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedRoomGroup(g)}
              className={`rounded-lg px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium transition-all ${
                selectedRoomGroup === g
                  ? "bg-[#72b851] text-white shadow-lg"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Count */}
        <div className="mb-3 sm:mb-5">
          <p className="text-white font-bold text-xs sm:text-sm">
            Showing {roomRows.length === 0 ? 0 : roomStartIndex + 1}-
            {Math.min(roomEndIndex, roomRows.length)} of {roomRows.length} data{" "}
            <span className="text-white">({selectedRoomGroup})</span>
          </p>
        </div>

        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-gray-900/50 to-black/50 p-3 sm:p-5 backdrop-blur-sm border border-gray-800">
          <RoomCards rooms={currentRoomRows} startIndex={roomStartIndex} />
          <RoomTable rooms={currentRoomRows} startIndex={roomStartIndex} />
        </div>

        {/* Pagination */}
        {roomRows.length > 0 && (
          <Pagination
            currentPage={roomPage}
            totalPages={roomTotalPages}
            getPageNumbers={getRoomPageNumbers}
            onPageChange={setRoomPage}
          />
        )}
      </div>

      {/* Participants Section */}
      <div ref={participantsRef} className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-10 sm:pb-16">
        <Participants embedded />
      </div>

      {/* Gala Awards 2026 Section */}
      <div ref={awardsRef} className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-10 sm:pb-16">
        <div className="text-center mb-6 sm:mb-12">
          <AnimatedTitle
            title="Gala Awards 2026"
            containerClass="text-center mb-4 sm:mb-8 !text-3xl sm:!text-5xl md:!text-6xl"
          />
          <p className="text-white mt-3 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-bold tracking-wide leading-relaxed">
            Penghargaan untuk para peserta Corporate Planning KJPP RHR 2026
          </p>
        </div>

        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-gray-900/50 to-black/50 p-3 sm:p-5 backdrop-blur-sm border border-gray-800">
          <GalaAwardsTable awards={galaAwardsData} />
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default Event;
