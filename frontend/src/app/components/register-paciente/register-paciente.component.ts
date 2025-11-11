import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Datepicker } from 'vanillajs-datepicker';
import 'vanillajs-datepicker/locales/es';

@Component({
  selector: 'app-register-paciente',
  imports: [CommonModule, FormsModule],
  templateUrl: './register-paciente.component.html',
  styleUrl: './register-paciente.component.css'
})
export class RegisterPacienteComponent implements AfterViewInit {
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
  showSuccessModal = false;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngAfterViewInit() {
    const elem = document.getElementById('fecha_nacimiento');
    if (elem) {
      const datepicker = new Datepicker(elem, {
        language: 'es',
        format: 'yyyy-mm-dd',
        autohide: true,
        todayHighlight: true,
        clearBtn: true
      });
      
      elem.addEventListener('changeDate', (e: any) => {
        this.usuario.fecha_nacimiento = e.target.value;
      });
    }
  }

  onSubmit() {
    if (this.usuario['contraseña'] !== this.usuario['confirmarContraseña']) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    if (!this.usuario.mail || !this.usuario['contraseña'] || !this.usuario.nombre || 
        !this.usuario.apellido || !this.usuario.dni || !this.usuario.sexo || 
        !this.usuario.fecha_nacimiento || !this.usuario.numero_telefono || !this.usuario.direccion) {
      this.errorMessage = 'Por favor complete todos los campos';
      return;
    }

    const edad = this.usuario.fecha_nacimiento ? 
      new Date().getFullYear() - new Date(this.usuario.fecha_nacimiento).getFullYear() : 0;

    const usuarioData = {
      mail: this.usuario.mail.toLowerCase(),
      contraseña: this.usuario.contraseña,
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      numero_telefono: this.usuario.numero_telefono,
      fecha_nacimiento: this.usuario.fecha_nacimiento,
      edad,
      rol: this.usuario.rol,
      dni: this.usuario.dni,
      sexo: this.usuario.sexo,
      direccion: this.usuario.direccion,
      activo: true,
      created_at: new Date().toISOString()
    };

    this.usuarioService.createUsuario(usuarioData as any).subscribe({
      next: (response) => {
        this.showSuccessModal = true;
        setTimeout(() => {
          this.showSuccessModal = false;
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = error.error?.error || 'Error al registrar usuario';
        console.error('Error:', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}