import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../../services/usuario.service';
import { GoogleCalendarService } from '../../services/google-calendar.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  showPasswordModal = false;
  showSuccessModal = false;
  passwordData = {
    actual: '',
    nueva: '',
    confirmar: ''
  };

  protected readonly usuario = signal<any>(null);
  protected readonly totalProfesionales = signal<number>(0);
  protected readonly totalPacientes = signal<number>(0);
  protected readonly citasHoy = signal<number>(0);
  protected readonly isLoadingStats = signal<boolean>(true);

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private googleCalendarService: GoogleCalendarService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadUserData();
    this.loadStats();
  }

  private loadUserData() {
    const userData = localStorage.getItem('usuario');
    if (userData) {
      this.usuario.set(JSON.parse(userData));
    }
  }

  private async loadStats() {
    this.isLoadingStats.set(true);
    try {
      this.usuarioService.getUsuarios().subscribe({
        next: (usuarios) => {
          const profesionales = usuarios.filter(u => u.rol === 'profesional');
          const pacientes = usuarios.filter(u => u.rol === 'usuario');
          this.totalProfesionales.set(profesionales.length);
          this.totalPacientes.set(pacientes.length);
        },
        error: (error) => console.error('Error cargando usuarios:', error)
      });

      if (this.googleCalendarService.isSignedIn()) {
        const eventos = await this.googleCalendarService.getEvents();
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const finHoy = new Date(hoy);
        finHoy.setHours(23, 59, 59, 999);
        
        const citasDeHoy = eventos.filter(event => {
          const titulo = event.summary || '';
          const fechaEvento = new Date(event.start.dateTime || event.start.date);
          return titulo.startsWith('Cita -') && fechaEvento >= hoy && fechaEvento <= finHoy;
        });
        this.citasHoy.set(citasDeHoy.length);
      }
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    } finally {
      this.isLoadingStats.set(false);
    }
  }

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

    const usuarioId = this.usuario()?.id;
    if (!usuarioId) {
      alert('Error: Usuario no identificado');
      return;
    }

    this.usuarioService.updatePassword(usuarioId, this.passwordData.actual, this.passwordData.nueva).subscribe({
      next: () => {
        this.cerrarModal();
        this.showSuccessModal = true;
        setTimeout(() => {
          this.showSuccessModal = false;
        }, 2000);
      },
      error: (error) => {
        alert(error.error?.error || 'Error al cambiar la contraseña');
      }
    });
  }
}