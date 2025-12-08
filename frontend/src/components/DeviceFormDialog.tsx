import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material';
import { deviceSchema, type DeviceFormData } from '../schemas/deviceSchema';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: DeviceFormData) => Promise<void>;
}

export default function DeviceFormDialog({ open, onClose, onSubmit }: Props) {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<DeviceFormData>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      serialNumber: '',
      type: '',
      price: 0,
      purchaseDate: new Date().toISOString().split('T')[0], // Dzisiejsza data YYYY-MM-DD
    },
  });

  // Resetuj formularz przy każdym otwarciu
  useEffect(() => {
    if (open) reset();
  }, [open, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Dodaj nowe urządzenie</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            
            {/* Pole: Numer Seryjny */}
            <Controller
              name="serialNumber"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  label="Numer Seryjny" 
                  error={!!errors.serialNumber}
                  helperText={errors.serialNumber?.message}
                  fullWidth 
                />
              )}
            />

            {/* Pole: Typ */}
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  label="Typ (np. Laptop)" 
                  error={!!errors.type}
                  helperText={errors.type?.message}
                  fullWidth 
                />
              )}
            />

            {/* Pole: Cena */}
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  label="Cena (PLN)" 
                  type="number"
                  error={!!errors.price}
                  helperText={errors.price?.message}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  fullWidth 
                />
              )}
            />

            {/* Pole: Data Zakupu */}
            <Controller
              name="purchaseDate"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  label="Data Zakupu" 
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.purchaseDate}
                  helperText={errors.purchaseDate?.message}
                  fullWidth 
                />
              )}
            />

          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Anuluj</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Zapisz
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}