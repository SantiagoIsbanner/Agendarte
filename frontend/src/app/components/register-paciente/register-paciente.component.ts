import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-paciente',
  imports: [CommonModule, FormsModule],
  templateUrl: './register-paciente.component.html',
  styleUrl: './register-paciente.component.css'
})
export class RegisterPacienteComponent {
  usuario = {
    mail: '',
    contraseña: '',
    confirmarContraseña: '',
    nombre: '',
    apellido: '',
    numero_telefono: '',
    fecha_nacimiento: '',
    dni: '',
    sexo: '',
    direccion: '',
    rol: 'usuario' // Fijo para pacientes
  };

  errorMessage = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.usuario['contraseña'] !== this.usuario['confirmarContraseña']) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    if (!this.usuario.mail || !this.usuario['contraseña'] || !this.usuario.nombre || !this.usuario.apellido) {
      this.errorMessage = 'Por favor complete los campos obligatorios';
      return;
    }

    // Aquí iría la lógica para enviar al backend
    console.log('Registrando paciente:', this.usuario);
    
    // Simular registro exitoso
    alert('Registro exitoso! Redirigiendo al login...');
    this.router.navigate(['/login']);
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}