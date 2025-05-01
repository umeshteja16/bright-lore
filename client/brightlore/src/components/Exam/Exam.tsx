import { useEffect, useRef, useState } from "react";
import Searchbar from "../Searchbar/Searchbar";
import { ChangeEvent } from "react";
import "./Exam.css";
import Logo from "../../assets/mattblack-logo.jpg";
import Stars from "../../Themes/ShootingStars/stars";
import Paper from "./Cards/Card";
import axiosInstance from "../../utils/axiosInstance";

// Define the type for paper data
type PaperData = {
  _id: string;
  title: string;
  imageLink: string;
  fileId: string;
};

const Exam = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchRef = useRef<HTMLDivElement | null>(null);
  const [papers, setPapers] = useState<PaperData[]>([]);

  //to put search query back from local storage
  useEffect(() => {
    const storedQuery = localStorage.getItem("searchQuery");
    if (storedQuery) {
      setSearchQuery(storedQuery);
      handleSearch(storedQuery);
    }
  }, []);
  useEffect(() => {
    const handleAppClose = () => {
      localStorage.removeItem("searchQuery");
    };

    window.addEventListener("beforeunload", handleAppClose);

    return () => {
      window.removeEventListener("beforeunload", handleAppClose);
      handleAppClose();
    };
  }, []);

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    localStorage.setItem("searchQuery", query); // Store search query in localStorage
    if (query.trim() !== "") {
      handleSearch(query);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      const response = await axiosInstance.get("api/papers/search", {
        params: { query },
      });
      if (response.data && response.data.papers) {
        setPapers(response.data.papers); // Adjusting to the correct data
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
  };

  useEffect(() => {
    if (searchQuery.trim() !== "" && searchRef.current) {
      searchRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [searchQuery]);

  return (
    <div className="relative bg-matt-black min-h-screen overflow-hidden">
      <Stars />
      <div className="relative z-10 pt-50 flex flex-col items-center">
        <img src={Logo} className="h-[110px] sm:h-[200px] mb-4" />
        <div ref={searchRef} className="mt-10">
          {/* For scroll to view the search when searching */}
          <Searchbar
            value={searchQuery}
            onChange={onSearchChange}
            onClearSearch={onClearSearch}
          />
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 justify-items-center">
            {searchQuery &&
              papers.length > 0 &&
              papers.map((item) => (
                <div key={item._id}>
                  <Paper
                    title={item.title}
                    image={item.imageLink}
                    file={`https://res.cloudinary.com/dv7amemcg/raw/upload/v1743523325/${item.fileId}`} //don't use like this replace later
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam;
