import type { Message } from "../types/index.ts";
import axios from "./axios";

export const fetchMessagesByRoomId = async (roomId: string): Promise<Message[]> => {
  const res = await axios.get(`/messages/room/${roomId}`);
  return res.data;
};
