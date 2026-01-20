import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import RHRGreenIdea from "./RHRGreenIdea";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AnimatedTitle from "../components/common/AnimatedTitle";

const publications = [
  {
    id: 1,
    title: "Template",
    subtitle: "Paper Competition Template",
    description:
      "Access the official template for paper competition submissions. This standardized format ensures consistency and professionalism across all submissions.",
    icon: "📄",
    driveLink: "/documents/template_jurnal.docx",
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: 2,
    title: "Presentasi Pre Corplan",
    subtitle: "Pre Corporate Planning Presentations",
    description:
      "Review preliminary presentations and strategic discussions leading up to the main Corporate Planning event.",
    icon: "📊",
    driveLink: "/documents/presentasi-pre-corplan.pptx",
    color: "from-purple-600 to-pink-600",
  },
  {
    id: 3,
    title: "Presentasi Corplan",
    subtitle: "Corporate Planning Presentations",
    description:
      "Access the complete collection of Corporate Planning presentations, showcasing strategic initiatives and organizational direction.",
    icon: "📈",
    driveLink: "/documents/presentasi-corplan.pptx",
    color: "from-green-600 to-teal-600",
  },
];

const topics = [
  {
    title: "Implementasi SPM",
    description:
      "Masukan dan strategi terkait penerapan SPM sehingga standar mutu seluruh proses pekerjaan dan operasional di KJPP RHR dapat lebih baik",
  },
  {
    title: "Pelaksanaan Proses Penilaian",
    description:
      "Masukan dan strategi dalam menjaga pemenuhan SPI dan proses penilaian termasuk untuk meningkatkan dan memastikan penilai dalam melaksanakan KEPI SPI",
  },
  {
    title: "Riset dan Analisis",
    description:
      "Strategi dan ide untuk meningkatkan kualitas analisis dan efisiensi pekerjaan mendukung kualitas penilaian",
  },
];

