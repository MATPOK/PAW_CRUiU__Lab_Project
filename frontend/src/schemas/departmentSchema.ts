import { z } from 'zod';

export const departmentSchema = z.object({
  name: z.string().min(2, 'Nazwa musi mieć min. 2 znaki'),
  location: z.string().min(2, 'Lokalizacja jest wymagana (np. Piętro 1)'),
});

export type DepartmentFormData = z.infer<typeof departmentSchema>;