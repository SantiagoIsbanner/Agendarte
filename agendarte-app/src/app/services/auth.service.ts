import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User, UserRole } from '../models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getUserFromStorage(): User | null {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    const mockUser: User = {
      id: '1',
      name: 'Usuario Demo',
      email: email,
      role: UserRole.ADMIN
    };
    
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    this.currentUserSubject.next(mockUser);
    return of(mockUser).pipe(delay(500));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  hasRole(role: UserRole): boolean {
    const user = this.currentUserValue;
    return user ? user.role === role : false;
  }

  register(userData: RegisterData): Observable<any> {
    // En un entorno de producción, esto sería una llamada real al backend
    return of({ 
      success: true, 
      message: 'Usuario registrado exitosamente',
      user: { 
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`,
        role: UserRole.PATIENT // Por defecto, los usuarios registrados son pacientes
      }
    }).pipe(delay(1000));
    
    // Para implementación real con backend:
    // return this.http.post(`${this.apiUrl}/register`, userData);
  }
}