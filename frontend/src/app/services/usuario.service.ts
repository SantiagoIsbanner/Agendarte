import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

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

  /**
   * Devuelve la lista de especialidades disponibles. Intenta un endpoint dedicado
   * y si falla, extrae las especialidades de la lista de profesionales.
   */
  getEspecialidades(): Observable<string[]> {
    // El backend expone /api/especialidades que devuelve objetos { id, nombre, descripcion }
    return this.http.get<any[]>(`${this.apiUrl}/especialidades`).pipe(
      map(items => items.map(i => i.nombre).filter(Boolean)),
      catchError(() =>
        // Fallback: extraer especialidades desde el listado de profesionales
        this.getProfesionales().pipe(
          map(profs => Array.from(new Set(profs.filter(p => p.especialidad).map(p => p.especialidad!))))
        )
      )
    );
  }

  updatePassword(id: number, contraseñaActual: string, nuevaContraseña: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuarios/${id}/password`, { contraseñaActual, nuevaContraseña });
  }

  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuarios/${id}`);
  }
}