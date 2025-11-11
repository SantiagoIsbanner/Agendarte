import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService, Usuario } from '../../services/usuario.service';

@Component({
  selector: 'app-gestion-usuarios',
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-usuarios.component.html',
  styleUrl: './gestion-usuarios.component.css'
})
export class GestionUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  roles = ['administrador', 'profesional', 'usuario'];
  filtroRol = '';
  busqueda = '';
  
  // Modal de cambio de contraseña
  showPasswordModal = false;
  selectedUser: Usuario | null = null;
  newPassword = '';
  confirmPassword = '';
  passwordError = '';
  
  // Administración de roles y permisos
  permisos = {
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
  
  menuItems = [
    { key: 'admin', label: 'Inicio', icon: '🏠' },
    { key: 'panel-paciente', label: 'Panel Paciente', icon: '👤' },
    { key: 'mis-turnos', label: 'Mis Turnos', icon: '📅' },
    { key: 'panel-profesional', label: 'Panel Profesional', icon: '👨⚕️' },
    { key: 'administrador', label: 'Administrador', icon: '⚙️' }
  ];

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  get usuariosFiltrados() {
    return this.usuarios.filter(usuario => {
      const coincideBusqueda = !this.busqueda || 
        usuario.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        usuario.apellido.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        usuario.mail.toLowerCase().includes(this.busqueda.toLowerCase());
      
      const coincideRol = !this.filtroRol || usuario.rol === this.filtroRol;
      
      return coincideBusqueda && coincideRol;
    });
  }

  cambiarRol(usuario: Usuario, nuevoRol: 'administrador' | 'profesional' | 'usuario') {
    usuario.rol = nuevoRol;
    this.usuarioService.updateUsuario(usuario).subscribe(() => {
      console.log(`Rol de ${usuario.nombre} ${usuario.apellido} cambiado a: ${nuevoRol}`);
    });
  }

  toggleActivo(usuario: Usuario) {
    usuario.activo = !usuario.activo;
    this.usuarioService.updateUsuario(usuario).subscribe(() => {
      console.log(`Usuario ${usuario.nombre} ${usuario.apellido} ${usuario.activo ? 'activado' : 'desactivado'}`);
    });
  }

  eliminarUsuario(usuario: Usuario) {
    if (confirm(`¿Está seguro de eliminar al usuario ${usuario.nombre} ${usuario.apellido}?`)) {
      this.usuarioService.deleteUsuario(usuario.id).subscribe(success => {
        if (success) {
          this.cargarUsuarios();
          console.log(`Usuario ${usuario.nombre} ${usuario.apellido} eliminado`);
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/administrador']);
  }

  irAdminRoles() {
    this.router.navigate(['/admin-roles']);
  }

  abrirCambioPassword(usuario: Usuario) {
    this.selectedUser = usuario;
    this.newPassword = '';
    this.confirmPassword = '';
    this.passwordError = '';
    this.showPasswordModal = true;
  }

  cerrarPasswordModal() {
    this.showPasswordModal = false;
    this.selectedUser = null;
  }

  cambiarPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.passwordError = 'Las contraseñas no coinciden';
      return;
    }
    
    if (this.newPassword.length < 6) {
      this.passwordError = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    // Aquí iría la lógica para actualizar en el backend
    console.log(`Contraseña cambiada para usuario: ${this.selectedUser?.nombre}`);
    alert('Contraseña actualizada correctamente');
    this.cerrarPasswordModal();
  }
}