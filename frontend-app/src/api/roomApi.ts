import api from './axios';

export const getOrCreateRoomApi = async (userAId: string, userBId: string) => {
  const res = await api.post('/rooms/private', { userAId, userBId });
  return res.data;
};
