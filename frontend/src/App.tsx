import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import DevicesList from './views/DevicesList';

// Ciemny motyw (wygląda nowocześnie i profesjonalnie)
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      {/* CssBaseline resetuje style przeglądarki do standardu Material UI */}
      <CssBaseline />
      
      {/* Tu wyświetlamy naszą tabelę */}
      <DevicesList />
      
    </ThemeProvider>
  );
}

export default App;