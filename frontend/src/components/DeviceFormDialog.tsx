import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, MenuItem } from '@mui/material';
import { deviceSchema, type DeviceFormData } from '../schemas/deviceSchema';
import { getEmployees } from '../services/employeeService';
import type { Employee, Device } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: DeviceFormData) => Promise<void>;
  deviceToEdit?: Device | null;
}

export default function DeviceFormDialog({ open, onClose, onSubmit, deviceToEdit }: Props) {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      serialNumber: '',
      type: '',
      price: 0,
      purchaseDate: new Date().toISOString().split('T')[0],
      employeeId: '', 
    },
  });

  useEffect(() => {
    if (open) {
      getEmployees().then(setEmployees).catch(console.error);

      if (deviceToEdit) {
        reset({
          serialNumber: deviceToEdit.serialNumber,
          type: deviceToEdit.type,
          price: deviceToEdit.price,
          purchaseDate: new Date(deviceToEdit.purchaseDate).toISOString().split('T')[0],
          employeeId: deviceToEdit.employeeId ? deviceToEdit.employeeId : '',
        });
      } else {
        reset({
          serialNumber: '',
          type: '',
          price: 0,
          purchaseDate: new Date().toISOString().split('T')[0],
          employeeId: '', 
        });
      }
    }
  }, [open, deviceToEdit, reset]);

  const handleFormSubmit = (data: any) => {
    const payload = {
      ...data,
      purchaseDate: new Date(data.purchaseDate).toISOString(),
      employeeId: data.employeeId === '' ? null : Number(data.employeeId),
    };
    onSubmit(payload);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {deviceToEdit ? 'Edytuj Urządzenie' : 'Dodaj Urządzenie'}
      </DialogTitle>
      
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            
            <Controller
              name="serialNumber"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} label="Numer Seryjny" fullWidth 
                  error={!!errors.serialNumber} helperText={errors.serialNumber?.message as string} 
                />
              )}
            />

            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} label="Typ" fullWidth 
                  error={!!errors.type} helperText={errors.type?.message as string} 
                />
              )}
            />

            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} type="number" label="Cena (PLN)" fullWidth 
                  error={!!errors.price} helperText={errors.price?.message as string} 
                />
              )}
            />

            <Controller
              name="purchaseDate"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} type="date" label="Data Zakupu" fullWidth InputLabelProps={{ shrink: true }}
                  error={!!errors.purchaseDate} helperText={errors.purchaseDate?.message as string} 
                />
              )}
            />

            <Controller
              name="employeeId"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} select label="Przypisz do pracownika" fullWidth 
                  helperText="Zostaw puste, aby dodać do magazynu"
                >
                  <MenuItem value=""><em>-- Magazyn --</em></MenuItem>
                  {employees.map((emp) => (
                    <MenuItem key={emp.id} value={emp.id}>
                      {emp.firstName} {emp.lastName}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Anuluj</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {deviceToEdit ? 'Zapisz zmiany' : 'Dodaj'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}