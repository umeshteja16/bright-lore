import { useState, useEffect, useRef, useLayoutEffect } from "react";
import ChatSearch from "./chatSearch";
import "./chat.css";
import Markdown from "../Markdown/Markdown";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../pages/auth/AuthProvider"; // Adjust path if needed
import { toast } from "sonner"; // ✅ Sonner toast

interface ChatProps {
  startChat: () => void;
}

interface ChatMessage {
  sender: "user" | "bot";
  content: string;
}

const MAX_GUEST_CHATS = 10;
const MAX_USER_CHATS = 100;

const Chat = ({ startChat }: ChatProps) => {
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatCount, setChatCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Define a type for user if not already typed
  interface AuthUser {
    email?: string;
    [key: string]: any;
  }

  const { user } = useAuth() as { user: AuthUser | null }; // Ensure user has correct type
  const chatKey = user && user.email ? `chatCount_${user.email}` : "guestChatCount";
  const chatLimit = user ? MAX_USER_CHATS : MAX_GUEST_CHATS;

  // Scroll into view on new message
  useLayoutEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  // Restore chat and count on load
  useEffect(() => {
    const storedMessages = sessionStorage.getItem("loreChat");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
      setChatStarted(true);
    }

    const storedCount = parseInt(localStorage.getItem(chatKey) || "0", 10);
    setChatCount(isNaN(storedCount) ? 0 : storedCount);
  }, [user]); // Re-run when user changes (login/logout)

  // Save messages to sessionStorage
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem("loreChat", JSON.stringify(messages));
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!msg.trim()) return;

    if (chatCount >= chatLimit) {
      toast.error("Chat Limit Reached", {
        description: `You've used your ${chatLimit} chats for today. Please log in or try again tomorrow.`,
      });
      return;
    }

    const text = msg;
    setMessages((prev) => [...prev, { sender: "user", content: msg }]);
    setMsg("");

    setMessages((prev) => [...prev, { sender: "bot", content: "" }]);

    try {
      const result = await axiosInstance.post("api/chats/chatting", {
        text: text,
        email: user?.email || undefined,
      });

      const responseText =
        result?.data?.message && typeof result.data.message === "string"
          ? result.data.message
          : "LoreBot is facing an issue with this query. Please try again.";

      const words = responseText.split(" ");
      let current = "";
      let i = 0;

      const interval = setInterval(() => {
        current += words[i] + " ";
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            sender: "bot",
            content: current.trim(),
          };
          return updated;
        });
        i++;
        if (i >= words.length) clearInterval(interval);
      }, 5);

      // Update chat count
      const newCount = chatCount + 1;
      localStorage.setItem(chatKey, newCount.toString());
      setChatCount(newCount);
    } catch (error) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          sender: "bot",
          content:
            "Something went wrong while getting a response. Please try again later.",
        },
      ]);
    }
  };

  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-chat-black text-white pt-13 overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-10 space-y-4 min-h-0">
        {!chatStarted ? (
          <div className="flex justify-center items-center h-full">
            <button
              className="px-4 py-2 rounded shadow-md transition-all duration-300 text-center text-gray-400 border border-gray-600"
              onClick={async () => {
                setLoading(true);
                await startChat();
                setChatStarted(true);
                setMessages([
                  {
                    sender: "bot",
                    content:
                      "Hello! I’m LoreBot, your academic assistant. Ask me anything related to studies, exams, or concepts!",
                  },
                ]);
              }}
            >
              {!loading ? "Start the conversation! 🚀" : "Loading..."}
            </button>
          </div>
        ) : (
          <>
            {/* Show Remaining Chats */}
            <p className="text-center text-sm text-gray-400">
              You have {chatLimit - chatCount} chats left today.
            </p>

            {/* Chat Messages */}
            {messages.map((message, index) => (
              <div
                key={index}
                className="rounded-md px-4 py-3 shadow bg-chat-black text-white"
              >
                <p className="text-sm font-semibold text-gray-400 mb-2">
                  {message.sender === "user" ? "You" : "LoreBot"}
                </p>
                <Markdown content={message.content} />
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="bg-chat-black p-3 border-t border-gray-700">
        {chatStarted && (
          <ChatSearch
            msg={msg}
            setMsg={setMsg}
            onKeyDown={handleKeyPress}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
