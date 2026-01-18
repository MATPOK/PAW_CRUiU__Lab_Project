import { useEffect, useState } from 'react';
import { DataGrid, type GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Container, Typography, Paper, Box, Button, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import BusinessIcon from '@mui/icons-material/Business';
import { getDepartments, deleteDepartment, createDepartment, type Department } from '../services/departmentService';
import DepartmentFormDialog from '../components/DepartmentFormDialog';
import type { DepartmentFormData } from '../schemas/departmentSchema';

export default function DepartmentsList() {
  const [rows, setRows] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getDepartments();
      setRows(data);
    } catch (error) {
      console.error("Błąd pobierania działów:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Czy na pewno usunąć ten dział? Upewnij się, że nie ma w nim pracowników!')) {
      try {
        await deleteDepartment(id);
        fetchData();
      } catch (error) {
        alert('Nie można usunąć działu, który ma przypisanych pracowników.');
      }
    }
  };

  const handleCreate = async (data: DepartmentFormData) => {
    try {
      await createDepartment(data);
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error(error);
      alert('Błąd podczas dodawania działu.');
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { 
      field: 'name', 
      headerName: 'Nazwa Działu', 
      width: 200,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
            <BusinessIcon color="action" fontSize="small" />
            {params.value}
        </Box>
      )
    },
    { field: 'location', headerName: 'Lokalizacja', width: 200 },
    {
      field: 'employees',
      headerName: 'Liczba pracowników',
      width: 180,
      valueGetter: (params: any) => params ? params.length : 0,
      renderCell: (params) => <Chip label={params.value} size="small" color="primary" variant="outlined" />
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
        <Typography variant="h4" sx={{ color: 'white' }}>Działy</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => setIsModalOpen(true)}
        >
          Dodaj Dział
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

      <DepartmentFormDialog 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreate} 
      />
    </Container>
  );
}