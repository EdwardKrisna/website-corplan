import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AnimatedTitle from "../components/common/AnimatedTitle";

// Sample data for papers - replace with actual data
const papers = [
  {
    id: 1,
    title: "Sustainability dalam hubungan dengan metode dan teknik penilaian",
    author: "Halim Rusli , Kantor Pusat",
    image: "/img/papers/paper1.svg",
    driveLink:
      "https://drive.google.com/file/d/1uwWlD8Yu6v0oQd_rOxngrymbdZIY2i3o/view?usp=drive_link",
    description: "Exploring eco-friendly practices in corporate environments",
  },
  {
    id: 2,
    title: "Sustainability dalam kegiatan Perkantoran dan Kepegawaian RHR",
    author: "Pamela Ribka, Kantor Pusat",
    image: "/img/papers/paper2.svg",
    driveLink:
      "https://docs.google.com/presentation/d/1NfPiHB_Bef4E589rL2WdajzC9bBaqdpT/edit?usp=drive_link&ouid=112233642586268936798&rtpof=true&sd=true",
    description: "A comprehensive analysis of emission reduction methods",
  },
  {
    id: 3,
    title: "Sustainability dalam hubungan dengan metode dan teknik penilaian",
    author: "Nurul Hidayat, Kantor Cabang Medan",
    image: "/img/papers/paper3.svg",
    driveLink:
      "https://docs.google.com/presentation/d/1n9FC4CnYfwIkJWNBRfqnE-vkf4xP4qQv/edit?usp=drive_link&ouid=112233642586268936798&rtpof=true&sd=true",
    description: "Leveraging technology for sustainable business practices",
  },
  {
    id: 4,
    title: "Sustainability Kepegawaian dan Perkantoran",
    author: "Subarno, Kantor Cabang Yogyakarta",
    image: "/img/papers/paper4.svg",
    driveLink:
      "https://docs.google.com/presentation/d/1z1yQJK_tl63X7jDIInUnYU2Pe1GjlCOt/edit?usp=drive_link&ouid=112233642586268936798&rtpof=true&sd=true",
    description: "Developing robust assessment methodologies",
  },
  {
    id: 5,
    title: "Sustainability Dalam Hubungan Dengan Metode Dan Teknik Penilaian",
    author: "Jamaluddin Al Afgani, Kantor Cabang Makassar",
    image: "/img/papers/paper5.svg",
    driveLink:
      "https://docs.google.com/presentation/d/1MxJizcMrIMkA9_764n1ptkphOip1loJc/edit?usp=drive_link&ouid=112233642586268936798&rtpof=true&sd=true",
    description: "Implementing circular economy concepts",
  },
  {
    id: 6,
    title: "Sustainability dalam hubungan efisiensi anggaran",
    author: "Henry Setyawan Oktavianus, Kantor Cabang Surabaya",
    image: "/img/papers/paper6.svg",
    driveLink:
      "https://drive.google.com/file/d/1Tdz1uAf_eBPhN_2kBlhwsr9UWGPhsa4b/view?usp=drive_link",
    description: "Transitioning to sustainable energy sources",
  },
  {
    id: 7,
    title:
      "Sustainability dalam hubungan dengan proses dalam pelaksanaan penilaian",
    author: "Nurmiyanti, Kantor Cabang Semarang",
    image: "/img/papers/paper7.svg",
    driveLink:
      "https://docs.google.com/presentation/d/17xRYGCA5ZBkQFnUqG7uopfUn7ow5Gnbp/edit?usp=drive_link&ouid=112233642586268936798&rtpof=true&sd=true",
    description: "Transitioning to sustainable energy sources",
  },
  {
    id: 8,
    title:
      "Sustainability dalam hubungan dengan proses dalam pelaksanaan penilaian",
    author: "Eni Sumansari N, Kantor Cabang Bandung",
    image: "/img/papers/paper8.svg",
    driveLink:
      "https://docs.google.com/presentation/d/17CbEd-i0tdtqXjDdtTnunhmnn0PQ7cRx/edit?usp=drive_link&ouid=112233642586268936798&rtpof=true&sd=true",
    description: "Transitioning to sustainable energy sources",
  },
];

function RHRGreenIdea({ embedded = false }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  const content = (
    <section className={`relative w-full ${embedded ? 'py-8 sm:py-12' : 'min-h-screen'}`}>
      <div className={`container mx-auto px-4 sm:px-5 ${embedded ? '' : 'py-20 sm:py-24'}`}>
        <div className={`text-center ${embedded ? 'mb-6 sm:mb-8' : 'mb-10 sm:mb-12'}`}>
          <AnimatedTitle
            title="Koleksi Publikasi KJPP RHR Green Idea (Corporate Planning 2024)"
            containerClass={`text-center mb-3 sm:mb-4 ${embedded ? '!text-2xl sm:!text-3xl md:!text-4xl' : ''}`}
          />
          <p className={`text-white mt-3 max-w-3xl mx-auto font-bold tracking-wide leading-relaxed ${embedded ? 'text-xs sm:text-sm' : 'text-sm sm:text-base md:text-lg'}`}>
            A curated collection of sustainability research and green
            initiatives by KJPP RHR employees, driving innovation in
            environmental responsibility and corporate sustainability.
          </p>
        </div>

        {/* Papers Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 max-w-7xl mx-auto ${embedded ? 'mt-6 sm:mt-8' : 'mt-8 sm:mt-12'}`}>
          {papers.map((paper) => (
            <div
              key={paper.id}
              className="group relative bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-gray-600"
              onMouseEnter={() => setHoveredCard(paper.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Container */}
              <div className={`relative bg-gray-800 overflow-hidden ${embedded ? 'h-32 sm:h-40' : 'h-40 sm:h-48 md:h-56'}`}>
                <img
                  src={paper.image}
                  alt={paper.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23111827'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%234B5563'%3EResearch Paper%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className={`${embedded ? 'p-3 sm:p-4' : 'p-4 sm:p-5'}`}>
                <h3 className={`text-white font-light tracking-wide mb-1.5 line-clamp-2 ${embedded ? 'text-xs sm:text-sm min-h-[2.5rem]' : 'text-sm sm:text-base min-h-[3rem]'}`}>
                  {paper.title}
                </h3>

                <p className={`text-gray-400 font-light tracking-wider mb-3 ${embedded ? 'text-xs' : 'text-xs sm:text-sm'}`}>
                  by {paper.author}
                </p>

                {/* Access Button */}
                <a
                  href={paper.driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 sm:gap-2 text-white bg-transparent border border-gray-700 rounded font-light tracking-wider transition-all duration-300 hover:bg-white hover:text-black hover:border-white ${embedded ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm'}`}
                >
                  <svg
                    className={`${embedded ? 'w-3 h-3' : 'w-3.5 h-3.5 sm:w-4 sm:h-4'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Access Paper
                </a>
              </div>

              {/* Hover Effect Overlay */}
              <div
                className={`absolute inset-0 border-2 border-white rounded-lg pointer-events-none transition-opacity duration-300 ${
                  hoveredCard === paper.id ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className={`text-center ${embedded ? 'mt-6 sm:mt-8' : 'mt-10 sm:mt-12 pb-6'}`}>
          <p className="text-white text-xs sm:text-sm font-bold tracking-wide">
            Contributions from KJPP RHR team members
          </p>
        </div>
      </div>
    </section>
  );

  if (embedded) {
    return content;
  }

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
      <div className="relative pt-14 sm:pt-16 z-10">
        {content}
      </div>
      <Footer />
    </main>
  );
}

export default RHRGreenIdea;
