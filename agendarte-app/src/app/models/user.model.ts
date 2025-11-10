export enum UserRole {
  ADMIN = 'admin',
  PROFESSIONAL = 'professional',
  PATIENT = 'patient'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}