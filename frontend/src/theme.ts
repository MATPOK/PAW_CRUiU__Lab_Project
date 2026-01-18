import { createTheme } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation';

export const appTheme = createTheme({
  palette: {
    mode: 'dark', // Włączamy tryb ciemny
    primary: {
      main: '#2563eb', // Ten jasny niebieski z przycisków
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10b981', // Zielony (np. do statusów "Dostępny")
    },
    background: {
      default: '#0b1015', // Bardzo ciemne tło całej strony (prawie czarne)
      paper: '#151b23',   // Trochę jaśniejsze tło dla kart, tabeli i sidebaru
    },
    text: {
      primary: '#f3f4f6', // Biały tekst
      secondary: '#9ca3af', // Szary tekst (pomocniczy)
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600, // Pogrubione nagłówki
    },
  },
  components: {
    // Tu stylujemy konkretne elementy, żeby wyglądały jak na screenach
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Wyłączamy wielkie litery w przyciskach
          borderRadius: 8,       // Zaokrąglone rogi przycisków
          fontWeight: 600,
        },
      },
    },
    MuiPaper: { // To odpowiada za "Karty" i "Tabele"
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Usuwamy domyślny gradient MUI
        },
      },
    },
    MuiDataGrid: { // Stylizacja tabeli (Devices List)
      styleOverrides: {
        root: {
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#1c2430', // Ciemny nagłówek tabeli
            color: '#9ca3af',
            borderBottom: '1px solid #374151',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #374151', // Ciemne linie między wierszami
          },
        },
      },
    },
  },
});