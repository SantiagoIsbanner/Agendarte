import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Usuario {
  id: number;
  mail: string;
  nombre: string;
  apellido: string;
  numero_telefono?: string;
  fecha_nacimiento?: string;
  edad?: number;
  rol: 'administrador' | 'profesional' | 'usuario';
  activo: boolean;
  dni?: string;
  sexo?: 'masculino' | 'femenino' | 'otro';
  direccion?: string;
  especialidad?: string;
  sub_especialidad?: string;
  honorarios?: number;
  matricula?: string;
  tiempo_consulta_minutos?: number;
  bio?: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/${id}`);
  }

  getPacientes(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios/pacientes`);
  }

  getProfesionales(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios/profesionales`);
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuarios`, usuario);
  }

  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/usuarios/${usuario.id}`, usuario);
  }

  updatePassword(id: number, contraseñaActual: string, nuevaContraseña: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/${id}/password`, { contraseñaActual, nuevaContraseña });
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`);
  }
}