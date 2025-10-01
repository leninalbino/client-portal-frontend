import React from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

// Layout - Main app layout with navigation
// Note: Simple layout for now, can be extended with sidebar/drawer later
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();

  // handleNavigation - Centralized navigation handler
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ClientPortal
          </Typography>
          <Button
            color="inherit"
            onClick={() => handleNavigation('/clients')}
          >
            Catálogo de Clientes
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
        {/* Main content area - TODO: Add loading states and error boundaries */}
        {children}
      </Container>
    </Box>
  );
};

export default Layout;