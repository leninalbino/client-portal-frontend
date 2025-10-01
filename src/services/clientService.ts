import { Client, CreateClientRequest, UpdateClientRequest } from '../types/Client';

// 🔒 Configuración segura de API usando variables de entorno
const getApiBaseUrl = (): string => {
  // En Vite, las variables de entorno deben empezar con VITE_
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!apiUrl) {
    // Solo para desarrollo local - NUNCA hardcodear URLs en producción
    console.warn('⚠️ VITE_API_URL no está configurada. Usando URL de desarrollo por defecto.');
    return 'http://localhost:5258/api';
  }

  return apiUrl;
};

const API_BASE_URL = getApiBaseUrl();

// ClientService - Service layer for client API operations
// Note: Using static methods to avoid instantiation - simpler for this use case
export class ClientService {
  // getAllClients - Obtiene todos los clientes del sistema
  // FIXME: Add pagination support when client list grows large
  static async getAllClients(): Promise<Client[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/clients`);
      if (!response.ok) {
        throw new Error('Failed to fetch clients');
      }
      return response.json();
    } catch (error) {
      console.error('Error in getAllClients:', error);
      throw error;
    }
  }

  static async getClientById(id: string): Promise<Client> {
    const response = await fetch(`${API_BASE_URL}/clients/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch client');
    }
    return response.json();
  }

  // createClient - Creates a new client with file uploads
  // Note: Using FormData for file uploads - multipart/form-data is required by the API
  static async createClient(client: CreateClientRequest): Promise<Client> {
    try {
      const formData = new FormData();
      formData.append('firstName', client.firstName);
      formData.append('lastName', client.lastName);
      formData.append('dateOfBirth', client.dateOfBirth);
      formData.append('documentType', client.documentType.toString());
      formData.append('documentNumber', client.documentNumber);
      formData.append('curriculumVitae', client.curriculumVitae);
      formData.append('photo', client.photo);

      // Debug: keeping this for troubleshooting file upload issues
      // console.log('Creating client with data:', {
      //   firstName: client.firstName,
      //   lastName: client.lastName,
      //   documentType: client.documentType,
      //   fileSizes: {
      //     cv: client.curriculumVitae.size,
      //     photo: client.photo.size
      //   }
      // });

      const response = await fetch(`${API_BASE_URL}/clients`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create client');
      }
      return response.json();
    } catch (error) {
      console.error('Error creating client:', error);
      throw error;
    }
  }

  static async updateClient(id: string, client: UpdateClientRequest): Promise<Client> {
    const formData = new FormData();
    formData.append('firstName', client.firstName);
    formData.append('lastName', client.lastName);
    formData.append('dateOfBirth', client.dateOfBirth);
    
    if (client.curriculumVitae) {
      formData.append('curriculumVitae', client.curriculumVitae);
    }
    
    if (client.photo) {
      formData.append('photo', client.photo);
    }

    const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update client');
    }
    return response.json();
  }

  static async deleteClient(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete client');
    }
  }

  static async exportClients(): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/clients/export`);
    if (!response.ok) {
      throw new Error('Failed to export clients');
    }
    return response.blob();
  }
}