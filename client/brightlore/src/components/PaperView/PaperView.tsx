import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Chat from "../chatbot/Chat";

const PaperView = () => {
  const { state } = useLocation();
  const fileFromState = state?.file;
  const titleFromState = state?.title || "Untitled Paper";
  const idFromState = state?.id || Date.now();

  const [fileUrl, setFileUrl] = useState<string | null>(
    fileFromState || localStorage.getItem("lastUploadedFile")
  );
  const [showChat, setShowChat] = useState(true);

  useEffect(() => {
    if (fileFromState) {
      localStorage.setItem("lastUploadedFile", fileFromState);

      const recentPapers = JSON.parse(localStorage.getItem("recentPapers") || "[]");

      const newPaper = {
        id: idFromState,
        title: titleFromState,
        link: fileFromState,
        openedAt: new Date().toISOString(),
      };

      const updatedPapers = [
        newPaper,
        ...recentPapers.filter((p: any) => p.link !== fileFromState),
      ].slice(0, 5); // keep only last 5

      localStorage.setItem("recentPapers", JSON.stringify(updatedPapers));
    }
  }, [fileFromState, idFromState, titleFromState]);

  if (!fileUrl) {
    return <div className="text-center text-gray-500">No PDF available</div>;
  }

  return (
    <div className="flex overflow-hidden relative w-full h-screen bg-matt-black">
      {/* PDF Viewer */}
      <iframe src={fileUrl} className="w-full h-full" title="PDF Viewer" />

      {/* Open in New Tab Button */}
      <div className={`absolute transition-all duration-300 ${showChat ? "top-2 left-174" : "top-2 left-357"}`}>
        <a href={fileUrl} target="_blank" rel="noopener noreferrer">
          <button className="new-tab-button text-white px-4 py-2 rounded shadow-md">
            Open in New Tab
          </button>
        </a>
      </div>

      {/* Chat */}
      {showChat && (
        <div className="flex flex-col transition-all duration-300">
          <div className="w-2xl">
            <Chat startChat={() => {}} />
          </div>
        </div>
      )}

      {/* Toggle Chat Button */}
      <div className={`absolute transition-all duration-300 ${showChat ? "top-2 right-10" : "bottom-2 right-10"}`}>
        <button
          className="new-tab-button text-white px-4 py-2 rounded shadow-md transition-all duration-300"
          onClick={() => setShowChat(!showChat)}
        >
          {showChat ? "Hide Chat" : "Show Chat"}
        </button>
      </div>
    </div>
  );
};

export default PaperView;
