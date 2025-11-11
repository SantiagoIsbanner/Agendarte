import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  private apiUrl = 'http://localhost:3000/api';
  
  private permisos = {
    administrador: {
      admin: true,
      'panel-paciente': true,
      'mis-turnos': true,
      'panel-profesional': true,
      administrador: true
    },
    profesional: {
      admin: false,
      'panel-paciente': false,
      'mis-turnos': true,
      'panel-profesional': true,
      administrador: false
    },
    usuario: {
      admin: false,
      'panel-paciente': true,
      'mis-turnos': true,
      'panel-profesional': false,
      administrador: false
    }
  };

  private permisosSubject = new BehaviorSubject(this.permisos);
  permisos$ = this.permisosSubject.asObservable();

  private getUsuarioActual() {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      return JSON.parse(usuario);
    }
    return { rol: 'usuario' };
  }

  constructor(private http: HttpClient) {
    this.cargarPermisos();
  }

  cargarPermisos() {
    this.http.get<any>(`${this.apiUrl}/permisos`).subscribe({
      next: (permisos) => {
        this.permisos = permisos;
        this.permisosSubject.next(this.permisos);
      },
      error: (error) => console.error('Error cargando permisos:', error)
    });
  }

  getPermisos() {
    return this.permisos;
  }

  updatePermisos(nuevosPermisos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/permisos`, { permisos: nuevosPermisos }).pipe(
      tap(() => {
        this.permisos = { ...nuevosPermisos };
        this.permisosSubject.next(this.permisos);
      })
    );
  }

  tienePermiso(pagina: string): boolean {
    const usuario = this.getUsuarioActual();
    const rol = usuario.rol as keyof typeof this.permisos;
    return this.permisos[rol]?.[pagina as keyof typeof this.permisos.administrador] || false;
  }

  getMenuItems() {
    const menuItems = [
      { key: 'admin', label: 'Inicio', icon: '🏠', href: '/panel' },
      { key: 'panel-paciente', label: 'Panel Paciente', icon: '👤', href: '/panel-paciente' },
      { key: 'mis-turnos', label: 'Mis Turnos', icon: '📅', href: '/mis-turnos' },
      { key: 'panel-profesional', label: 'Panel Profesional', icon: '👨⚕️', href: '/panel-profesional' },
      { key: 'administrador', label: 'Administrador', icon: '⚙️', href: '/administrador' }
    ];

    return menuItems.filter(item => this.tienePermiso(item.key));
  }
}