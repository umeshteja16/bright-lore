import React from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { SearchbarProps } from "../types/types";
import "./Searchbar.css";

const Searchbar: React.FC<SearchbarProps> = ({
  value,
  onChange,
  onClearSearch,
}) => {
  return (
    <div
      className={`${
        value ? "w-100 sm:w-130 md:w-160" : "w-70 sm:w-80 md:w-110"
      } flex backdrop-blur-3xl items-center px-4 bg-search rounded-lg transition-all duration-500`}
    >
      <input
        type="text"
        placeholder="Explore the repository"
        className={`w-full ${
          value
            ? "text-sm sm:text-base md:text-xl"
            : " text-base sm:text-base md:text-xl"
        } py-[11px] outline-none text-white`}
        value={value}
        onChange={onChange}
      />
      {value && (
        <IoMdClose
          onClick={onClearSearch}
          className="text-xl text-slate-500 cursor-pointer hover:text-black"
        />
      )}
      {!value && (
        <FaMagnifyingGlass className="text-slate-400 cursor-pointer hover:text-black" />
      )}
    </div>
  );
};

export default Searchbar;
