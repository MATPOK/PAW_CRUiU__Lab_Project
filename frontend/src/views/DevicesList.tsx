import { useEffect, useState } from 'react';
import { DataGrid, type GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { Container, Typography, Paper, Box, Button, Chip, TextField, InputAdornment } from '@mui/material'; // Dodano TextField, InputAdornment
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ComputerIcon from '@mui/icons-material/Computer';
import SearchIcon from '@mui/icons-material/Search'; // Dodano ikonę lupy

import { getDevices, deleteDevice, createDevice, updateDevice } from '../services/deviceService';
import type { Device } from '../types';
import DeviceFormDialog from '../components/DeviceFormDialog';
import type { DeviceFormData } from '../schemas/deviceSchema';

export default function DevicesList() {
  const [rows, setRows] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);

  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async (search: string = '') => {
    setLoading(true);
    try {
      const data = await getDevices(search);
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
    if (confirm('Usunąć to urządzenie?')) {
      await deleteDevice(id);
      fetchData(searchTerm); 
    }
  };

  const handleOpenAdd = () => {
    setEditingDevice(null);
    setIsModalOpen(true);
  };

  const handleEdit = (device: Device) => {
    setEditingDevice(device);
    setIsModalOpen(true);
  };

  const handleSave = async (data: DeviceFormData) => {
    try {
      if (editingDevice) {
        await updateDevice(editingDevice.id, data);
      } else {
        await createDevice(data);
      }
      setIsModalOpen(false);
      fetchData(searchTerm);
    } catch (error) {
      alert('Błąd zapisu! Sprawdź czy wypełniłeś wszystkie pola.');
      console.error(error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    { 
      field: 'serialNumber', 
      headerName: 'Nr Seryjny', 
      width: 150,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
           <ComputerIcon fontSize="small" color="disabled"/>
           {params.value}
        </Box>
      )
    },
    { field: 'type', headerName: 'Typ', width: 120 },
    { 
      field: 'price', 
      headerName: 'Cena', 
      width: 100,
      valueFormatter: (value) => `${value} zł`
    },
    {
      field: 'employee',
      headerName: 'Użytkownik',
      width: 200,
      renderCell: (params) => {
        if (params.value) {
           return <Chip label={`${params.value.firstName} ${params.value.lastName}`} color="primary" variant="outlined" size="small" />;
        }
        return <Chip label="Magazyn" color="default" size="small" />;
      }
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
        <Typography variant="h4" sx={{ color: 'white' }}>Rejestr Urządzeń</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleOpenAdd}
        >
          Dodaj Urządzenie
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Szukaj urządzenia (numer seryjny, typ, właściciel)..."
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

      <DeviceFormDialog 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSave} 
        deviceToEdit={editingDevice} 
      />
    </Container>
  );
}