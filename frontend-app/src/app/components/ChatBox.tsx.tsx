import { useEffect, useState } from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import socket from '../../services/socket';
import type { Message } from '../../types/index.ts';

export default function ChatBox({ roomId, userId }: { roomId: string; userId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.emit('join_room', { userId, roomId });
  
    socket.on('receive_message', (message: Message) => {
      console.log(' Received in frontend:', message); // Log this
      setMessages(prev => [...prev, message]);
    });
  
    return () => {
      socket.off('receive_message');
    };
  }, [roomId]);
  

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 border rounded shadow bg-white">
      <MessageList messages={messages} userId={userId} />
      <MessageInput roomId={roomId} senderId={userId} />
    </div>
  );
}
