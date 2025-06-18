import type { Message } from '../../types/index.ts';

export default function MessageList({ messages, userId }: { messages: Message[]; userId: string }) {
  return (
    <div className="p-4 flex flex-col gap-2 overflow-y-auto h-[400px]">
      {messages.map(msg => (
        <div
          key={msg.id}
          className={`max-w-[60%] p-3 rounded-lg ${
            msg.senderId === userId ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 self-start'
          }`}
        >
          <div className="text-xs font-medium text-gray-700">{msg.sender.username}</div>
          <div>{msg.content}</div>
        </div>
      ))}
    </div>
  );
}