function RHRPublication() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [expandedCard, setExpandedCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);

  // Page load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCardClick = (pubId) => {
    if (isMobile) {
      setExpandedCard(expandedCard === pubId ? null : pubId);
    }
  };

  return (
    <main
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/img/page-bg.JPG')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full pt-2 sm:pt-16 z-10">
        <div ref={heroRef} className="container mx-auto px-4 sm:px-5 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <AnimatedTitle
              title="Publications"
              containerClass="text-center mb-4 sm:mb-6"
            />
            <p className="text-gray-300 mt-3 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-light tracking-wide leading-relaxed">
              Explore our comprehensive collection of templates, presentations,
              and innovative ideas driving excellence at KJPP RHR
            </p>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto mb-12 sm:mb-16">
            {publications.map((pub) => (
              <div
                key={pub.id}
                className={`group relative bg-gray-900 border border-gray-800 rounded-lg sm:rounded-xl overflow-hidden hover:border-gray-600 hover:shadow-2xl hover:shadow-white/10 ${
                  isMobile && expandedCard === pub.id
                    ? "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md max-h-[80vh] overflow-y-auto animate-popup"
                    : isMobile
                    ? ""
                    : "transition-all duration-300"
                }`}
                onMouseEnter={() => !isMobile && setHoveredCard(pub.id)}
                onMouseLeave={() => !isMobile && setHoveredCard(null)}
                onClick={() => handleCardClick(pub.id)}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${pub.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative p-4 sm:p-5 md:p-6">
                  {/* Minimized Mobile View */}
                  {isMobile && expandedCard !== pub.id ? (
                    <div className="flex items-center gap-4">
                      <div className="text-3xl flex-shrink-0">
                        {pub.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white text-base font-light tracking-wide mb-1 truncate">
                          {pub.title}
                        </h3>
                        <p className="text-gray-400 text-xs font-light tracking-wider truncate">
                          {pub.subtitle}
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-gray-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  ) : (
                    /* Full View (Desktop or Expanded Mobile) */
                    <>
                      {isMobile && expandedCard === pub.id && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedCard(null);
                          }}
                          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      )}

                      <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
                        {pub.icon}
                      </div>

                      <h3 className="text-white text-base sm:text-lg md:text-xl font-light tracking-wide mb-1.5 sm:mb-2">
                        {pub.title}
                      </h3>

                      <p className="text-gray-400 text-xs sm:text-sm font-light tracking-wider mb-2 sm:mb-3">
                        {pub.subtitle}
                      </p>

                      <p className="text-gray-500 text-xs sm:text-sm font-light leading-relaxed mb-4 sm:mb-5">
                        {pub.description}
                      </p>

                      <a
                        href={pub.driveLink}
                        download={
                          pub.id === 1 ? "template_jurnal.docx" :
                          pub.id === 2 ? "presentasi-pre-corplan.pptx" :
                          pub.id === 3 ? "presentasi-corplan.pptx" : undefined
                        }
                        onClick={(e) => isMobile && e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-white bg-transparent border border-gray-700 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-light tracking-wider transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
                      >
                        <svg
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                        Download Files
                      </a>
                    </>
                  )}
                </div>

                {/* Hover Border Effect (Desktop only) */}
                {!isMobile && (
                  <div
                    className={`absolute inset-0 border-2 border-white rounded-lg sm:rounded-xl pointer-events-none transition-opacity duration-300 ${hoveredCard === pub.id ? "opacity-100" : "opacity-0"}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Backdrop for expanded mobile card */}
          {isMobile && expandedCard !== null && (
            <div
              className="fixed inset-0 bg-black/80 z-40 animate-fadeIn"
              onClick={() => setExpandedCard(null)}
            />
          )}

          {/* RHR Root & Rise Idea Section */}
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-6 sm:mb-10">
              <div className="inline-block bg-gradient-to-r from-green-600 to-teal-600 text-transparent bg-clip-text mb-2 sm:mb-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                  RHR ROOT & RISE IDEA
                </h2>
              </div>
              <p className="text-gray-400 text-sm sm:text-base font-light tracking-wide mt-2">
                Paper Competition 2026
              </p>
            </div>

            {/* Theme Banner */}
            <div className="relative bg-gradient-to-r from-green-900/30 to-teal-900/30 border border-green-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />

              <div className="relative text-center">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white mb-2 sm:mb-3 tracking-wide">
                  "Rooted Responsibility, Flourishing Transformation"
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm md:text-base font-light italic max-w-4xl mx-auto leading-relaxed">
                  Pertumbuhan kita bukan hanya soal angka, tapi tanggung jawab.
                  Melalui setiap tindakan kecil, kita membangun dampak yang tak
                  terhapuskan bagi industri dan masyarakat
                </p>
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>30 Jan – 1 Feb 2026</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Presentasi: 31 Jan 2026</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex justify-center gap-1.5 sm:gap-2 md:gap-3 mb-6 sm:mb-8 flex-wrap">
              {["overview", "topics", "rules"].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-3 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-lg text-xs sm:text-sm font-light tracking-wider transition-all duration-300 ${
                    activeSection === section
                      ? "bg-white text-black"
                      : "bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-600"
                  }`}
                >
                  {section === "overview" && <span className="hidden sm:inline">Latar Belakang & Tujuan</span>}
                  {section === "overview" && <span className="sm:hidden">Latar Belakang</span>}
                  {section === "topics" && "Topik Lomba"}
                  {section === "rules" && "Ketentuan"}
                </button>
              ))}
            </div>

            {/* Content Sections */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
              {activeSection === "overview" && (
                <div className="space-y-6 sm:space-y-8">
                  {/* Background */}
                  <div>
                    <h4 className="text-base sm:text-lg md:text-xl font-light text-white mb-3 sm:mb-4 flex items-center gap-2">
                      <span className="text-xl sm:text-2xl">🌱</span>
                      Latar Belakang
                    </h4>
                    <div className="space-y-2 sm:space-y-3 text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
                      <p>
                        Tema CORPLAN{" "}
                        <span className="text-green-400">
                          "Rooted Responsibility, Flourishing Transformation"
                        </span>{" "}
                        menegaskan bahwa setiap individu di KJPP RHR memiliki
                        peran dan tanggung jawab dalam membangun transformasi
                        organisasi yang berakar pada nilai profesionalisme.
                      </p>
                      <p>
                        Upaya RHR untuk mendukung peningkatan mutu dan
                        transformasi keberlanjutan di KJPP RHR melalui masukan,
                        ide, dan solusi terhadap proses kerja.
                      </p>
                    </div>
                  </div>

                  {/* Objectives */}
                  <div>
                    <h4 className="text-base sm:text-lg md:text-xl font-light text-white mb-3 sm:mb-4 flex items-center gap-2">
                      <span className="text-xl sm:text-2xl">🎯</span>
                      Tujuan
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                      {[
                        "Menganalisis kondisi dan isu aktual yang berkaitan dengan penerapan standar, proses penilaian, serta kualitas riset dan analisis di lingkungan KJPP RHR",
                        "Memberikan masukan dan rekomendasi strategis yang rasional, sistematis, dan berbasis analisis untuk mendukung peningkatan mutu proses kerja",
                        "Mengusulkan ide atau inovasi yang aplikatif, baik dalam bentuk perbaikan prosedur, penguatan metodologi, maupun peningkatan efisiensi kerja",
                        "Mendukung transformasi berkelanjutan (flourishing transformation) di KJPP RHR agar mampu menghasilkan kualitas penilaian yang unggul dan berdaya saing tinggi",
                      ].map((objective, idx) => (
                        <div
                          key={idx}
                          className="bg-black/30 border border-gray-800 rounded-lg p-3 sm:p-4 hover:border-green-600/50 transition-colors duration-300"
                        >
                          <div className="flex gap-2 sm:gap-3">
                            <span className="text-green-400 font-bold text-sm sm:text-base">
                              {idx + 1}
                            </span>
                            <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
                              {objective}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeSection === "topics" && (
                <div>
                  <h4 className="text-base sm:text-lg md:text-xl font-light text-white mb-4 sm:mb-6 flex items-center gap-2">
                    <span className="text-xl sm:text-2xl">📚</span>
                    Topik Lomba Paper
                  </h4>
                  <div className="space-y-3 sm:space-y-4">
                    {topics.map((topic, idx) => (
                      <div
                        key={idx}
                        className="bg-black/30 border border-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 hover:border-green-600/50 transition-all duration-300"
                      >
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-600 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-base">
                            {idx + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm sm:text-base md:text-lg text-white font-light mb-1 sm:mb-2">
                              {topic.title}
                            </h5>
                            <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
                              {topic.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === "rules" && (
                <div>
                  <h4 className="text-base sm:text-lg md:text-xl font-light text-white mb-4 sm:mb-6 flex items-center gap-2">
                    <span className="text-xl sm:text-2xl">📋</span>
                    Ketentuan Lomba
                  </h4>
                  <div className="space-y-3 sm:space-y-4 text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
                    {[
                      'Lomba abstrak/paper sesuai dengan tema CORPLAN "Rooted Responsibility, Flourishing Transformation" dengan filosofi bahwa pertumbuhan kita bukan hanya soal angka, tapi tanggung jawab.',
                      "Lomba paper dilakukan dengan mengajukan paper dimana tiap paper maksimal dapat disusun oleh 2 (dua) orang, bisa lintas cabang/divisi, dan tercantum sebagai penulis paper.",
                      "Setiap divisi dan cabang wajib mengalokasikan orang yang memenuhi kriteria untuk menjadi peserta. Alokasi orang dari tiap divisi dan cabang disampaikan atas persetujuan kepala divisi atau kepala cabang.",
                      "Tiap paper disusun dengan menyatakan pengarah/supervisor yang bertindak sebagai pengarah/advisor/reviewer. Pengarah/supervisor dapat memberikan masukan dan catatan atas paper yang disusun.",
                    ].map((rule, idx) => (
                      <div key={idx} className="flex gap-2 sm:gap-3 items-start">
                        <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-green-600/20 rounded-full flex items-center justify-center text-green-400 font-bold text-xs sm:text-sm">
                          {idx + 1}
                        </div>
                        <p className="flex-1 pt-0.5">{rule}</p>
                      </div>
                    ))}
                  </div>

                  {/* Key Dates Highlight */}
                  <div className="mt-6 sm:mt-8 bg-gradient-to-r from-green-900/20 to-teal-900/20 border border-green-800/30 rounded-lg sm:rounded-xl p-4 sm:p-5">
                    <h5 className="text-sm sm:text-base text-white font-light mb-3 sm:mb-4 flex items-center gap-2">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Timeline Penting
                    </h5>
                    <div className="grid grid-cols-2 gap-2 sm:gap-4">
                      <div className="text-center p-3 sm:p-4 bg-black/30 rounded-lg">
                        <p className="text-gray-400 text-xs mb-1">
                          Corporate Planning
                        </p>
                        <p className="text-white text-sm sm:text-base md:text-lg font-light">
                          30 Jan - 1 Feb 2026
                        </p>
                      </div>
                      <div className="text-center p-3 sm:p-4 bg-black/30 rounded-lg">
                        <p className="text-gray-400 text-xs mb-1">
                          Presentasi Offline
                        </p>
                        <p className="text-white text-sm sm:text-base md:text-lg font-light">
                          31 Jan 2026
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-8 sm:mt-12 pb-6 sm:pb-8">
              <p className="text-gray-500 text-xs sm:text-sm font-light tracking-wide mb-4 sm:mb-6">
                Tiga karya terbaik akan dipresentasikan dan berkesempatan
                memperoleh hadiah menarik
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-black bg-white px-5 py-2.5 sm:px-8 sm:py-3 rounded-lg text-xs sm:text-sm font-light tracking-wider transition-all duration-300 hover:bg-gray-200 hover:shadow-lg hover:shadow-white/20"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Template
              </a>
            </div>
          </div>
        </div>
      </section>
      <RHRGreenIdea embedded />

      <Footer />
    </main>
  );
}

export default RHRPublication;