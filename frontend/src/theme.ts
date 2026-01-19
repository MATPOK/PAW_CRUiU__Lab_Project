import { createTheme } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation';

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2563eb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10b981',
    },
    background: {
      default: '#0b1015',
      paper: '#151b23',
    },
    text: {
      primary: '#f3f4f6',
      secondary: '#9ca3af',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiDataGrid: { 
      styleOverrides: {
        root: {
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#1c2430',
            color: '#9ca3af',
            borderBottom: '1px solid #374151',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #374151',
          },
        },
      },
    },
  },
});