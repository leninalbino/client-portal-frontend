import React, { useState, useEffect, useCallback} from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Chip,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { Client, DocumentType } from '../../types/Client';
import { ClientService } from '../../services/clientService';
import ClientForm from './ClientForm';

// ClientCatalog - Main component for displaying and managing clients
// Note: This component handles both mobile and desktop layouts
// TODO: Consider implementing pagination for large client lists
const ClientCatalog: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State management - keeping all client related state together
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [loading, setLoading] = useState(true);

  // Debug logs - keeping these for troubleshooting
  // console.log('ClientCatalog render:', { clientCount: clients.length, loading });

  // fetchClients - Load all clients from API
  // Note: Using useCallback to prevent unnecessary re-renders
  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      const clientsData = await ClientService.getAllClients();
      setClients(clientsData);

      // Debug: keeping this for performance monitoring
      // console.log('Loaded clients:', clientsData.length);
    } catch (error) {
      console.error('Error fetching clients:', error);
      showSnackbar('Error loading clients', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleAddClient = () => {
    setSelectedClient(null);
    setIsFormOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsFormOpen(true);
  };

  const handleDeleteClient = (client: Client) => {
    setClientToDelete(client);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (clientToDelete) {
      try {
        await ClientService.deleteClient(clientToDelete.id);
        await fetchClients();
        showSnackbar('Client deleted successfully', 'success');
      } catch (error) {
        showSnackbar('Error deleting client', 'error');
      }
    }
    setIsDeleteDialogOpen(false);
    setClientToDelete(null);
  };

  // refreshClientList - Refresh the client list after form operations
  const refreshClientList = async () => {
    setIsFormOpen(false);
    await fetchClients();
    showSnackbar(selectedClient ? 'Client updated successfully' : 'Client created successfully', 'success');
  };

  // handleExport - Export clients to CSV file
  // Note: Using blob approach for file download - workaround for API limitations
  const handleExport = async () => {
    try {
      const blob = await ClientService.exportClients();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      // Dynamic filename with current date - helps with file organization
      a.download = `clients_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      showSnackbar('Clients exported successfully', 'success');

      // Debug: keeping this for troubleshooting export issues
      // console.log('Export completed:', { timestamp: new Date().toISOString() });
    } catch (error) {
      console.error('Export failed:', error);
      showSnackbar('Error exporting clients', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  const getDocumentTypeLabel = (type: DocumentType): string => {
    switch (type) {
      case DocumentType.DNI:
        return 'DNI';
      case DocumentType.RUC:
        return 'RUC';
      case DocumentType.CarnetExtranjeria:
        return 'Carnet de Extranjería';
      default:
        return 'Unknown';
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  const renderMobileView = () => (
    <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)' }} gap={2}>
      {clients.map((client) => (
        <Card key={client.id}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {client.firstName} {client.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Fecha de Nacimiento: {formatDate(client.dateOfBirth)}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Typography variant="body2">Documento:</Typography>
              <Chip
                label={getDocumentTypeLabel(client.documentType)}
                size="small"
                variant="outlined"
              />
            </Box>
            <Typography variant="body2" gutterBottom>
              Nro: {client.documentNumber}
            </Typography>
            <Box display="flex" gap={1} mb={2}>
              {client.curriculumVitaeFileName && (
                <Chip label="CV" size="small" color="primary" />
              )}
              {client.photoFileName && (
                <Chip label="Photo" size="small" color="secondary" />
              )}
            </Box>
          </CardContent>
          <CardActions>
            <IconButton
              onClick={() => handleEditClient(client)}
              color="primary"
              size="small"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDeleteClient(client)}
              color="error"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Box>
  );

  const renderDesktopView = () => (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Nombres</TableCell>
            <TableCell>Apellidos</TableCell>
            <TableCell>Fecha de Nacimiento</TableCell>
            <TableCell>Tipo de Documento</TableCell>
            <TableCell>Nro. de Documento</TableCell>
            <TableCell>Archivos</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.firstName}</TableCell>
              <TableCell>{client.lastName}</TableCell>
              <TableCell>{formatDate(client.dateOfBirth)}</TableCell>
              <TableCell>
                <Chip 
                  label={getDocumentTypeLabel(client.documentType)} 
                  size="small" 
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{client.documentNumber}</TableCell>
              <TableCell>
                <Box display="flex" gap={1}>
                  {client.curriculumVitaeFileName && (
                    <Chip label="CV" size="small" color="primary" />
                  )}
                  {client.photoFileName && (
                    <Chip label="Photo" size="small" color="secondary" />
                  )}
                </Box>
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleEditClient(client)}
                  color="primary"
                  size="small"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteClient(client)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box>
      <Box 
        display="flex" 
        flexDirection={isMobile ? 'column' : 'row'}
        justifyContent="space-between" 
        alignItems={isMobile ? 'stretch' : 'center'} 
        mb={3}
        gap={isMobile ? 2 : 0}
      >
        <Typography variant={isMobile ? "h5" : "h4"} component="h1">
          Catálogo de Clientes
        </Typography>
        <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={1}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddClient}
            fullWidth={isMobile}
          >
            Agregar Cliente
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            fullWidth={isMobile}
          >
            Exportar
          </Button>
        </Box>
      </Box>

      {isMobile ? renderMobileView() : renderDesktopView()}

      <ClientForm
        open={isFormOpen}
        client={selectedClient}
        onClose={() => setIsFormOpen(false)}
        onSubmit={refreshClientList}
      />

      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        disableRestoreFocus
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          ¿Está seguro que desea eliminar el cliente {clientToDelete?.firstName} {clientToDelete?.lastName}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancelar</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClientCatalog;