// src/pages/Exam.tsx
import { useEffect, useRef, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import "./Exam.css";
import Logo from "../../assets/mattblack-logo.jpg";
import Stars from "../../Themes/ShootingStars/stars";
import Paper from "./Cards/Card";
import axiosInstance from "../../utils/axiosInstance";
import { FileUpload } from "../../components/Upload/FileUpload";

type PaperData = {
  _id: string;
  title: string;
  imageLink: string;
  fileId: string;
};

const Exam = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [papers, setPapers] = useState<PaperData[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedQuery = localStorage.getItem("searchQuery");
    if (storedQuery) {
      setSearchQuery(storedQuery);
      handleSearch(storedQuery);
    }
  }, []);

  useEffect(() => {
    const handleAppClose = () => localStorage.removeItem("searchQuery");
    window.addEventListener("beforeunload", handleAppClose);
    return () => {
      window.removeEventListener("beforeunload", handleAppClose);
      handleAppClose();
    };
  }, []);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    localStorage.setItem("searchQuery", query);
    if (query.trim() !== "") handleSearch(query);
  };

  const handleSearch = async (query: string) => {
    try {
      const response = await axiosInstance.get("api/papers/search", {
        params: { query },
      });
      if (response.data?.papers) setPapers(response.data.papers);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileUpload = async (files: File[]) => {
    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      await axiosInstance.post("/api/chats/start-chat", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const fileUrl = "http://localhost:5000/uploads/temp.pdf";
      localStorage.setItem("lastUploadedFile", fileUrl);
      navigate("/paper", { state: { file: fileUrl } });
    } catch (err) {
      alert("Upload or chat start failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleCardSelect = async (cloudFileId: string) => {
    try {
      setUploading(true);
      const cloudFileUrl = `https://res.cloudinary.com/dv7amemcg/raw/upload/v1743523325/${cloudFileId}`;

      await axiosInstance.post("/api/chats/start-chat", {
        url: cloudFileUrl,
      });

      const fileUrl = "http://localhost:5000/uploads/temp.pdf";
      localStorage.setItem("lastUploadedFile", fileUrl);
      navigate("/paper", {
      state: {
        file: fileUrl,
        title: papers.find(p => p.fileId === cloudFileId)?.title || "Untitled Paper",
        id: papers.find(p => p.fileId === cloudFileId)?._id || Date.now()
      }
    });

    } catch (err) {
      alert("Failed to load paper into chat");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative bg-matt-black min-h-screen overflow-hidden">
      <Stars />
      <div className="relative z-10 pt-50 flex flex-col items-center">
        <img src={Logo} className="h-[110px] sm:h-[200px] mb-4" />
        <div ref={searchRef} className="mt-10">
          <Searchbar
            value={searchQuery}
            onChange={onSearchChange}
            onClearSearch={() => setSearchQuery("")}
          />
        </div>

        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 justify-items-center">
            {searchQuery &&
              papers.length > 0 &&
              papers.map((item) => (
                <div key={item._id} onClick={() => handleCardSelect(item.fileId)}>
                  <Paper
                    title={item.title}
                    image={item.imageLink}
                    file={`https://res.cloudinary.com/dv7amemcg/raw/upload/v1743523325/${item.fileId}`}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-neutral-800 text-white px-6 py-3 rounded-lg shadow-md hover:bg-neutral-700 transition cursor-pointer flex items-center gap-2"
        >
          Upload Paper
        </button>
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-md max-w-xl w-full relative">
            <h2 className="text-xl font-bold text-center text-gray-800 dark:text-white mb-4">
              Upload a Paper
            </h2>
            <FileUpload onChange={handleFileUpload} />
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 rounded bg-gray-300 dark:bg-neutral-700 dark:text-white"
                disabled={uploading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exam;
