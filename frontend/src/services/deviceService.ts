import { api } from '../api/axios';
import type { Device, PaginatedResponse } from '../types';
import type { DeviceFormData } from '../schemas/deviceSchema';

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

export const createDevice = async (data: DeviceFormData) => {
  // Konwersja daty na format ISO (wymagane przez backend/Prisma)
  const payload = {
    ...data,
    purchaseDate: new Date(data.purchaseDate).toISOString(),
  };
  const response = await api.post<Device>('/devices', payload);
  return response.data;
};

export const deleteDevice = async (id: number) => {
  await api.delete(`/devices/${id}`);
};