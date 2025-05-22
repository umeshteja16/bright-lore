import { useEffect } from "react";
import { InfiniteMovingCardsDemo } from "../components/cards/infinitemovingcardsdemo";
import Navbar from "../Navbar/Navbar";
import Stars from "../../Themes/ShootingStars/stars";
import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative w-full min-h-screen overflow-auto bg-black/80 text-white font-sans">
        {/* 🌌 Stars background for entire page */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Stars />
        </div>

        {/* 🔶 Hero Section */}
        <div className="h-[100vh] w-full relative overflow-hidden z-10">
          <div
            className="
              absolute z-10 w-[60%] sm:w-[30%] md:w-[50%]
              left-5 bottom-5
              sm:left-10 sm:bottom-10
              md:left-20 md:bottom-16
              flex flex-col gap-3
          "
          >
            <h1 className="heading text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-3">
              Bright Lore
            </h1>
            <h1 className="sub-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 font-bold">
              Brighter Learning Begins Here
            </h1>
            <p className="sub-heading text-sm sm:text-base md:text-lg lg:text-2xl text-gray-300 font-normal">
              BrightLore is where minds connect and learning begins. Built by
              learners, for learners — every shared paper lights the way for
              others. With AI to simplify the complex, learning becomes clearer
              and brighter for all.
            </p>
          </div>
        </div>

        {/* 🔷 Infinite Moving Cards */}
        <div className="w-full py-16 px-4 z-10 relative">
          <h2 className="sub-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center">
            ✨ Inspiration from the Community
          </h2>
          <InfiniteMovingCardsDemo />
        </div>

        {/* 🌟 Section 1: How It Works */}
        <div className="w-full py-20 px-6 md:px-20 z-10 relative">
          <h2 className="sub-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
            🚀 How BrightLore Works
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-zinc-800/50 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="sub-heading text-xl sm:text-2xl font-bold mb-2">
                📤 Upload Papers
              </h3>
              <p className="sub-heading text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-normal">
                Share your previous year papers, question sets, or class notes.
                Every document contributes to someone else's success.
              </p>
            </div>
            <div className="bg-zinc-800/50 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="sub-heading text-xl sm:text-2xl font-bold mb-2">
                🤖 AI-Powered Answers
              </h3>
              <p className="sub-heading text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-normal">
                Our intelligent assistant breaks down complex problems from the
                uploaded papers with step-by-step explanations.
              </p>
            </div>
            <div className="bg-zinc-800/50 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="sub-heading text-xl sm:text-2xl font-bold mb-2">
                🔍 Search & Study
              </h3>
              <p className="sub-heading text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-normal">
                Find papers by exam name, subject, or year. Use the built-in PDF
                viewer and chat with AI to clarify your doubts instantly.
              </p>
            </div>
          </div>
        </div>

        {/* 🌟 Section 2: Why BrightLore */}
        <div className="w-full py-20 px-6 md:px-20 border-t border-white/10 z-10 relative">
          <h2 className="sub-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
            💡 Why BrightLore?
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-zinc-800/50 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="sub-heading text-xl sm:text-2xl font-bold mb-2">
                🌍 Community-Powered
              </h3>
              <p className="sub-heading text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-normal">
                Built by students, for students. We believe knowledge should be
                free, shared, and accessible — not locked behind paywalls.
              </p>
            </div>
            <div className="bg-zinc-800/50 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="sub-heading text-xl sm:text-2xl font-bold mb-2">
                🧠 AI That Understands You
              </h3>
              <p className="sub-heading text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-normal">
                BrightLore’s AI doesn’t just give answers — it teaches. Learn
                through explanations, analogies, and tailored suggestions.
              </p>
            </div>
          </div>
        </div>

        {/* 🌟 Section 3: Join the Movement */}
        <div className="w-full py-20 px-6 md:px-20 border-t border-white/10 z-10 relative">
          <h2 className="sub-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center">
            🙌 Join the BrightLore Movement
          </h2>
          <div className="text-center max-w-2xl mx-auto">
            <p className="sub-heading text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-normal mb-6">
              Whether you're a top student, a struggling learner, or just
              someone who wants to give back — BrightLore welcomes you. Every
              paper you upload, every answer you seek, every moment you invest
              helps build a smarter learning space for all.
            </p>
            <Link to="/profile">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition duration-200 cursor-pointer">
                Start Exploring Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
