import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form'; // Usunąłem SubmitHandler, uprościmy to
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, MenuItem } from '@mui/material';
import { employeeSchema, type EmployeeFormData } from '../schemas/employeeSchema';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeFormData) => Promise<void>;
}

const DEPARTMENTS = [
  { id: 1, name: 'IT' },
  { id: 2, name: 'HR' },
  { id: 3, name: 'Sprzedaż' },
  { id: 4, name: 'Marketing' },
];

export default function EmployeeFormDialog({ open, onClose, onSubmit }: Props) {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      departmentId: 1,
    },
  });

  // Resetowanie formularza przy otwarciu
  useEffect(() => {
    if (open) {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        departmentId: 1,
      });
    }
  }, [open, reset]);

  // Prostsza funkcja submit, która uspokaja TypeScripta
  const handleFormSubmit = (data: EmployeeFormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Dodaj Pracownika</DialogTitle>
      
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  label="Imię" 
                  fullWidth 
                  error={!!errors.firstName} 
                  helperText={errors.firstName?.message} 
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  label="Nazwisko" 
                  fullWidth 
                  error={!!errors.lastName} 
                  helperText={errors.lastName?.message} 
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} 
                  label="Email" 
                  fullWidth 
                  error={!!errors.email} 
                  helperText={errors.email?.message} 
                />
              )}
            />

            {/* Wybór działu */}
            <Controller
              name="departmentId"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field}
                  select 
                  label="Dział" 
                  fullWidth 
                  error={!!errors.departmentId} 
                  helperText={errors.departmentId?.message}
                  // WAŻNE: To naprawia problem z wybieraniem działu
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    field.onChange(val);
                  }}
                >
                  {DEPARTMENTS.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
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
            Zapisz
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}