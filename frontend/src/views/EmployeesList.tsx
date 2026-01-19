import { useEffect, useState } from 'react';
import { DataGrid, type GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Container, Typography, Paper, Chip, Box, Button, TextField, InputAdornment } from '@mui/material'; // Dodano TextField, InputAdornment
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search'; 

import { getEmployees, deleteEmployee, createEmployee, updateEmployee } from '../services/employeeService';
import type { Employee } from '../types';
import EmployeeFormDialog from '../components/EmployeeFormDialog';
import type { EmployeeFormData } from '../schemas/employeeSchema';

export default function EmployeesList() {
  const [rows, setRows] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async (search: string = '') => {
    setLoading(true);
    try {
      const data = await getEmployees(search);
      setRows(data);
    } catch (error) {
      console.error("Błąd pobierania:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value); 
    fetchData(value);     
  };

  const handleDelete = async (id: number) => {
    if (confirm('Czy na pewno chcesz usunąć tego pracownika?')) {
      try {
        await deleteEmployee(id);
        fetchData(searchTerm);
      } catch (error) {
        alert('Nie udało się usunąć. Może ma przypisane urządzenia?');
      }
    }
  };

  const handleOpenAdd = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleSave = async (data: EmployeeFormData) => {
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, data);
      } else {
        await createEmployee(data);
      }
      setIsModalOpen(false);
      fetchData(searchTerm);
    } catch (error) {
      alert('Błąd zapisu. Sprawdź czy email jest unikalny!');
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'firstName', headerName: 'Imię', width: 150 },
    { field: 'lastName', headerName: 'Nazwisko', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
    { 
      field: 'department', 
      headerName: 'Dział', 
      width: 150,
      valueGetter: (params: any) => params?.name || 'Brak',
      renderCell: (params) => <Chip label={params.value} size="small" variant="outlined" />
    },
    {
      field: 'devices',
      headerName: 'Urządzenia',
      width: 120,
      valueGetter: (params: any) => params ? params.length : 0,
      renderCell: (params) => <Chip label={params.value} size="small" />
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Akcje',
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon color="primary" />}
          label="Edit"
          onClick={() => handleEdit(params.row)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon color="error" />}
          label="Delete"
          onClick={() => handleDelete(params.row.id)}
          color="inherit"
        />,
      ],
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" sx={{ color: 'white' }}>Pracownicy</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleOpenAdd}
        >
          Dodaj Pracownika
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Szukaj pracownika (imię, nazwisko, email)..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          size="small"
        />
      </Paper>

      <Paper sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10]}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          disableRowSelectionOnClick
        />
      </Paper>

    
      <EmployeeFormDialog 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSave} 
        employeeToEdit={editingEmployee}
      />
    </Container>
  );
}