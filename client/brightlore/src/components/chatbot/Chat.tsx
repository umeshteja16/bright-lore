import { useState, useEffect, useRef } from "react";
import ChatSearch from "./chatSearch";

const Chat = ({}) => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([
    "user: Hello",
    "Good Morning",
    "How can I assist you today?",
    "Feel free to ask anything! 🚀",
    "Example question: What is AI?",
    "user: Hello",
    "Good Morning",
    "How can I assist you today?",
    "Feel free to ask anything! 🚀",
    "Example question: What is AI?",
    "user: Hello",
    "Good Morning",
    "How can I assist you today?",
    "Feel free to ask anything! 🚀",
    "Example question: What is AI?",
    "user: Hello",
    "Good Morning",
    "How can I assist you today?",
    "Feel free to ask anything! 🚀",
    "Example question: What is AI?","user: Hello",
    "Good Morning",
    "How can I assist you today?",
    "Feel free to ask anything! 🚀",
    "Example question: What is AI?",

  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (msg.trim()) {
      setMessages([...messages, `user: ${msg}`]);
      setMsg(""); // Clear input after sending
    }
  };
  const handleKeyPress = (e: { key: string; })=>{
    if(e.key==="Enter" || e.key==="NumpadEnter"){
        handleSendMessage();
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 border border-gray-700 rounded-md">
        {messages.length === 0 ? (
          <p className="text-center text-gray-400">
            Start the conversation! 🚀
          </p>
        ) : (
          messages.map((message, index) => (
            <div key={index} className="mb-2 p-2 bg-gray-800 rounded-md">
              <h1 className="text-gray-300">{message}</h1>
            </div>
          ))
        )}
        <div ref={messagesEndRef} /> {/* Auto-scroll target */}
      </div>

      {/* Chat Input at Bottom */}
      <div className="sticky bottom-0 left-0 w-full bg-gray-900 p-2 border-t border-gray-700">
        <ChatSearch
          msg={msg}
          setMsg={setMsg}
          handleSendMessage={handleSendMessage}
          onKeyDown ={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default Chat;
