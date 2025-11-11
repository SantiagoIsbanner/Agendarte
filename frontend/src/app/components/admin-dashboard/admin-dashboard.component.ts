import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  showPasswordModal = false;
  passwordData = {
    actual: '',
    nueva: '',
    confirmar: ''
  };

  constructor(private router: Router) {}

  editarPerfil() {
    this.router.navigate(['/editar-perfil']);
  }

  cambiarContrasena() {
    this.showPasswordModal = true;
  }

  cerrarModal() {
    this.showPasswordModal = false;
    this.passwordData = { actual: '', nueva: '', confirmar: '' };
  }

  guardarNuevaContrasena() {
    if (!this.passwordData.actual || !this.passwordData.nueva || !this.passwordData.confirmar) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (this.passwordData.nueva !== this.passwordData.confirmar) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (this.passwordData.nueva.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Aquí iría la lógica para cambiar la contraseña en el backend
    alert('Contraseña actualizada exitosamente');
    this.cerrarModal();
  }
}