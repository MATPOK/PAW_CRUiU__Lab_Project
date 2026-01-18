import { z } from 'zod';

export const employeeSchema = z.object({
  firstName: z.string().min(2, 'Imię musi mieć min. 2 znaki'),
  lastName: z.string().min(2, 'Nazwisko musi mieć min. 2 znaki'),
  email: z.string().email('Podaj poprawny adres email'),
  departmentId: z.coerce.number().min(1, 'Wybierz dział'),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;