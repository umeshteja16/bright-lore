import { useEffect, useRef, useState } from "react";
import Searchbar from "../Searchbar/Searchbar";
import { ChangeEvent } from "react";
type SearchChangeEvent = ChangeEvent<HTMLInputElement>;
import "./Exam.css";
import Logo from "../../assets/mattblack.jpg";
import jeemain from "../../assets/exams/jeemain.png";
import jeeadv from "../../assets/exams/jeeadv.png";
import Paper from "./Cards/Card";

const Exam = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement | null>(null);
  const papers = [
    {
      _id: 2,
      title: "JEE Main 2024",
      year: 2024,
      image: jeemain,
    },
    {
      _id: 3,
      title: "JEE Advanced 2023",
      year: 2023,
      image: jeeadv,
    },
    {
      _id: 4,
      title: "JEE Main 2023",
      year: 2023,
      image: jeemain,
    },
    {
      _id: 5,
      title: "JEE Advanced 2022",
      year: 2022,
      image: jeeadv,
    },
    {
      _id: 6,
      title: "JEE Main 2022",
      year: 2022,
      image: jeemain,
    },
    {
      _id: 7,
      title: "JEE Advanced 2021",
      year: 2021,
      image: jeeadv,
    },
    {
      _id: 8,
      title: "JEE Main 2021",
      year: 2021,
      image: jeemain,
    },
    {
      _id: 10,
      title: "JEE Main 2020",
      year: 2020,
      image: jeemain,
    },
    {
      _id: 9,
      title: "JEE Advanced 2020",
      year: 2020,
      image: jeeadv,
    },
    {
      _id: 1,
      title: "JEE Advanced 2024",
      year: 2024,
      image: jeeadv,
    },
  ];

  const onSearchChange = (e: SearchChangeEvent) => {
    const query = e.target.value;
    setSearchQuery(query);
  };
  const handleSearch = () => {};
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
    <div className="bg-matt-black min-h-screen">
      <div className="pt-50 flex flex-col items-center">
        <img src={Logo} className="h-[110px] sm:h-[200px] mb-4" />
        <div ref={searchRef} className="mt-10">
          {/*for scroll to view the search when searching*/}
          <Searchbar
            value={searchQuery}
            onChange={onSearchChange}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 justify-items-center">
            {searchQuery &&
              papers.length > 0 &&
              papers
                .sort((a, b) => b.year - a.year)
                .map((item) => (
                  <div key={item._id}>
                    <Paper
                      title={item.title}
                      year={item.year}
                      image={item.image}
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
