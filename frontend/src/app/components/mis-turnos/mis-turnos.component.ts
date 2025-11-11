import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleCalendarService } from '../../services/google-calendar.service';

interface Evento {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  location?: string;
  profesional?: string;
  email?: string;
}

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {
  protected readonly isAuthenticated = signal(false);
  protected readonly eventos = signal<Evento[]>([]);
  protected readonly eventosProximos = signal<Evento[]>([]);
  protected readonly eventosAhora = signal<Evento | null>(null);
  protected readonly isLoading = signal(false);
  protected readonly isConnecting = signal(false);
  protected readonly selectedEvent = signal<Evento | null>(null);
  protected readonly showEventModal = signal(false);
  protected readonly userEmail = signal<string>('');
  protected readonly ultimaActualizacion = signal<string>('');
  protected readonly conteoProximas = signal<number>(0);

  constructor(private googleCalendarService: GoogleCalendarService) {}

  ngOnInit() {
    this.verificarAutenticacion();
  }

  private verificarAutenticacion() {
    this.isAuthenticated.set(this.googleCalendarService.isSignedIn());
    
    if (this.isAuthenticated()) {
      this.cargarEventos();
    }
  }

  async authenticate() {
    this.isConnecting.set(true);
    try {
      const success = await this.googleCalendarService.authenticate();
      this.isAuthenticated.set(success);
      
      if (success) {
        this.cargarEventos();
      }
    } catch (error) {
      console.error('Error autenticando:', error);
      this.isAuthenticated.set(false);
    } finally {
      this.isConnecting.set(false);
    }
  }

  async cargarEventos() {
    if (!this.isAuthenticated()) {
      alert('Debes estar autenticado con Google Calendar');
      return;
    }

    this.isLoading.set(true);
    try {
      // Obtener eventos de Google Calendar
      const googleEventos = await this.googleCalendarService.getEvents();
      
      // Filtrar solo citas de la aplicación (que empiezan con "Cita -")
      const ahora = new Date();
      const eventosFuturos = googleEventos
        .filter(event => {
          const titulo = event.summary || '';
          const fechaEvento = new Date(event.start.dateTime || event.start.date);
          return titulo.startsWith('Cita -') && fechaEvento >= ahora;
        })
        .sort((a, b) => {
          const fechaA = new Date(a.start.dateTime || a.start.date);
          const fechaB = new Date(b.start.dateTime || b.start.date);
          return fechaA.getTime() - fechaB.getTime();
        })
        .map(event => ({
          id: event.id,
          title: event.summary || 'Sin título',
          start: event.start.dateTime || event.start.date,
          end: event.end.dateTime || event.end.date,
          description: event.description,
          location: event.location,
          profesional: this.extraerProfesional(event.summary || ''),
          email: this.extraerEmail(event.description || '')
        }));

      this.eventos.set(eventosFuturos);
      this.conteoProximas.set(eventosFuturos.length);
      this.ultimaActualizacion.set(new Date().toLocaleTimeString('es-ES'));
      
      // Obtener evento en progreso (ahora o próximamente)
      this.actualizarEventoActual();
      
    } catch (error) {
      console.error('Error cargando eventos:', error);
      alert('Error al cargar los eventos de Google Calendar');
    } finally {
      this.isLoading.set(false);
    }
  }

  private actualizarEventoActual() {
    const ahora = new Date();
    const eventoActual = this.eventos().find(evento => {
      const inicio = new Date(evento.start);
      const fin = new Date(evento.end);
      return inicio <= ahora && ahora <= fin;
    });

    this.eventosAhora.set(eventoActual || null);
  }

  private extraerProfesional(titulo: string): string {
    // Extrae el nombre del profesional del título (ej: "Cita - Dr. Juan Pérez")
    const match = titulo.match(/Cita\s*-\s*(.+)/);
    return match ? match[1].trim() : 'Profesional';
  }

  private extraerEmail(descripcion: string): string {
    // Intenta extraer email de la descripción
    const match = descripcion.match(/[\w.-]+@[\w.-]+\.\w+/);
    return match ? match[0] : '';
  }

  verDetalles(evento: Evento) {
    this.selectedEvent.set(evento);
    this.showEventModal.set(true);
  }

  cerrarModal() {
    this.showEventModal.set(false);
    this.selectedEvent.set(null);
  }

  formatearFecha(fechaString: string): string {
    if (!fechaString) return '';
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatearHora(fechaString: string): string {
    if (!fechaString) return '';
    const fecha = new Date(fechaString);
    return fecha.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  calcularTiempoRestante(fechaString: string): string {
    const fecha = new Date(fechaString);
    const ahora = new Date();
    const diferencia = fecha.getTime() - ahora.getTime();

    if (diferencia < 0) return 'Ya pasó';

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));

    if (dias > 0) {
      return `en ${dias}d ${horas}h`;
    } else if (horas > 0) {
      return `en ${horas}h ${minutos}m`;
    } else {
      return `en ${minutos}m`;
    }
  }

  obtenerClaseEstado(evento: Evento): string {
    const ahora = new Date();
    const inicio = new Date(evento.start);
    const fin = new Date(evento.end);

    if (inicio <= ahora && ahora <= fin) {
      return 'en-progreso';
    } else if (inicio > ahora) {
      const diferencia = inicio.getTime() - ahora.getTime();
      const horas24 = 24 * 60 * 60 * 1000;
      
      if (diferencia <= horas24) {
        return 'proximo';
      }
      return 'pendiente';
    }
    return 'pasado';
  }

  obtenerIconoEstado(evento: Evento): string {
    const clase = this.obtenerClaseEstado(evento);
    switch (clase) {
      case 'en-progreso':
        return '🔴';
      case 'proximo':
        return '🟠';
      case 'pendiente':
        return '🟡';
      default:
        return '⚪';
    }
  }

  async cancelarTurno(evento: Evento) {
    const confirmacion = confirm(`¿Estás seguro de cancelar la cita del ${this.formatearFecha(evento.start)}?`);
    
    if (!confirmacion) return;

    try {
      const eliminado = await this.googleCalendarService.deleteEvent(evento.id);
      
      if (eliminado) {
        // Remover evento de la lista
        const eventualesActuales = this.eventos();
        const eventosFiltrados = eventualesActuales.filter(e => e.id !== evento.id);
        this.eventos.set(eventosFiltrados);
        this.conteoProximas.set(eventosFiltrados.length);
        
        alert('Cita cancelada exitosamente');
        this.cerrarModal();
      } else {
        alert('No se pudo cancelar la cita');
      }
    } catch (error) {
      console.error('Error cancelando cita:', error);
      alert('Error al cancelar la cita');
    }
  }

  exportarCalendario() {
    // Generar una lista de eventos en formato texto
    const texto = this.eventos()
      .map(e => `${this.formatearFecha(e.start)} ${this.formatearHora(e.start)} - ${e.title}`)
      .join('\n');

    const elemento = document.createElement('a');
    elemento.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(texto));
    elemento.setAttribute('download', `mis-turnos-${new Date().toISOString().split('T')[0]}.txt`);
    elemento.style.display = 'none';
    document.body.appendChild(elemento);
    elemento.click();
    document.body.removeChild(elemento);
  }
}
