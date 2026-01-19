import { z } from 'zod';

export const deviceSchema = z.object({
  serialNumber: z.string().min(3, 'Numer seryjny musi mieć min. 3 znaki'),
  type: z.string().min(2, 'Typ urządzenia jest wymagany'),
  price: z.coerce.number().min(0.01, 'Cena musi być większa od 0'),
  purchaseDate: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', {
    message: 'Podaj poprawną datę',
  }),
  employeeId: z.any().optional(),
});

export type DeviceFormData = z.infer<typeof deviceSchema>;