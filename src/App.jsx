import Hero from "./components/Hero";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <main className="relative h-[100svh] w-full overflow-hidden bg-black md:min-h-screen md:overflow-x-hidden">
      {/* Hero as base layer on mobile */}
      <Hero />
      {/* Navbar overlays on top */}
      <Navbar />
    </main>
  );
}

export default App;
