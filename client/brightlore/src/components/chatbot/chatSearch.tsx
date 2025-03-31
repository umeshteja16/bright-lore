import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const chatSearch = ({
  msg,
  setMsg,
  onKeyDown,
}: {
  msg: string;
  setMsg: (value: string) => void;
  onKeyDown: any;
}) => {
  return (
    <div className="bg-matt-black flex justify-center">
      <div className="">
        <div
          className={`${
            msg ? "w-70 sm:w-100 md:w-130" : "w-70 sm:w-80 md:w-110"
          } flex backdrop-blur-3xl items-center px-4 bg-search rounded-lg transition-all duration-500`}
        >
          <input
            type="text"
            placeholder="Ask away! I'm here to help. 💡"
            className={`w-full ${
              msg
                ? "text-sm sm:text-base md:text-xl"
                : " text-base sm:text-base md:text-xl"
            } py-[11px] outline-none text-white`}
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            onKeyDown={onKeyDown}
          />
          {msg && (
            <IoMdClose
              onClick={() => {}}
              className="text-xl text-slate-500 cursor-pointer hover:text-black"
            />
          )}
          {!msg && (
            <FaMagnifyingGlass
              onClick={() => {}}
              className="text-slate-400 cursor-pointer hover:text-black"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default chatSearch;
