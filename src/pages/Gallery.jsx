import { useRef } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AnimatedTitle from "../components/common/AnimatedTitle";
import ImageSlideshow from "../components/gallery/ImageSlideshow";
import VideoSlideshow from "../components/gallery/VideoSlideshow";
import YouTubeSlideshow from "../components/gallery/YouTubeSlideshow";
import { useGsapFadeIn } from "../hooks/useGsapAnimation";

const galleryImages = [
  "/img/gallery/gallery1.JPG",
  "/img/gallery/gallery2.JPG",
  "/img/gallery/gallery3.JPG",
  "/img/gallery/gallery4.JPG",
  "/img/gallery/gallery5.JPG",
];

const galleryVideos = [
  { src: "/videos/solo.mp4", title: "Video 1" },
  { src: "/videos/solo2.mp4", title: "Video 2" },
  { src: "/videos/solo3.mp4", title: "Video 3" },
];

const galleryVideos2026 = [
  { src: "https://youtu.be/QElHC5wPVaY", title: "Video 1" },
  // Add more YouTube links here when available
  // Example: { src: "https://youtu.be/VIDEO_ID", title: "Video 2" },
];

function Gallery() {
  const heroRef = useRef(null);

  // Use custom GSAP animation hook
  useGsapFadeIn(heroRef);

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

      {/* Gallery Corplan 2026 Section */}
      <section className="relative w-full pt-2 sm:pt-16 z-10">
        <div
          ref={heroRef}
          className="container mx-auto px-4 sm:px-5 py-8 sm:py-12"
        >
          <AnimatedTitle
            title="Gallery Corplan 2026"
            containerClass="text-center mb-4 sm:mb-6"
          />

          {/* Button to Google Drive */}
          <div className="flex justify-center mt-6 sm:mt-8">
            <a
              href="https://drive.google.com/drive/folders/1_uyQSdqEDNrxRu7LEzQRPMRQhGBInyI2"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-sm sm:text-base md:text-lg rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Lihat Gallery Corplan 2026
            </a>
          </div>
        </div>
      </section>

      {/* Video Corplan 2026 Section */}
      <section className="relative w-full py-12 sm:py-16 z-10">
        <div className="container mx-auto px-4 sm:px-5">
          <AnimatedTitle
            title="Video Corplan 2026"
            containerClass="text-center mb-4 sm:mb-6"
          />
          <p className="text-center text-white mt-3 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 font-bold tracking-wide">
            Dokumentasi Video Corporate Planning KJPP RHR 2026
          </p>

          {/* YouTube Video Slideshow */}
          <YouTubeSlideshow videos={galleryVideos2026} />
        </div>
      </section>

      {/* Gallery Corplan Section */}
      <section className="relative w-full pt-2 sm:pt-16 z-10">
        <div
          ref={heroRef}
          className="container mx-auto px-4 sm:px-5 py-8 sm:py-12"
        >
          <AnimatedTitle
            title="Gallery Corplan"
            containerClass="text-center mb-4 sm:mb-6"
          />
          <p className="text-center text-white mt-3 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 font-bold tracking-wide">
            Dokumentasi Foto Corporate Planning KJPP RHR 2024
          </p>

          {/* Image Slideshow */}
          <ImageSlideshow images={galleryImages} />
        </div>
      </section>

      {/* Video Corplan Section */}
      <section className="relative w-full py-12 sm:py-16 z-10">
        <div className="container mx-auto px-4 sm:px-5">
          <AnimatedTitle
            title="Video Corplan"
            containerClass="text-center mb-4 sm:mb-6"
          />
          <p className="text-center text-white mt-3 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 font-bold tracking-wide">
            Dokumentasi Video Corporate Planning KJPP RHR 2024
          </p>

          {/* Video Slideshow */}
          <VideoSlideshow videos={galleryVideos} />
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Gallery;
