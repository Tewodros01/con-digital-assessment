import { format } from 'date-fns';
import type { Message } from '../../types/index.ts';

export default function MessageList({ messages, userId }: { messages: Message[]; userId: string }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
      {messages.map((msg) => {
        const isMine = msg.senderId === userId;

        return (
          <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg`}>
              {!isMine && (
                <div className="text-xs text-gray-600 mb-1 ml-1">{msg.sender.username}</div>
              )}
              <div
                className={`rounded-2xl px-4 py-2 text-sm shadow-sm ${
                  isMine ? 'bg-blue-100 text-gray-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                {msg.content}
              </div>
              <div
                className={`text-xs text-gray-400 mt-1 ${
                  isMine ? 'text-right pr-2' : 'text-left pl-2'
                }`}
              >
                {format(new Date(msg.createdAt), 'p')}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
