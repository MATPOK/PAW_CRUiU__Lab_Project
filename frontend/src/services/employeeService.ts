import { api } from '../api/axios';
import type { Employee } from '../types';
import type { EmployeeFormData } from '../schemas/employeeSchema';

export const getEmployees = async () => {
  const response = await api.get<Employee[]>('/employees');
  return response.data;
};

export const deleteEmployee = async (id: number) => {
  await api.delete(`/employees/${id}`);
};

export const createEmployee = async (data: EmployeeFormData) => {
  const response = await api.post<Employee>('/employees', data);
  return response.data;
};