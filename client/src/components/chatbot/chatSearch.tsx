import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaArrowCircleUp } from "react-icons/fa";
import { useRef, useEffect } from "react";

const ChatSearch = ({
  msg,
  setMsg,
  onKeyDown,
}: {
  msg: string;
  setMsg: (value: string) => void;
  onKeyDown: any;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-resize on value change
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "0px"; // reset
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [msg]);
  const handleSend = () => {
    onKeyDown({ key: "Enter", preventDefault: () => {} });
  };

  return (
    <div className="bg-chat-black flex justify-center">
      <div>
        <div
          className={`${
            msg ? "w-70 sm:w-100 md:w-130" : "w-70 sm:w-80 md:w-110"
          } flex backdrop-blur-3xl items-center px-4 bg-search rounded-lg transition-all duration-500`}
        >
          <textarea
            ref={textareaRef}
            placeholder="Ask away! I'm here to help. 💡"
            className={`w-full resize-none overflow-hidden bg-transparent ${
              msg
                ? "text-sm sm:text-base md:text-xl"
                : "text-base sm:text-base md:text-xl"
            } py-[11px] outline-none text-white`}
            rows={1}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // to prevent new line
                onKeyDown(e);
              }
            }}
          />
          {msg ? (
            <FaArrowCircleUp
              onClick={handleSend}
              className="text-xl text-slate-500 cursor-pointer hover:text-black"
            />
          ) : (
            <FaMagnifyingGlass className="text-slate-400 cursor-pointer hover:text-black" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSearch;
