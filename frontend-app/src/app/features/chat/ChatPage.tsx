import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../../stores/authStore';
import type { User } from '../../../types/user';
import { fetchUsersApi } from '../../../api/userApi';
import { getOrCreateRoomApi } from '../../../api/roomApi';
import ChatBox from '../../components/ChatBox.tsx';

const ChatPage = () => {
  const currentUser = useAuthStore((s) => s.user);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsersApi()
      .then((res) => setUsers(res))
      .catch(() => setError('Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  const startChat = async (targetUser: User) => {
    try {
      setSelectedUser(targetUser);
      const room = await getOrCreateRoomApi(currentUser!.id, targetUser.id);
      setRoomId(room.id);
    } catch (e) {
      setError('Failed to create or fetch room');
    }
  };

  if (!currentUser) return <p className="text-center mt-10">Please login to chat.</p>;
  if (loading) return <p className="text-center mt-10">Loading users...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      {!selectedUser || !roomId ? (
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Select a user to start chatting</h2>
          <ul className="space-y-2">
            {users
              .filter((u) => u.id !== currentUser.id)
              .map((user) => (
                <li key={user.id}>
                  <button
                    onClick={() => startChat(user)}
                    className="w-full text-left px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                  >
                    {user.username}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              setSelectedUser(null);
              setRoomId(null);
            }}
            className="mb-4 text-blue-600 hover:underline"
          >
            ← Back to user list
          </button>
          <h2 className="text-2xl font-semibold mb-2">
            Chat with <span className="text-blue-500">{selectedUser.username}</span>
          </h2>
          <ChatBox roomId={roomId} userId={currentUser.id} />
        </div>
      )}
    </div>
  );
};

export default ChatPage;
