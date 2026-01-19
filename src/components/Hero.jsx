const Hero = () => {
  return (
    <div className="relative overflow-hidden w-[52vh] md:w-full h-[80vh] md:h-screen mx-auto">
      <div className="relative w-full h-full overflow-hidden">
        <picture>
          {/* Mobile image */}
          <source
            media="(max-width: 768px)"
            srcSet="/img/hero-mobile.JPG"
          />

          {/* Desktop + Mobile renderer */}
          <img
            src="/img/hero.JPG"
            alt="Corporate Planning 2026"
            className="
              absolute inset-0 w-full h-full object-cover
              object-center            /* mobile: always center */
              md:object-center         /* desktop center */
            "
          />
        </picture>
      </div>
    </div>
  );
};

export default Hero;
