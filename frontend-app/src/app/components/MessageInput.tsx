import { useState } from 'react';
import socket from '../../services/socket';

export default function MessageInput({ roomId, senderId }: { roomId: string; senderId: string }) {
  const [content, setContent] = useState('');

  const send = () => {
    if (content.trim()) {
      socket.emit('send_message', { roomId, senderId, content });
      setContent('');
    }
  };

  return (
    <div className="flex gap-2 p-2 border-t">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && send()}
        placeholder="Type a message..."
        className="flex-1 border px-3 py-2 rounded"
      />
      <button onClick={send} className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
    </div>
  );
}
