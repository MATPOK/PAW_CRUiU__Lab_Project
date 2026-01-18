import { Typography, Container } from '@mui/material';

export default function EmployeesList() {
  return (
    <Container>
      <Typography variant="h4" sx={{ color: 'white' }}>Pracownicy</Typography>
      <Typography sx={{ color: 'gray' }}>Tabela pracowników (CRUD) - do zrobienia.</Typography>
    </Container>
  );
}