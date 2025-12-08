import { z } from 'zod';

export const deviceSchema = z.object({
  serialNumber: z.string().min(3, 'Numer seryjny musi mieć min. 3 znaki'),
  type: z.string().min(1, 'Typ urządzenia jest wymagany'),
  
  // ZMIANA: Usunąłem obiekt konfiguracyjny z z.number(), zostawiając tylko walidację wartości
  price: z.number().positive('Cena musi być dodatnia'),
  
  purchaseDate: z.string().refine((date) => new Date(date).toString() !== 'Invalid Date', {
    message: 'Podaj poprawną datę',
  }),
});

export type DeviceFormData = z.infer<typeof deviceSchema>;