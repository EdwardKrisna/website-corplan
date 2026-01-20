import { useState, useEffect } from "react";

const desktopImages = [
  "/img/hero.JPG",
  "/img/hero-speaker1.JPG",
  "/img/hero-speaker2.JPG",
  "/img/hero-speaker3.JPG",
];

const mobileImages = [
  "/img/hero-mobile.JPG",
  "/img/hero-mobile-speaker1.JPG",
  "/img/hero-mobile-speaker2.JPG",
  "/img/hero-mobile-speaker3.JPG",
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % desktopImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full md:relative md:h-screen">
      <div className="relative w-full h-full overflow-hidden">
        {desktopImages.map((src, index) => (
          <picture
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Mobile image */}
            <source
              media="(max-width: 768px)"
              srcSet={mobileImages[index]}
            />

            {/* Desktop image */}
            <img
              src={src}
              alt={`Corporate Planning 2026 - ${index + 1}`}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </picture>
        ))}

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {desktopImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
