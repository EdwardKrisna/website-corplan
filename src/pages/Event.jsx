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
import teamBuildingData from "../../team_building_team.json";
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
  const dresscodeRef = useRef(null);
  const teamRef = useRef(null);
  const teamBuildingRef = useRef(null);
  const roomRef = useRef(null);
  const participantsRef = useRef(null);
  const awardsRef = useRef(null);

  const [selectedDay, setSelectedDay] = useState("pra");
  const [selectedDresscodeGender, setSelectedDresscodeGender] = useState("man");
  const [dresscodeIndex, setDresscodeIndex] = useState(0);
  const [dresscodePopup, setDresscodePopup] = useState(null);

  // Dresscode reference images
  const dresscodeImages = {
    "Vintage/Retro": {
      man: [
        "/img/dresscode/man_vintage1.jpeg",
        "/img/dresscode/man_vintage2.jpeg",
        "/img/dresscode/man_vintage3.jpeg",
      ],
      woman: [
        "/img/dresscode/woman_vintage1.jpeg",
        "/img/dresscode/woman_vintage2.jpeg",
        "/img/dresscode/woman_vintage3.jpeg",
      ],
    },
  };

  // Get current dresscode images
  const currentDresscodeImages = dresscodeImages["Vintage/Retro"][selectedDresscodeGender];

  // Reset index when gender changes
  useEffect(() => {
    setDresscodeIndex(0);
  }, [selectedDresscodeGender]);

  // Auto-slide for dresscode images (stops when popup is open)
  useEffect(() => {
    if (dresscodePopup) return;

    const interval = setInterval(() => {
      setDresscodeIndex((prev) => (prev + 1) % currentDresscodeImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [dresscodePopup, currentDresscodeImages.length]);

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
        dresscodeRef.current,
        teamRef.current,
        teamBuildingRef.current,
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

  // ===============================
  // Team Building accordion + pagination
  // ===============================
  const [openTeamBuildingKey, setOpenTeamBuildingKey] = useState(null);

  const teamBuildingKeys = useMemo(() => {
    // Sort: Kelompok 1, 2, 3, ... 12
    const keys = Object.keys(teamBuildingData || {});
    return keys.sort((a, b) => {
      const na = parseInt(a.replace(/\D/g, ""), 10);
      const nb = parseInt(b.replace(/\D/g, ""), 10);
      if (Number.isNaN(na) || Number.isNaN(nb)) {
        return a.localeCompare(b);
      }
      return na - nb;
    });
  }, []);

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

  const {
    currentPage: teamBuildingPage,
    setCurrentPage: setTeamBuildingPage,
    totalPages: teamBuildingTotalPages,
    startIndex: teamBuildingStartIndex,
    endIndex: teamBuildingEndIndex,
    currentItems: currentTeamBuildingKeys,
    getPageNumbers: getTeamBuildingPageNumbers,
  } = usePagination(teamBuildingKeys, 6);

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

  const dresscodeInfo = {
    day1: {
      main: "Kemeja Putih dan Bawahan Bebas",
    },
    day2: {
      items: [
        { event: "Internal Training", dresscode: "Baju Kemeja RHR" },
        { event: "Gala Dinner", dresscode: "Vintage/Retro" },
      ],
    },
    day3: {
      main: "Pakaian Olahraga (Warna sesuai kelompok)",
    },
  };

  const getCurrentAgenda = () => {
    if (selectedDay === "pra") {
      return {
        day: pra_corporate_planning.day,
        date: "23 Januari 2026",
        location: pra_corporate_planning.location,
        locationKey: "Menara Kuningan",
        agenda: pra_corporate_planning.agenda,
        dresscode: null,
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
        dresscode: dresscodeInfo[`day${dayIndex + 1}`] || null,
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
            Acara Corporate Planning KJPP RHR 2026
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

            {currentAgenda.dresscode && (
              <div className="mt-3 p-3 bg-transparent/20 rounded-lg border border-transparent/20">
                <p className="text-sm sm:text-base font-semibold text-[#72b851] mb-1">
                  Dresscode
                </p>
                {currentAgenda.dresscode.main ? (
                  <p className="text-sm sm:text-base text-gray-300">
                    {currentAgenda.dresscode.main}
                  </p>
                ) : (
                  <div className="space-y-1">
                    {currentAgenda.dresscode.items.map((item, idx) => (
                      <p key={idx} className="text-sm sm:text-base text-gray-300">
                        <span className="text-white font-medium">{item.event}:</span> {item.dresscode}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}

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

      {/* Dresscode Reference Section */}
      <div ref={dresscodeRef} className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-10 sm:pb-16">
        <div className="text-center mb-6 sm:mb-12">
          <AnimatedTitle
            title="Dresscode Reference"
            containerClass="text-center mb-4 sm:mb-8 !text-3xl sm:!text-5xl md:!text-6xl"
          />
          <p className="text-white mt-3 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-bold tracking-wide leading-relaxed">
            Referensi dresscode untuk acara Corporate Planning KJPP RHR 2026
          </p>
        </div>

        {/* Vintage/Retro Theme */}
        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-gray-900/50 to-black/50 p-4 sm:p-6 backdrop-blur-sm border border-gray-800">
          <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 text-center">
            Vintage/Retro
          </h3>

          {/* Gender Toggle */}
          <div className="flex justify-center gap-2 mb-6">
            <button
              onClick={() => setSelectedDresscodeGender("man")}
              className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                selectedDresscodeGender === "man"
                  ? "bg-[#72b851] text-white shadow-lg"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              Man
            </button>
            <button
              onClick={() => setSelectedDresscodeGender("woman")}
              className={`px-4 py-2 sm:px-6 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                selectedDresscodeGender === "woman"
                  ? "bg-[#72b851] text-white shadow-lg"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              Woman
            </button>
          </div>

          {/* Image Slideshow */}
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black rounded-lg overflow-hidden shadow-2xl border border-gray-800">
              {/* Main Image */}
              <img
                src={currentDresscodeImages[dresscodeIndex]}
                alt={`Vintage/Retro ${selectedDresscodeGender} reference ${dresscodeIndex + 1}`}
                className="w-full h-full object-contain cursor-pointer transition-opacity duration-500"
                onClick={() => setDresscodePopup(currentDresscodeImages[dresscodeIndex])}
              />

              {/* Image Counter */}
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/70 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded backdrop-blur-sm border border-gray-700">
                <span className="font-light tracking-wider text-xs sm:text-sm">
                  {dresscodeIndex + 1} / {currentDresscodeImages.length}
                </span>
              </div>

              {/* Left Arrow */}
              <button
                onClick={() => setDresscodeIndex((prev) => (prev - 1 + currentDresscodeImages.length) % currentDresscodeImages.length)}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-gray-700"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Right Arrow */}
              <button
                onClick={() => setDresscodeIndex((prev) => (prev + 1) % currentDresscodeImages.length)}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-gray-700"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Click to enlarge hint */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm border border-gray-700">
                Click image to enlarge
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
              {currentDresscodeImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setDresscodeIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === dresscodeIndex
                      ? "w-8 sm:w-10 h-2 sm:h-3 bg-white"
                      : "w-2 sm:w-3 h-2 sm:h-3 bg-gray-600 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            {/* Auto-play indicator */}
            <p className="text-center text-gray-500 mt-3 sm:mt-4 text-xs sm:text-sm font-light tracking-wide">
              Auto-playing every 5 seconds
            </p>
          </div>
        </div>
      </div>

      {/* Dresscode Image Popup Modal */}
      {dresscodePopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setDresscodePopup(null)}
        >
          <button
            onClick={() => setDresscodePopup(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={dresscodePopup}
            alt="Dresscode reference"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Participants Section */}
      <div ref={participantsRef} className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-10 sm:pb-16">
        <Participants embedded />
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

      {/* Team Building Section */}
      <div ref={teamBuildingRef} className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-10 sm:pb-16">
        <div className="text-center mb-6 sm:mb-12">
          <AnimatedTitle
            title="Team Building"
            containerClass="text-center mb-4 sm:mb-8 !text-3xl sm:!text-5xl md:!text-6xl"
          />
          <p className="text-white mt-3 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-bold tracking-wide leading-relaxed">
            Pembagian tim untuk kegiatan Team Building Corporate Planning KJPP RHR 2026
          </p>
        </div>

        {/* Count */}
        <div className="mb-3 sm:mb-5">
          <p className="text-white font-bold text-xs sm:text-sm">
            Showing {teamBuildingKeys.length === 0 ? 0 : teamBuildingStartIndex + 1}-
            {Math.min(teamBuildingEndIndex, teamBuildingKeys.length)} of {teamBuildingKeys.length} teams
          </p>
        </div>

        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-b from-gray-900/50 to-black/50 p-3 sm:p-5 backdrop-blur-sm border border-gray-800">
          {teamBuildingKeys.length === 0 ? (
            <div className="bg-gray-800/40 rounded-lg p-3 border border-gray-700/50">
              <p className="text-xs sm:text-sm text-white">
                Informasi tim akan segera diumumkan
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {currentTeamBuildingKeys.map((key) => {
                const teamData = teamBuildingData[key] || {};
                const members = teamData.members || [];
                const warnaBaju = teamData.warna_baju || "";
                const isOpen = openTeamBuildingKey === key;

                return (
                  <TeamAccordion
                    key={key}
                    teamKey={key}
                    members={members}
                    theme={warnaBaju}
                    isOpen={isOpen}
                    onToggle={() => setOpenTeamBuildingKey((prev) => (prev === key ? null : key))}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Pagination */}
        {teamBuildingKeys.length > 0 && (
          <Pagination
            currentPage={teamBuildingPage}
            totalPages={teamBuildingTotalPages}
            getPageNumbers={getTeamBuildingPageNumbers}
            onPageChange={setTeamBuildingPage}
          />
        )}
      </div>

      {/* Pembagian Kamar Section - Hidden for now, uncomment to enable */}
      {/* <div ref={roomRef} className="relative z-10 mx-auto max-w-6xl px-4 pb-12 sm:px-10 sm:pb-16">
        <div className="text-center mb-6 sm:mb-12">
          <AnimatedTitle
            title="Pembagian Kamar"
            containerClass="text-center mb-4 sm:mb-8 !text-3xl sm:!text-5xl md:!text-6xl"
          />
          <p className="text-white mt-3 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-bold tracking-wide leading-relaxed">
            Pembagian kamar peserta Corporate Planning KJPP RHR 2026
          </p>
        </div>

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

        {roomRows.length > 0 && (
          <Pagination
            currentPage={roomPage}
            totalPages={roomTotalPages}
            getPageNumbers={getRoomPageNumbers}
            onPageChange={setRoomPage}
          />
        )}
      </div> */}

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