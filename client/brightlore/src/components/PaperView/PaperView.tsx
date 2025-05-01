import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Chat from "../chatbot/Chat";
import axiosInstance from "../../utils/axiosInstance";

const PaperView = () => {
  const { state } = useLocation();
  const { file } = state || {}; // Destructure file from the state

  const [showChat, setShowChat] = useState(true);

  useEffect(() => {
    // Optional: If you need to adjust fullscreen behavior or some other logic
  }, []);

  if (!file) {
    return <div className="text-center text-gray-500">No PDF available</div>;
  }

  const startChat = async () => {
    console.log("Sending file to start-chat:", file);

    const response = await axiosInstance.post("api/chats/start-chat", {
      url: file,
    });
    return response;
  };

  return (
    <div className="flex overflow-hidden relative w-full h-screen bg-matt-black">
      {/* PDF iframe */}
      <iframe src={file} className="w-full h-full" title="PDF Viewer" />

      {/* Open in New Tab Button */}
      <div
        className={`absolute transition-all duration-300 ${
          showChat ? "top-2 left-174" : "top-2 left-357"
        }`}
      >
        <a href={file} target="_blank" rel="noopener noreferrer">
          <button className="new-tab-button text-white px-4 py-2 rounded shadow-md">
            Open in New Tab
          </button>
        </a>
      </div>

      {/* Second iframe with hidden UI */}
      {showChat ? (
        <div className="flex flex-col transition-all duration-300">
          <div className="w-2xl">
            <Chat startChat={startChat} />
          </div>
        </div>
      ) : (
        ""
      )}
      <div
        className={`absolute transition-all duration-300 ${
          showChat ? "top-2 right-10" : "bottom-2 right-10"
        }`}
      >
        <button
          className="new-tab-button text-white px-4 py-2 rounded shadow-md transition-all duration-300"
          onClick={() => {
            setShowChat(!showChat);
          }}
        >
          {!showChat ? "Show chat" : "Hide chat"}
        </button>
      </div>
    </div>
  );
};

export default PaperView;
