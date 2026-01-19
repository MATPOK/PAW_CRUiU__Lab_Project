import { api } from '../api/axios';
import type { Device } from '../types';
import type { DeviceFormData } from '../schemas/deviceSchema';

export const getDevices = async (search: string = ''): Promise<Device[]> => {
  const response = await api.get('/devices', { params: { search } });
  
  if (response.data && Array.isArray((response.data as any).data)) {
      return (response.data as any).data;
  }
  return response.data as Device[];
};

export const deleteDevice = async (id: number) => {
  await api.delete(`/devices/${id}`);
};

export const createDevice = async (data: DeviceFormData) => {
  const response = await api.post<Device>('/devices', data);
  return response.data;
};

export const updateDevice = async (id: number, data: DeviceFormData) => {
  const response = await api.patch<Device>(`/devices/${id}`, data);
  return response.data;
};