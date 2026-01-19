import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, MenuItem } from '@mui/material';
import { employeeSchema, type EmployeeFormData } from '../schemas/employeeSchema';
import { getDepartments, type Department } from '../services/departmentService'; 
import type { Employee } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeFormData) => Promise<void>;
  employeeToEdit?: Employee | null;
}

export default function EmployeeFormDialog({ open, onClose, onSubmit, employeeToEdit }: Props) {
  const [departments, setDepartments] = useState<Department[]>([]);
  
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      departmentId: 0, 
    },
  });

  useEffect(() => {
    if (open) {
      getDepartments().then((data) => {
        setDepartments(data);
        const defaultDeptId = data.length > 0 ? data[0].id : 0;
        
        if (employeeToEdit) {
          reset({
            firstName: employeeToEdit.firstName,
            lastName: employeeToEdit.lastName,
            email: employeeToEdit.email,
            departmentId: employeeToEdit.department?.id || 0,
          });
        } else {
          reset({
            firstName: '',
            lastName: '',
            email: '',
            departmentId: defaultDeptId,
          });
        }
      }).catch(err => console.error("Błąd pobierania działów:", err));
    }
  }, [open, employeeToEdit, reset]);

  const handleFormSubmit = (data: any) => {
    onSubmit(data as EmployeeFormData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {employeeToEdit ? 'Edytuj Pracownika' : 'Dodaj Pracownika'}
      </DialogTitle>
      
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} label="Imię" fullWidth 
                  error={!!errors.firstName} helperText={errors.firstName?.message as string} 
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} label="Nazwisko" fullWidth 
                  error={!!errors.lastName} helperText={errors.lastName?.message as string} 
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} label="Email" fullWidth 
                  error={!!errors.email} helperText={errors.email?.message as string} 
                />
              )}
            />

            <Controller
              name="departmentId"
              control={control}
              render={({ field }) => (
                <TextField 
                  {...field} select label="Dział" fullWidth 
                  error={!!errors.departmentId} helperText={errors.departmentId?.message as string}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={departments.length === 0}
                >
                  {departments.length > 0 ? (
                    departments.map((dept) => (
                      <MenuItem key={dept.id} value={dept.id}>
                        {dept.name} ({dept.location})
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value={0}>Brak działów</MenuItem>
                  )}
                </TextField>
              )}
            />

          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Anuluj</Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {employeeToEdit ? 'Zapisz zmiany' : 'Dodaj'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}