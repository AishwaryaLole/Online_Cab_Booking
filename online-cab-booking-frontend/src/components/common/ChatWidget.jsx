import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { sendChatMessage } from "../../services/chatService";

export default function ChatWidget() {
  const { userId, role, token, isAuthenticated } = useAuth();

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me anythink.." },
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  if (!isAuthenticated) return null;

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setLoading(true);

    const res = await sendChatMessage(text, userId, role, token);

    setMessages((prev) => [...prev, { from: "bot", text: res.reply }]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 flex items-center justify-between">
            <span className="font-semibold text-sm">CabGo Assistant</span>
            <button onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-gray-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2 rounded-xl text-sm whitespace-pre-line ${
                  m.from === "user"
                    ? "bg-indigo-500 text-white ml-auto rounded-br-sm"
                    : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="text-xs text-gray-400 px-1">Typing...</div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="flex items-center gap-2 border-t border-gray-200 p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 text-sm px-3 py-2 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 disabled:opacity-60"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl flex items-center justify-center hover:opacity-90 transition"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}