import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Datepicker } from 'vanillajs-datepicker';
import 'vanillajs-datepicker/locales/es';

@Component({
  selector: 'app-register-profesional',
  imports: [CommonModule, FormsModule],
  templateUrl: './register-profesional.component.html',
  styleUrl: './register-profesional.component.css'
})
export class RegisterProfesionalComponent implements AfterViewInit {
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

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private http: HttpClient
  ) {}

  ngAfterViewInit() {
    const elem = document.getElementById('fecha_nacimiento');
    if (elem) {
      new Datepicker(elem, {
        language: 'es',
        format: 'yyyy-mm-dd',
        autohide: true,
        todayHighlight: true,
        clearBtn: true
      });
    }
  }

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

    const edad = this.usuario.fecha_nacimiento ? 
      new Date().getFullYear() - new Date(this.usuario.fecha_nacimiento).getFullYear() : 0;

    const usuarioData = {
      mail: this.usuario.mail,
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
      next: (usuarioCreado) => {
        const profesionalData = {
          usuario_id: usuarioCreado.id,
          especialidad: this.profesional.especialidad,
          sub_especialidad: this.profesional.sub_especialidad,
          honorarios: this.profesional.honorarios ? parseFloat(this.profesional.honorarios) : 0,
          matricula: this.profesional.matricula,
          tiempo_consulta_minutos: this.profesional.tiempo_consulta_minutos,
          bio: this.profesional.bio
        };

        this.http.post('http://localhost:3000/api/profesionales', profesionalData).subscribe({
          next: () => {
            alert('Registro exitoso! Redirigiendo al login...');
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.errorMessage = 'Error al registrar datos profesionales';
            console.error('Error:', error);
          }
        });
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