import { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import socket from "../../services/socket";
import { fetchMessagesByRoomId } from "../../api/messageApi";
import type { User } from "../../types/user";
import type { Message } from "../../types/index.ts";
import { FiUser } from "react-icons/fi";
import { FiX } from 'react-icons/fi';

export default function ChatBox({
  roomId,
  userId,
  selectedUser,
  onBack,
}: {
  roomId: string;
  userId: string;
  selectedUser: User;
  onBack: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // old messages
    fetchMessagesByRoomId(roomId)
      .then(setMessages)
      .catch((err) => console.error("Failed to fetch messages:", err));

    // Join room
    socket.emit("join_room", { userId, roomId });

    // Listen for new messages
    const handleMessage = (message: Message) => {
      console.log("Received in frontend:", message);
      setMessages((prev) => [...prev, message]);
    };

    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [roomId, userId]);

  return (
    <div className="flex flex-col h-full border rounded shadow bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <FiUser className="w-5 h-5 text-gray-600" />
          </div>

          <div>
            <h2 className="font-semibold text-gray-800">
              {selectedUser.username}
            </h2>
          </div>
        </div>
        <button
          onClick={onBack}
          className="text-gray-400 hover:text-gray-700 text-sm border border-gray-300 rounded-full p-2"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>
      <MessageList messages={messages} userId={userId} />
      <MessageInput roomId={roomId} senderId={userId} />
    </div>
  );
}
