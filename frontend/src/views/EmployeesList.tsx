import { useEffect, useState } from 'react';
import { DataGrid, type GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Container, Typography, Paper, Chip, Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getEmployees, deleteEmployee, createEmployee } from '../services/employeeService';
import type { Employee } from '../types';
import EmployeeFormDialog from '../components/EmployeeFormDialog'; // <--- Import modala
import type { EmployeeFormData } from '../schemas/employeeSchema';

export default function EmployeesList() {
  const [rows, setRows] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Stan dla modala
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getEmployees();
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

  const handleDelete = async (id: number) => {
    if (confirm('Czy na pewno chcesz usunąć tego pracownika?')) {
      try {
        await deleteEmployee(id);
        fetchData();
      } catch (error) {
        alert('Nie udało się usunąć.');
      }
    }
  };

  // Obsługa dodawania
  const handleCreate = async (data: EmployeeFormData) => {
    try {
      await createEmployee(data);
      setIsModalOpen(false); // Zamknij modal
      fetchData();           // Odśwież tabelę
    } catch (error) {
      alert('Błąd dodawania. Sprawdź czy email jest unikalny i czy dział istnieje w bazie!');
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
      width: 80,
      getActions: (params) => [
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
          onClick={() => setIsModalOpen(true)} // <--- Otwórz modal
        >
          Dodaj Pracownika
        </Button>
      </Box>

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

      {/* Modal */}
      <EmployeeFormDialog 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreate} 
      />
    </Container>
  );
}