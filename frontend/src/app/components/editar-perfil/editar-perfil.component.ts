import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService, Usuario } from '../../services/usuario.service';
import { HttpClient } from '@angular/common/http';
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

  especialidades: any[] = [];
  showSuccessModal = false;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.cargarDatosUsuario();
    this.cargarEspecialidades();
  }

  private cargarEspecialidades() {
    this.http.get<any[]>('http://localhost:3000/api/especialidades').subscribe({
      next: (especialidades) => {
        this.especialidades = especialidades;
      },
      error: (error) => console.error('Error cargando especialidades:', error)
    });
  }

  private cargarDatosUsuario() {
    const userData = localStorage.getItem('usuario');
    if (userData) {
      const user = JSON.parse(userData);
      this.usuario = { ...user };
      
      if (this.usuario.rol === 'profesional') {
        this.cargarDatosProfesional(this.usuario.id);
      }
    }
  }

  private cargarDatosProfesional(usuarioId: number) {
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios) => {
        const prof = usuarios.find(u => u.id === usuarioId && u.rol === 'profesional');
        if (prof) {
          this.profesional = {
            especialidad: prof.especialidad || '',
            sub_especialidad: prof.sub_especialidad || '',
            honorarios: prof.honorarios || 0,
            matricula: prof.matricula || '',
            tiempo_consulta_minutos: prof.tiempo_consulta_minutos || 30,
            bio: prof.bio || ''
          };
        }
      },
      error: (error) => console.error('Error cargando datos profesional:', error)
    });
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
    const datosActualizar: any = { ...this.usuario };
    
    if (this.usuario.rol === 'profesional') {
      datosActualizar.especialidad = this.profesional.especialidad;
      datosActualizar.sub_especialidad = this.profesional.sub_especialidad;
      datosActualizar.honorarios = this.profesional.honorarios;
      datosActualizar.matricula = this.profesional.matricula;
      datosActualizar.tiempo_consulta_minutos = this.profesional.tiempo_consulta_minutos;
      datosActualizar.bio = this.profesional.bio;
    }

    this.usuarioService.updateUsuario(datosActualizar).subscribe({
      next: () => {
        localStorage.setItem('usuario', JSON.stringify(datosActualizar));
        this.showSuccessModal = true;
        setTimeout(() => {
          this.showSuccessModal = false;
          this.router.navigate(['/panel']);
        }, 2000);
      },
      error: (error) => {
        console.error('Error actualizando perfil:', error);
        alert('Error al actualizar el perfil');
      }
    });
  }

  cancelar() {
    this.router.navigate(['/panel']);
  }
}
