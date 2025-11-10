import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dni?: string;
  birthDate?: string;
  gender?: string;
  address?: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Cambiar por tu API real

  constructor(private http: HttpClient) {}

  register(userData: RegisterData): Observable<any> {
    // Simulación de registro exitoso
    return of({ 
      success: true, 
      message: 'Usuario registrado exitosamente',
      user: { id: 1, email: userData.email, firstName: userData.firstName }
    }).pipe(delay(1000));
    
    // Para API real, usar:
    // return this.http.post(`${this.apiUrl}/register`, userData);
  }
}