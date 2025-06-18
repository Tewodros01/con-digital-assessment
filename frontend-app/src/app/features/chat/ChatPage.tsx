import { useEffect, useState } from "react";
import { useAuthStore } from "../../../stores/authStore";
import type { User } from "../../../types/user";
import { fetchUsersApi } from "../../../api/userApi";
import { getOrCreateRoomApi } from "../../../api/roomApi";
import ChatBox from "../../components/ChatBox.tsx";
import { FiUser } from "react-icons/fi";

const ChatPage = () => {
  const currentUser = useAuthStore((s) => s.user);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsersApi()
      .then((res) => setUsers(res))
      .catch(() => setError("Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  const startChat = async (targetUser: User) => {
    try {
      setSelectedUser(targetUser);
      const room = await getOrCreateRoomApi(currentUser!.id, targetUser.id);
      setRoomId(room.id);
    } catch {
      setError("Failed to create or fetch room");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading users...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="flex flex-1 h-full">
      <aside className="w-80 bg-white border-r  overflow-y-auto">
        <div className="mb-4 p-6 border-b border-gray-400 pb-4">
          <h3 className="text-sm text-gray-600 font-semibold">
             Conversations
          </h3>
        </div>
        <ul className="space-y-4 p-4">
          {users
            .filter((u) => u.id !== currentUser?.id)
            .map((user) => {
              return (
                <li
                  key={user.id}
                  onClick={() => startChat(user)}
                  className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <FiUser className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {user.username}
                      </h4>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </aside>
      <main className="flex-1 p-4 overflow-y-auto">
        {selectedUser && roomId ? (
          <>
            <ChatBox
              roomId={roomId}
              userId={currentUser!.id}
              selectedUser={selectedUser}
              onBack={() => {
                setSelectedUser(null);
                setRoomId(null);
              }}
            />
          </>
        ) : (
          <div className="text-gray-500 mt-10 text-center">
            Select a user to start chatting
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatPage;
