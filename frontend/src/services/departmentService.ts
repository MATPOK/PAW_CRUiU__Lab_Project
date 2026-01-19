import { api } from '../api/axios';

export interface Department {
  id: number;
  name: string;
  location: string;
  employees?: any[];
}

export const getDepartments = async (search: string = '') => {
  const response = await api.get<Department[]>('/departments', { params: { search } });
  return response.data;
};

export const createDepartment = async (data: { name: string; location: string }) => {
  const response = await api.post<Department>('/departments', data);
  return response.data;
};

export const deleteDepartment = async (id: number) => {
  await api.delete(`/departments/${id}`);
};

export const updateDepartment = async (id: number, data: { name: string; location: string }) => {
  const response = await api.patch<Department>(`/departments/${id}`, data);
  return response.data;
};