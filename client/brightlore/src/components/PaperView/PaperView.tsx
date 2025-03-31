import { useState } from "react";
import file from "../../assets/pdfs/CS224S6.pdf";
import Chat from "../chatbot/Chat";
// interface PdfviewerProps {
//   file: string;
// }

const PaperView = (
  {
    /*{ file }: PdfviewerProps*/
  }
) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [key, setKey] = useState(false);

  if (!file) {
    return <div className="text-center text-gray-500">No PDF available</div>;
  }

  return (
    <div className="flex relative w-full h-screen bg-matt-black">
      {/* PDF iframe */}
      <iframe src={file} className="w-150 lg:w-5xl h-full" title="PDF Viewer" />

      {/* Open in New Tab Button */}
      <div className="absolute top-2 left-12">
        <a href={file} target="_blank" rel="noopener noreferrer">
          <button className="new-tab-button text-white px-4 py-2 rounded shadow-md transition">
            Open in New Tab
          </button>
        </a>
      </div>

      {/* Second iframe with hidden UI */}
      <div className="flex flex-col">
      {key && (
        <iframe
          src={`${file}#toolbar=0&navpanes=0&scrollbar=0`}
          className="w-150 lg:w-3xl h-80 border-none"
          title="PDF Viewer"
        />
      )}
      <div className="min-w-3xl">
        <Chat/>
      </div>
      </div>
    </div>
  );
};

export default PaperView;
