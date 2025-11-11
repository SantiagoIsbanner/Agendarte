import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService, Usuario } from '../../services/usuario.service';
import { Datepicker } from 'vanillajs-datepicker';
import 'vanillajs-datepicker/locales/es';

interface Profesional {
  especialidad: string;
  sub_especialidad: string;
  honorarios: number;
  matricula: string;
  tiempo_consulta_minutos: number;
  bio: string;
}

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit, AfterViewInit {
  usuario: Usuario = {
    id: 1,
    mail: 'admin@agendarte.com',
    nombre: 'Administrador',
    apellido: 'Sistema',
    numero_telefono: '',
    fecha_nacimiento: '',
    edad: 0,
    rol: 'administrador',
    activo: true,
    dni: '',
    sexo: 'masculino',
    direccion: '',
    created_at: ''
  };

  profesional: Profesional = {
    especialidad: '',
    sub_especialidad: '',
    honorarios: 0,
    matricula: '',
    tiempo_consulta_minutos: 30,
    bio: ''
  };

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    // Aquí cargarías los datos del usuario logueado
  }

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

  guardarCambios() {
    this.usuarioService.updateUsuario(this.usuario).subscribe(() => {
      alert('Perfil actualizado exitosamente');
      this.router.navigate(['/admin']);
    });
  }

  cancelar() {
    this.router.navigate(['/admin']);
  }
}
