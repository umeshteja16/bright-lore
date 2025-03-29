import { useEffect, useRef, useState } from "react";
import "./Home.css";
import About from "./About";
import Navbar from "../Navbar/Navbar";

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

const Home = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    if (!vantaEffect && window.VANTA && window.THREE) {
      setVantaEffect(
        window.VANTA.GLOBE({
          el: vantaRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1,
          scaleMobile: 1.0,
          color: 0xfce7d8,
          color2: 0xfce7d8,
          size: 1.0,
          backgroundColor: 0x14141f,
        })
      );
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen overflow-auto">
        {/* 🔶 Top Half with Vanta Background */}
        <div
          ref={vantaRef}
          className="h-[100vh] w-full relative overflow-hidden"
        >
          <div
            className="
                absolute z-10 w-[60%] sm:w-[30%] md:w-[50%]
                left-5 bottom-5
                sm:left-10 sm:bottom-10
                md:left-20 md:bottom-16
                flex flex-col gap-3
            "
          >
            <h1 className="heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3">
              Bright Lore
            </h1>
            <h1 className="sub-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 font-bold">
              Brighter Learning Begins Here
            </h1>
            <p className="sub-heading text-sm sm:text-base md:text-lg lg:text-2xl">
              BrightLore is where minds connect and learning begins. Built by
              learners, for learners — every shared paper lights the way for
              others. With AI to simplify the complex, learning becomes clearer
              and brighter for all.
            </p>

            <div className="flex space-x-5 mt-4">
              <button className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-lg cursor-pointer font-bold rounded-full home-btn-1 border border-color hover:bg-primary hover:text-white transition">
                Ignite Learning
              </button>
              <button className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-lg cursor-pointer font-bold rounded-full home-btn-2 border border-color hover:bg-secondary hover:bg-opacity-80 transition">
                Contribute
              </button>
            </div>
          </div>
        </div>

        {/* 🔷 Bottom Half: Form Section Placeholder */}
        <About />
      </div>
    </>
  );
};

export default Home;
