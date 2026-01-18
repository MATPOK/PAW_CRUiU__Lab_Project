import { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Box, CircularProgress } from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import { api } from '../api/axios';

interface DashboardStats {
  totalDevices: number;
  totalEmployees: number;
  totalValue: number;
  devicesInStock: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get<DashboardStats>('/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        console.error("Błąd pobierania statystyk", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  const StatCard = ({ title, value, icon, color }: any) => (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
        color: 'white',
        borderRadius: 2
      }}
    >
      <Box>
        <Typography variant="body2" sx={{ color: '#9ca3af', mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {value}
        </Typography>
      </Box>
      <Box
        sx={{
          bgcolor: color,
          p: 1.5,
          borderRadius: 2,
          display: 'flex',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        {icon}
      </Box>
    </Paper>
  );

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ color: 'white', mb: 4, fontWeight: 600 }}>
        Pulpit Nawigacyjny
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Całkowita wartość"
            value={`${stats?.totalValue.toLocaleString()} PLN`}
            icon={<AttachMoneyIcon sx={{ color: 'white' }} />}
            color="#2563eb"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Liczba urządzeń"
            value={stats?.totalDevices}
            icon={<ComputerIcon sx={{ color: 'white' }} />}
            color="#7c3aed"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="W magazynie"
            value={stats?.devicesInStock}
            icon={<WarehouseIcon sx={{ color: 'white' }} />}
            color="#10b981"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Pracownicy"
            value={stats?.totalEmployees}
            icon={<PeopleIcon sx={{ color: 'white' }} />}
            color="#f59e0b"
          />
        </Grid>
      </Grid>
      
      <Box mt={4}>
         <Typography sx={{color: 'gray'}}>Wykresy i szczegółowe analizy pojawią się w wersji 2.0</Typography>
      </Box>

    </Container>
  );
}