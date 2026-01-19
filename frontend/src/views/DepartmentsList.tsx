import { useEffect, useState } from 'react';
import { DataGrid, type GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Container, Typography, Paper, Box, Button, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import BusinessIcon from '@mui/icons-material/Business';
import { getDepartments, deleteDepartment, createDepartment, updateDepartment, type Department } from '../services/departmentService';
import DepartmentFormDialog from '../components/DepartmentFormDialog';
import type { DepartmentFormData } from '../schemas/departmentSchema';

export default function DepartmentsList() {
  const [rows, setRows] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);

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
    if (confirm('Czy na pewno usunąć ten dział?')) {
      try {
        await deleteDepartment(id);
        fetchData();
      } catch (error) {
        alert('Nie można usunąć działu, który ma przypisanych pracowników.');
      }
    }
  };

  const handleOpenAdd = () => {
    setEditingDept(null);
    setIsModalOpen(true);
  };

  const handleEdit = (dept: Department) => {
    setEditingDept(dept);
    setIsModalOpen(true);
  };

  const handleSave = async (data: DepartmentFormData) => {
    try {
      if (editingDept) {
        await updateDepartment(editingDept.id, data);
      } else {
        await createDepartment(data);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error(error);
      alert('Błąd zapisu.');
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
        <Typography variant="h4" sx={{ color: 'white' }}>Działy</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleOpenAdd}
        >
          Dodaj Dział
        </Button>
      </Box>

      <Paper sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          disableRowSelectionOnClick
        />
      </Paper>

      <DepartmentFormDialog 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSave} 
        departmentToEdit={editingDept}
      />
    </Container>
  );
}