import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Stack,
  FormHelperText,
} from '@mui/material';
import { Client, CreateClientRequest, UpdateClientRequest, DocumentType } from '../../types/Client';
import { ClientService } from '../../services/clientService';

interface ClientFormProps {
  open: boolean;
  client: Client | null;
  onClose: () => void;
  onSubmit: () => void;
}

// Schema para crear un nuevo cliente (todos los campos requeridos)
// Nota: Los archivos PDF y JPEG son obligatorios en creación
// pero opcionales en actualización - esto es un requisito del negocio
const createSchema = yup.object({
  firstName: yup.string().required('First name is required').max(100, 'Maximum 100 characters'),
  lastName: yup.string().required('Last name is required').max(100, 'Maximum 100 characters'),
  dateOfBirth: yup.string().required('Date of birth is required'),
  documentType: yup.number().required('Document type is required'),
  documentNumber: yup.string().required('Document number is required').max(20, 'Maximum 20 characters'),
  curriculumVitae: yup
    .mixed()
    .required('Curriculum vitae is required')
    .test('fileSize', 'File size cannot exceed 5MB', (value: any) => {
      return value && value.size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Only PDF files are allowed', (value: any) => {
      return value && value.type === 'application/pdf';
    }),
  photo: yup
    .mixed()
    .required('Photo is required')
    .test('fileSize', 'File size cannot exceed 5MB', (value: any) => {
      return value && value.size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Only JPEG files are allowed', (value: any) => {
      return value && (value.type === 'image/jpeg' || value.type === 'image/jpg');
    }),
});

// Schema para actualizar un cliente (archivos opcionales, documento no editable)
const updateSchema = yup.object({
  firstName: yup.string().required('First name is required').max(100, 'Maximum 100 characters'),
  lastName: yup.string().required('Last name is required').max(100, 'Maximum 100 characters'),
  dateOfBirth: yup.string().required('Date of birth is required'),
  documentType: yup.number().required('Document type is required'),
  documentNumber: yup.string().required('Document number is required').max(20, 'Maximum 20 characters'),
  curriculumVitae: yup
    .mixed()
    .nullable()
    .test('fileSize', 'File size cannot exceed 5MB', (value: any) => {
      return !value || value.size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Only PDF files are allowed', (value: any) => {
      return !value || value.type === 'application/pdf';
    }),
  photo: yup
    .mixed()
    .nullable()
    .test('fileSize', 'File size cannot exceed 5MB', (value: any) => {
      return !value || value.size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Only JPEG files are allowed', (value: any) => {
      return !value || (value.type === 'image/jpeg' || value.type === 'image/jpg');
    }),
});

// ClientForm - Main form component for client management
// TODO: Consider extracting validation schemas to separate file when more forms are added
const ClientForm: React.FC<ClientFormProps> = ({ open, client, onClose, onSubmit }) => {
  const isEditing = !!client;
  const schema = isEditing ? updateSchema : createSchema;

  // Debug log - keeping this commented out for future debugging
  // console.log('ClientForm render:', { isEditing, clientId: client?.id });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      documentType: DocumentType.DNI,
      documentNumber: '',
      curriculumVitae: null,
      photo: null,
    },
  });

  useEffect(() => {
    if (client) {
      reset({
        firstName: client.firstName,
        lastName: client.lastName,
        dateOfBirth: client.dateOfBirth.split('T')[0],
        documentType: client.documentType,
        documentNumber: client.documentNumber,
        curriculumVitae: null,
        photo: null,
      });
    } else {
      reset({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        documentType: DocumentType.DNI,
        documentNumber: '',
        curriculumVitae: null,
        photo: null,
      });
    }
  }, [client, reset]);

  // processForm - Main form submission handler
  // Note: Using 'any' type here because react-hook-form's data structure is complex
  // and we need flexibility for different form modes (create vs edit)
  const processForm = async (data: any) => {
    try {
      if (isEditing && client) {
        // Update mode - files are optional for updates
        const updateData: UpdateClientRequest = {
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          curriculumVitae: data.curriculumVitae || undefined,
          photo: data.photo || undefined,
        };
        await ClientService.updateClient(client.id, updateData);
      } else {
        // Create mode - all fields required
        const createData: CreateClientRequest = {
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          documentType: data.documentType,
          documentNumber: data.documentNumber,
          curriculumVitae: data.curriculumVitae,
          photo: data.photo,
        };
        await ClientService.createClient(createData);
      }

      // Trigger parent refresh
      onSubmit();

      // Debug: keeping this for troubleshooting form submission issues
      // console.log('Form submitted successfully:', { isEditing, clientId: client?.id });
    } catch (error) {
      console.error('Error submitting form:', error);
      // FIXME: Add proper error handling UI feedback here
    }
  };

  const documentTypes = [
    { value: DocumentType.DNI, label: 'DNI' },
    { value: DocumentType.RUC, label: 'RUC' },
    { value: DocumentType.CarnetExtranjeria, label: 'Carnet de Extranjería' },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      disableRestoreFocus
    >
      <form onSubmit={handleSubmit(processForm)}>
        <DialogTitle>
          {isEditing ? 'Editar Cliente' : 'Agregar Cliente'}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nombres"
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Apellidos"
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Box>

            <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Fecha de Nacimiento"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.dateOfBirth}
                    helperText={errors.dateOfBirth?.message}
                  />
                )}
              />
              <Controller
                name="documentType"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.documentType}>
                    <InputLabel>Tipo de Documento</InputLabel>
                    <Select
                      {...field}
                      label="Tipo de Documento"
                      disabled={isEditing}
                    >
                      {documentTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.documentType && (
                      <FormHelperText>{errors.documentType.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Box>

            <Controller
              name="documentNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Número de Documento"
                  fullWidth
                  disabled={isEditing}
                  error={!!errors.documentNumber}
                  helperText={errors.documentNumber?.message}
                />
              )}
            />

            <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
              <Box flex={1}>
                <Controller
                  name="curriculumVitae"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => (
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Hoja de Vida (PDF) {isEditing && '- Opcional en edición'}
                      </Typography>
                      <input
                        {...field}
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => onChange(e.target.files?.[0] || null)}
                        style={{ width: '100%' }}
                      />
                      {errors.curriculumVitae && (
                        <Typography color="error" variant="caption">
                          {errors.curriculumVitae.message}
                        </Typography>
                      )}
                      {isEditing && client?.curriculumVitaeFileName && (
                        <Typography variant="caption" color="textSecondary">
                          Archivo actual: {client.curriculumVitaeFileName}
                        </Typography>
                      )}
                    </Box>
                  )}
                />
              </Box>
              <Box flex={1}>
                <Controller
                  name="photo"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => (
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Foto (JPEG) {isEditing && '- Opcional en edición'}
                      </Typography>
                      <input
                        {...field}
                        type="file"
                        accept="image/jpeg,image/jpg"
                        onChange={(e) => onChange(e.target.files?.[0] || null)}
                        style={{ width: '100%' }}
                      />
                      {errors.photo && (
                        <Typography color="error" variant="caption">
                          {errors.photo.message}
                        </Typography>
                      )}
                      {isEditing && client?.photoFileName && (
                        <Typography variant="caption" color="textSecondary">
                          Archivo actual: {client.photoFileName}
                        </Typography>
                      )}
                    </Box>
                  )}
                />
              </Box>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ClientForm;