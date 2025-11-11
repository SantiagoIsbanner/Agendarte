import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
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

  // Simular usuario logueado (en producción vendría del login)
  private usuarioActual = { rol: 'administrador' };

  getPermisos() {
    return this.permisos;
  }

  updatePermisos(nuevosPermisos: any) {
    this.permisos = { ...nuevosPermisos };
    this.permisosSubject.next(this.permisos);
    console.log('Permisos actualizados:', this.permisos);
  }

  tienePermiso(pagina: string): boolean {
    const rol = this.usuarioActual.rol as keyof typeof this.permisos;
    return this.permisos[rol][pagina as keyof typeof this.permisos.administrador] || false;
  }

  getMenuItems() {
    const menuItems = [
      { key: 'admin', label: 'Inicio', icon: '🏠', href: '/admin' },
      { key: 'panel-paciente', label: 'Panel Paciente', icon: '👤', href: '#' },
      { key: 'mis-turnos', label: 'Mis Turnos', icon: '📅', href: '#' },
      { key: 'panel-profesional', label: 'Panel Profesional', icon: '👨⚕️', href: '/panel-profesional' },
      { key: 'administrador', label: 'Administrador', icon: '⚙️', href: '/administrador' }
    ];

    return menuItems.filter(item => this.tienePermiso(item.key));
  }
}