import { useEffect, useState } from 'react';
import { DataGrid, type GridColDef, type GridPaginationModel, GridActionsCellItem } from '@mui/x-data-grid';
import { Container, Typography, Paper, Chip, Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getDevices, createDevice, deleteDevice } from '../services/deviceService';
import type { Device } from '../types';
import DeviceFormDialog from '../components/DeviceFormDialog'; // Import formularza
import type { DeviceFormData } from '../schemas/deviceSchema';

export default function DevicesList() {
  const [rows, setRows] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  // Stan modala
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getDevices(paginationModel.page, paginationModel.pageSize);
      setRows(data.data);
      setTotalRows(data.total);
    } catch (error) {
      console.error("Błąd:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [paginationModel]);

  // Obsługa dodawania
  const handleCreate = async (data: DeviceFormData) => {
    try {
      await createDevice(data);
      setIsModalOpen(false); // Zamknij modal
      fetchData(); // Odśwież tabelę
    } catch (error) {
      alert('Błąd podczas dodawania (sprawdź czy nr seryjny jest unikalny!)');
    }
  };

  // Obsługa usuwania
  const handleDelete = async (id: number) => {
    if (confirm('Czy na pewno chcesz usunąć to urządzenie?')) {
      try {
        await deleteDevice(id);
        fetchData(); // Odśwież tabelę
      } catch (error) {
        alert('Nie udało się usunąć.');
      }
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'serialNumber', headerName: 'Nr Seryjny', width: 150 },
    { field: 'type', headerName: 'Typ', width: 120 },
    { field: 'price', headerName: 'Cena', width: 100, renderCell: (p) => `${p.value} zł` },
    { 
      field: 'employee', 
      headerName: 'Użytkownik', 
      width: 180,
      valueGetter: (p: any) => p ? `${p.firstName} ${p.lastName}` : 'Brak',
      renderCell: (p) => p.value !== 'Brak' 
        ? <Chip label={p.value} color="primary" size="small" variant="outlined"/> 
        : <Chip label="Magazyn" size="small" />
    },
    // NOWE: Kolumna Akcji (Usuwanie)
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
        />,
      ],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Rejestr Urządzeń</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => setIsModalOpen(true)}
        >
          Dodaj Urządzenie
        </Button>
      </Box>
      
      <Paper sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowCount={totalRows}
          loading={loading}
          pageSizeOptions={[5, 10]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
        />
      </Paper>

      {/* Modal z Formularzem */}
      <DeviceFormDialog 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreate} 
      />
    </Container>
  );
}