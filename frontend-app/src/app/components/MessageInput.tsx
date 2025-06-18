import { useState } from "react";
import socket from "../../services/socket";
import { HiPaperAirplane } from "react-icons/hi";

export default function MessageInput({
  roomId,
  senderId,
}: {
  roomId: string;
  senderId: string;
}) {
  const [content, setContent] = useState("");

  const send = () => {
    if (content.trim()) {
      socket.emit("send_message", { roomId, senderId, content });
      setContent("");
    }
  };

  return (
    <div className="border-t px-4 py-3 flex items-center gap-2 bg-white">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        placeholder="Write your message here"
        className="flex-1 px-4 py-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-400"
      />
      <button
        onClick={send}
        className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600"
      >
        <HiPaperAirplane className="w-5 h-5 transform rotate-90" />
      </button>
    </div>
  );
}
