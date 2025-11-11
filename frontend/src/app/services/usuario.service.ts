import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios: Usuario[] = [
    {
      id: 1,
      mail: 'admin@agendarte.com',
      nombre: 'Administrador',
      apellido: 'Sistema',
      numero_telefono: '+54 11 1234-5678',
      fecha_nacimiento: '1990-01-01',
      edad: 34,
      rol: 'administrador',
      activo: true,
      dni: '12345678',
      sexo: 'masculino',
      direccion: 'Sistema Agendarte, CABA',
      created_at: '2024-01-01T00:00:00Z'
    }
  ];

  getUsuarios(): Observable<Usuario[]> {
    return of(this.usuarios);
  }

  updateUsuario(usuario: Usuario): Observable<Usuario> {
    const index = this.usuarios.findIndex(u => u.id === usuario.id);
    if (index !== -1) {
      this.usuarios[index] = { ...usuario };
    }
    return of(usuario);
  }

  deleteUsuario(id: number): Observable<boolean> {
    const index = this.usuarios.findIndex(u => u.id === id);
    if (index !== -1) {
      this.usuarios.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}