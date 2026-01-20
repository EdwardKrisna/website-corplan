export default function MapBoxRedirect({
  lat,
  lng,
  venue,
  googleUrl,
  className = "",
}) {
  const bbox = `${lng - 0.01}%2C${lat - 0.01}%2C${lng + 0.01}%2C${lat + 0.01}`;
  const osmEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <div className={`mt-3 sm:mt-4 ${className}`}>
      <a
        href={googleUrl}
        target="_blank"
        rel="noreferrer"
        className="block overflow-hidden rounded-xl border border-gray-700 hover:border-[#72b851]/70 transition"
        title="Open in Google Maps"
      >
        <div className="relative">
          <iframe
            src={osmEmbed}
            className="h-[220px] sm:h-[280px] w-full"
            loading="lazy"
          />

          {/* Make whole map clickable */}
          <div className="absolute inset-0 cursor-pointer" />

          <div className="absolute bottom-2 left-2 rounded-lg bg-black/60 px-3 py-2 text-xs sm:text-sm text-gray-200 backdrop-blur">
            {venue} · Tap to open Google Maps
          </div>
        </div>
      </a>
    </div>
  );
}
