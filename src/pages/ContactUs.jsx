import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AnimatedTitle from "../components/common/AnimatedTitle";
import { HiPhone, HiMail, HiUser } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

// Contact data structure
const contacts = [
  {
    id: 1,
    role: "Ketua Panitia",
    name: "Naufal Ferdian N",
    phone: "+62 851-5516-7672",
    email: "xxx@kjpprhr.com",
    color: "from-blue-600 to-cyan-600",
    icon: "👔",
  },
  {
    id: 2,
    role: "Acara",
    name: "Rahmantoro",
    phone: "+62 856-9363-3150",
    email: "xxx@kjpprhr.com",
    color: "from-purple-600 to-pink-600",
    icon: "📋",
  },
];

function ContactUs() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  const infoRef = useRef(null);

  // Page load animation (same as Publications and Event page)
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
      const sections = [cardsRef.current, infoRef.current];

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
      <section className="relative min-h-screen w-full pt-2 sm:pt-16 z-10">
        <div className="container mx-auto px-4 sm:px-5 py-8 sm:py-12">
          <div ref={heroRef} className="text-center mb-8 sm:mb-12">
            <AnimatedTitle
              title="Contact Us"
              containerClass="text-center mb-4 sm:mb-6"
            />
            <p className="text-gray-300 mt-3 text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-light tracking-wide leading-relaxed">
              Get in touch with our event organizers for any inquiries or
              assistance
            </p>
          </div>

          {/* Contact Cards */}
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto mb-8 sm:mb-12">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="group relative bg-gray-900 border border-gray-800 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-500 hover:border-gray-600 hover:shadow-2xl hover:shadow-white/10"
                onMouseEnter={() => setHoveredCard(contact.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative p-4 sm:p-5 md:p-6">
                  {/* Icon */}
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
                    {contact.icon}
                  </div>

                  {/* Role */}
                  <h3 className="text-white text-lg sm:text-xl md:text-2xl font-light tracking-wide mb-3 sm:mb-4">
                    {contact.role}
                  </h3>

                  {/* Contact Information */}
                  <div className="space-y-2 sm:space-y-3">
                    {/* Name */}
                    <div className="flex items-center gap-2 sm:gap-3 text-gray-300">
                      <HiUser className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                      <span className="font-light text-sm sm:text-base">{contact.name}</span>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-2 sm:gap-3 text-gray-300">
                      <HiPhone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                      <a
                        href={`tel:${contact.phone.replace(/\s/g, "")}`}
                        className="font-light text-sm sm:text-base hover:text-white transition-colors duration-300"
                      >
                        {contact.phone}
                      </a>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-2 sm:gap-3 text-gray-300">
                      <HiMail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                      <a
                        href={`mailto:${contact.email}`}
                        className="font-light text-xs sm:text-sm hover:text-white transition-colors duration-300 break-all"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-3">
                    <a
                      href={`https://wa.me/${contact.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 text-white bg-green-600 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm font-light tracking-wider transition-all duration-300 hover:bg-green-700"
                    >
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      WhatsApp
                    </a>
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 text-white bg-transparent border border-gray-700 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm font-light tracking-wider transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
                    >
                      <HiMail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Email
                    </a>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div
                  className={`absolute inset-0 border-2 border-white rounded-lg sm:rounded-xl pointer-events-none transition-opacity duration-300 ${hoveredCard === contact.id ? "opacity-100" : "opacity-0"}`}
                />
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div ref={infoRef} className="max-w-4xl mx-auto bg-gray-900/50 border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-12">
            <div className="text-center">
              <h3 className="text-lg sm:text-xl md:text-2xl font-light text-white mb-2 sm:mb-3">
                Need More Information?
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed max-w-2xl mx-auto">
                For general inquiries about the Corporate Planning 2026 event,
                feel free to reach out to our team. We're here to assist you
                with any questions regarding the event schedule, venue,
                accommodation, or participation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default ContactUs;
