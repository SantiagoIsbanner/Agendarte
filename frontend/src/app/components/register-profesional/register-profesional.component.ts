import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-profesional',
  imports: [CommonModule, FormsModule],
  templateUrl: './register-profesional.component.html',
  styleUrl: './register-profesional.component.css'
})
export class RegisterProfesionalComponent {
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
    rol: 'profesional' // Fijo para profesionales
  };

  profesional = {
    especialidad: '',
    sub_especialidad: '',
    honorarios: '',
    matricula: '',
    tiempo_consulta_minutos: 30,
    bio: ''
  };

  errorMessage = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.usuario['contraseña'] !== this.usuario['confirmarContraseña']) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    if (!this.usuario.mail || !this.usuario['contraseña'] || !this.usuario.nombre || 
        !this.usuario.apellido || !this.profesional.especialidad || !this.profesional.matricula) {
      this.errorMessage = 'Por favor complete los campos obligatorios';
      return;
    }

    // Aquí iría la lógica para enviar al backend
    console.log('Registrando profesional:', { usuario: this.usuario, profesional: this.profesional });
    
    // Simular registro exitoso
    alert('Registro exitoso! Redirigiendo al login...');
    this.router.navigate(['/login']);
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}