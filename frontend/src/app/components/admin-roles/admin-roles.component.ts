import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PermisosService } from '../../services/permisos.service';

@Component({
  selector: 'app-admin-roles',
  imports: [CommonModule],
  templateUrl: './admin-roles.component.html',
  styleUrl: './admin-roles.component.css'
})
export class AdminRolesComponent implements OnInit {
  roles = ['administrador', 'profesional', 'usuario'];
  permisos: any = {};
  showSuccessModal = false;
  
  menuItems = [
    { key: 'admin', label: 'Inicio', icon: '🏠' },
    { key: 'panel-paciente', label: 'Panel Paciente', icon: '👤' },
    { key: 'mis-turnos', label: 'Mis Turnos', icon: '📅' },
    { key: 'panel-profesional', label: 'Panel Profesional', icon: '👨⚕️' },
    { key: 'administrador', label: 'Administrador', icon: '⚙️' }
  ];

  constructor(
    private router: Router,
    private permisosService: PermisosService
  ) {}

  ngOnInit() {
    this.permisos = this.permisosService.getPermisos();
  }

  togglePermiso(rol: string, permiso: string) {
    this.permisos[rol as keyof typeof this.permisos][permiso as keyof typeof this.permisos.administrador] = 
      !this.permisos[rol as keyof typeof this.permisos][permiso as keyof typeof this.permisos.administrador];
    console.log(`Permiso ${permiso} para rol ${rol}:`, this.permisos[rol as keyof typeof this.permisos][permiso as keyof typeof this.permisos.administrador]);
  }

  tienePermiso(rol: string, permiso: string): boolean {
    return this.permisos[rol as keyof typeof this.permisos][permiso as keyof typeof this.permisos.administrador];
  }

  guardarCambios() {
    this.permisosService.updatePermisos(this.permisos);
    this.showSuccessModal = true;
    
    setTimeout(() => {
      this.router.navigate(['/gestion-usuarios']);
    }, 2000);
  }

  volver() {
    this.router.navigate(['/gestion-usuarios']);
  }
}