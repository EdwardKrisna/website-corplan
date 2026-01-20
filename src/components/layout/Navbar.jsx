// import clsx from "clsx";
// import gsap from "gsap";
// import { useWindowScroll } from "react-use";
// import { useEffect, useRef, useState } from "react";
// import { TiLocationArrow } from "react-icons/ti";
// import { Link } from "react-router-dom";

// import Button from "./Button";

// const navItems = [
//   { name: "Home", path: "/" },
//   { name: "Event", path: "/rundown-kegiatan" },
//   // { name: "Daftar Peserta", path: "/participant" },
//   // { name: "RHR Green Idea", path: "/rhr-green-idea" },
//   { name: "Publications", path: "/publications" },
//   { name: "Gallery", path: "/gallery" },
// ];

// const NavBar = () => {
//   // State for toggling audio and visual indicator
//   const [isAudioPlaying, setIsAudioPlaying] = useState(false);
//   const [isIndicatorActive, setIsIndicatorActive] = useState(false);

//   // Refs for audio and navigation container
//   const audioElementRef = useRef(null);
//   const navContainerRef = useRef(null);

//   const { y: currentScrollY } = useWindowScroll();
//   const [isNavVisible, setIsNavVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   // Toggle audio and visual indicator
//   const toggleAudioIndicator = () => {
//     setIsAudioPlaying((prev) => !prev);
//     setIsIndicatorActive((prev) => !prev);
//   };

//   // Manage audio playback
//   useEffect(() => {
//     if (isAudioPlaying) {
//       audioElementRef.current.play();
//     } else {
//       audioElementRef.current.pause();
//     }
//   }, [isAudioPlaying]);

//   useEffect(() => {
//     if (currentScrollY === 0) {
//       // Topmost position: show navbar without floating-nav
//       setIsNavVisible(true);
//       navContainerRef.current.classList.remove("floating-nav");
//     } else if (currentScrollY > lastScrollY) {
//       // Scrolling down: hide navbar and apply floating-nav
//       setIsNavVisible(false);
//       navContainerRef.current.classList.add("floating-nav");
//     } else if (currentScrollY < lastScrollY) {
//       // Scrolling up: show navbar with floating-nav
//       setIsNavVisible(true);
//       navContainerRef.current.classList.add("floating-nav");
//     }

//     setLastScrollY(currentScrollY);
//   }, [currentScrollY, lastScrollY]);

//   useEffect(() => {
//     gsap.to(navContainerRef.current, {
//       y: isNavVisible ? 0 : -100,
//       opacity: isNavVisible ? 1 : 0,
//       duration: 0.2,
//     });
//   }, [isNavVisible]);

//   return (
//     <div
//       ref={navContainerRef}
//       className="fixed inset-x-0 top-9 sm:top-6 md:top-4 z-50 h-auto md:h-16 border-none transition-all duration-700 sm:inset-x-6"
//     >
//       <header className="absolute top-1/2 w-full -translate-y-1/2">
//         <nav className="flex size-full flex-col items-center justify-between gap-2 p-2 sm:flex-row md:p-4">
//           {/* Logo */}
//           <div className="flex items-center gap-4 shrink-0">
//             <Link to="/">
//               <img
//                 src="/img/logo.png"
//                 alt="logo"
//                 className="w-20 sm:w-28 md:w-36 lg:w-44"
//               />
//             </Link>
//           </div>

//           {/* Navigation Links and Audio Button */}
//           <div className="flex w-full items-center justify-center sm:w-auto sm:justify-end">
//             <div className="flex flex-wrap justify-center gap-2 md:gap-0">
//               {navItems.map((item, index) => (
//                 <Link
//                   key={index}
//                   to={item.path}
//                   className="nav-hover-btn text-[0.6rem] sm:text-xs md:text-sm whitespace-nowrap px-1 md:px-0"
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//             </div>

//             <button className="ml-4 md:ml-10 hidden sm:flex items-center space-x-0.5">
//               <audio
//                 ref={audioElementRef}
//                 className="hidden"
//                 src="/audio/loop.mp3"
//                 loop
//               />
//               {[1, 2, 3, 4].map((bar) => (
//                 <div
//                   key={bar}
//                   className={clsx("indicator-line", {
//                     active: isIndicatorActive,
//                   })}
//                   style={{
//                     animationDelay: `${bar * 0.1}s`,
//                   }}
//                 />
//               ))}
//             </button>
//           </div>
//         </nav>
//       </header>
//     </div>
//   );
// };

// export default NavBar;

import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
// import { TiLocationArrow } from "react-icons/ti";
import { Link, useLocation } from "react-router-dom";
// import Button from "../Button";
import {
  HiHome,
  HiCalendar,
  HiDocumentText,
  HiPhotograph,
  HiPhone,
} from "react-icons/hi";

const navItems = [
  { name: "Home", path: "/", icon: HiHome },
  { name: "Event", path: "/rundown-kegiatan", icon: HiCalendar },
  { name: "Publications", path: "/publications", icon: HiDocumentText },
  { name: "Gallery", path: "/gallery", icon: HiPhotograph },
  { name: "Contact", path: "/contact-us", icon: HiPhone },
];

const NavBar = () => {
  const location = useLocation();
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <>
      {/* Desktop Navbar */}
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 hidden md:block"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            <div className="flex items-center gap-7">
              <img src="/img/logo.png" alt="logo" className="w-32" />
            </div>

            <div className="flex h-full items-center">
              <div className="hidden md:block">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className="ms-6 lg:ms-10 text-sm lg:text-base font-bold text-white tracking-tight hover:text-yellow-300 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </header>
      </div>

      {/* Mobile Top Bar */}
      <div
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 md:hidden",
          location.pathname === "/" ? "bg-transparent" : "bg-black/80 backdrop-blur-md"
        )}
      >
        <div className="flex items-center justify-center p-4">
          <img src="/img/logo.png" alt="logo" className="w-24" />
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/10 md:hidden">
        <nav className="flex items-center justify-around px-2 py-3">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                className={clsx(
                  "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all duration-300",
                  {
                    "text-yellow-300": isActive,
                    "text-white/60": !isActive,
                  }
                )}
              >
                <Icon
                  className={clsx("text-2xl", {
                    "scale-110": isActive,
                  })}
                />
                <span className="text-xs font-bold tracking-tight">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Spacer for mobile bottom nav - hidden on Home page */}
      {location.pathname !== "/" && <div className="h-20 md:hidden" />}
    </>
  );
};

export default NavBar;
