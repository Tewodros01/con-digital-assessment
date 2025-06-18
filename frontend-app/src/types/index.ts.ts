export interface Message {
  id: string;
  content: string;
  senderId: string;
  roomId: string;
  createdAt: string;
  sender: {
    id: string;
    username: string;
  };
}
