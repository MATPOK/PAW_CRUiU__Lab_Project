import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Container, Typography, Paper, Chip } from '@mui/material';
import { getDevices } from '../services/deviceService';
import { Device } from '../types';

export default function DevicesList() {
  // Stan danych
  const [rows, setRows] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Stan paginacji (MUI trzyma to w obiekcie)
  const [totalRows, setTotalRows] = useState(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  // Funkcja pobierająca dane
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getDevices(paginationModel.page, paginationModel.pageSize);
      setRows(data.data);
      setTotalRows(data.total); // Backend mówi nam, ile jest łącznie rekordów
    } catch (error) {
      console.error("Błąd pobierania:", error);
    } finally {
      setLoading(false);
    }
  };

  // Pobierz dane zawsze, gdy zmieni się strona lub ilość wierszy
  useEffect(() => {
    fetchData();
  }, [paginationModel]);

  // Definicja kolumn
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'serialNumber', headerName: 'Nr Seryjny', width: 150 },
    { field: 'type', headerName: 'Typ', width: 130 },
    { 
      field: 'price', 
      headerName: 'Cena (PLN)', 
      width: 130,
      renderCell: (params) => `${params.value} zł` // Formatowanie waluty
    },
    { 
      field: 'employee', 
      headerName: 'Przypisany do', 
      width: 200,
      valueGetter: (params: any) => {
        // Magia relacji: jeśli jest pracownik, wyświetl imię i nazwisko
        if (!params) return 'Brak';
        return `${params.firstName} ${params.lastName}`;
      },
      renderCell: (params) => {
        return params.value !== 'Brak' 
          ? <Chip label={params.value} color="primary" variant="outlined" size="small" /> 
          : <Chip label="W magazynie" color="default" size="small" />;
      }
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Rejestr Urządzeń
      </Typography>
      
      <Paper sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowCount={totalRows}          // Mówimy tabeli ile jest łącznie rekordów w bazie
          loading={loading}             // Pokazuje kręciołek ładowania
          pageSizeOptions={[5, 10, 20]} // Opcje wyboru ilości wierszy
          paginationModel={paginationModel}
          paginationMode="server"       // KLUCZOWE: Paginacja po stronie serwera
          onPaginationModelChange={setPaginationModel}
          disableRowSelectionOnClick
        />
      </Paper>
    </Container>
  );
}