import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import { CssBaseline, ThemeProvider } from '@mui/material';
import { appTheme } from './theme';
import MainLayout from './components/MainLayout';

import Dashboard from './views/Dashboard';
import DevicesList from './views/DevicesList';
import EmployeesList from './views/EmployeesList';
import DepartmentsList from './views/DepartmentsList';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/devices" element={<DevicesList />} />
            <Route path="/employees" element={<EmployeesList />} />
            <Route path="/departments" element={<DepartmentsList />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
      
    </ThemeProvider>
  );
}

export default App;