import { useEffect, useState } from "react";
import { auth } from "./Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import Stars from "../../Themes/ShootingStars/stars";
import { Progress } from "../../Themes/Loading/Loading";

type FirebaseUser = {
  displayName: string | null;
  email: string | null;
};

const MAX_USER_CHATS = 100;

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState<FirebaseUser | null>(null);
  const [remainingChats, setRemainingChats] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userData: FirebaseUser = {
          displayName: user.displayName,
          email: user.email,
        };
        setUserDetails(userData);

        localStorage.removeItem("guestChatCount");

        const chatKey = `chatCount_${user.email}`;
        const used = parseInt(localStorage.getItem(chatKey) || "0", 10);
        setRemainingChats(MAX_USER_CHATS - used);
      } else {
        setUserDetails(null);
      }
    });

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setShowContent(true);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  if (!showContent) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black/80 text-white relative">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Stars />
        </div>
        <div className="z-10 w-1/2 max-w-md">
          <Progress
            value={progress}
            className="w-full h-3 transition-all duration-200 ease-linear bg-gray-800"
          />
          <p className="text-center text-sm text-gray-400 mt-4">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black/80 text-white relative">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Stars />
        </div>
        <div className="z-10 max-w-md w-full p-8 text-center bg-zinc-800/50 rounded-xl backdrop-blur-md border border-white/10 shadow-xl">
          <h2 className="text-3xl font-bold mb-4">You're not logged in</h2>
          <p className="text-gray-400 text-sm mb-6">
            Please sign in to view your profile and history.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/80 text-white relative">
      {/* 🌌 Stars Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Stars />
      </div>

      {/* 💼 Profile Content */}
      <div className="relative z-10 px-6 py-20 flex flex-col items-center gap-12">
        {/* 📇 Profile Card */}
        <div className="bg-zinc-800/50 backdrop-blur-md rounded-2xl p-8 max-w-xl w-full text-center shadow-xl border border-white/10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
            Welcome {userDetails.displayName || "Learner"} 👋
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl mb-2">
            Email:{" "}
            <span className="text-white font-medium">{userDetails.email}</span>
          </p>

          {remainingChats !== null && (
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2">
                Daily Chat Usage: {MAX_USER_CHATS - remainingChats} / {MAX_USER_CHATS}
              </p>
              <Progress
                value={((MAX_USER_CHATS - remainingChats) / MAX_USER_CHATS) * 100}
                className="h-3 bg-gray-700"
              />
            </div>
          )}

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition cursor-pointer"
            >
              Go to Home
            </button>
            <button
              onClick={async () => {
                await auth.signOut();
                navigate("/");
              }}
              className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* 🕓 Recently Opened Papers */}
        <div className="bg-zinc-800/50 backdrop-blur-md rounded-2xl p-8 w-full max-w-4xl shadow-xl border border-white/10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
            🕓 Recently Opened Papers
          </h2>

          {(() => {
            const papers = JSON.parse(localStorage.getItem("recentPapers") || "[]");
            if (papers.length === 0) {
              return <p className="text-gray-400 text-center">No papers viewed yet.</p>;
            }

            return (
              <ul className="space-y-4">
                {papers.map((paper: any) => (
                  <li
                    key={paper.id}
                    className="bg-zinc-900/50 p-4 rounded-lg border border-white/10"
                  >
                    <p className="text-white font-semibold truncate">
                      📄 {paper.title}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Opened: {new Date(paper.openedAt).toLocaleString()}
                    </p>
                    <a
                      href={paper.link}
                      target="_blank"
                      className="text-blue-400 underline text-sm mt-1 inline-block"
                    >
                      Reopen →
                    </a>
                  </li>
                ))}
              </ul>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
