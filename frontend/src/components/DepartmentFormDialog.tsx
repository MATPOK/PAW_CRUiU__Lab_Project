import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material';
import { departmentSchema, type DepartmentFormData } from '../schemas/departmentSchema';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: DepartmentFormData) => Promise<void>;
}

export default function DepartmentFormDialog({ open, onClose, onSubmit }: Props) {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: '',
      location: '',
    },
  });

  useEffect(() => {
    if (open) {
      reset({ name: '', location: '' });
    }
  }, [open, reset]);

  const handleFormSubmit = (data: DepartmentFormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Dodaj Dział</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  label="Nazwa Działu (np. Logistyka)" 
                  fullWidth 
                  error={!!errors.name} 
                  helperText={errors.name?.message} 
                />
              )}
            />

            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  label="Lokalizacja (np. Budynek B)" 
                  fullWidth 
                  error={!!errors.location} 
                  helperText={errors.location?.message} 
                />
              )}
            />

          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Anuluj</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>Zapisz</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}