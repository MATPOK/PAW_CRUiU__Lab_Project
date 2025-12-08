import { api } from '../api/axios';
import { Device, PaginatedResponse } from '../types';

export const getDevices = async (page: number, limit: number) => {
  // Backend oczekuje page=1, page=2...
  // MUI DataGrid liczy od 0, więc musimy dodać +1 przy wysyłaniu
  const response = await api.get<PaginatedResponse<Device>>('/devices', {
    params: {
      page: page + 1,
      limit: limit,
    },
  });
  return response.data;
};