import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack } from '@mui/material';
import { departmentSchema, type DepartmentFormData } from '../schemas/departmentSchema';
import type { Department } from '../services/departmentService';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: DepartmentFormData) => Promise<void>;
  departmentToEdit?: Department | null;
}

export default function DepartmentFormDialog({ open, onClose, onSubmit, departmentToEdit }: Props) {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: '',
      location: '',
    },
  });

  useEffect(() => {
    if (open) {
      if (departmentToEdit) {
        reset({
          name: departmentToEdit.name,
          location: departmentToEdit.location,
        });
      } else {
        reset({ name: '', location: '' });
      }
    }
  }, [open, departmentToEdit, reset]);

  const handleFormSubmit = (data: DepartmentFormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {departmentToEdit ? 'Edytuj Dział' : 'Dodaj Dział'}
      </DialogTitle>
      
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  label="Nazwa Działu" 
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
                  label="Lokalizacja" 
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
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {departmentToEdit ? 'Zapisz zmiany' : 'Dodaj'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}