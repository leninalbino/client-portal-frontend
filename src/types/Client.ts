export enum DocumentType {
  DNI = 1,
  RUC = 2,
  CarnetExtranjeria = 3
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  documentType: DocumentType;
  documentNumber: string;
  curriculumVitaeFileName?: string;
  photoFileName?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateClientRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  documentType: DocumentType;
  documentNumber: string;
  curriculumVitae: File;
  photo: File;
}

export interface UpdateClientRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  curriculumVitae?: File;
  photo?: File;
}