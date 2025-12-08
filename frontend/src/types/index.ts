export interface Department {
  id: number;
  name: string;
  location?: string;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department?: Department;
}

export interface Device {
  id: number;
  serialNumber: string;
  type: string;
  price: number;
  purchaseDate: string;
  employeeId?: number;
  employee?: Employee;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}