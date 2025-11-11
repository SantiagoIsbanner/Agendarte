import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleCalendarService } from '../../services/google-calendar.service';
import { UsuarioService, Usuario } from '../../services/usuario.service';

@Component({
  selector: 'app-panel-paciente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-paciente.component.html',
  styleUrls: ['./panel-paciente.component.css']
})
export class PanelPacienteComponent implements OnInit {
  protected readonly isAuthenticated = signal(false);
  protected readonly events = signal<any[]>([]);
  protected readonly showEventModal = signal(false);
  protected readonly showModal = signal(false);
  protected readonly isConnecting = signal(false);
  protected readonly selectedEvent = signal<any>(null);
  protected readonly profesionales = signal<Usuario[]>([]);
  protected readonly especialidades = signal<string[]>([]);
  protected readonly profesionalesFiltrados = signal<Usuario[]>([]);
  
  protected especialidadSeleccionada = '';

  protected newAppointment = {
    profesional_id: '',
    especialidad: '',
    mail: '',
    fecha: '',
    hora: '',
    duracion: '60',
    notas: ''
  };

  private calendar: any;

  constructor(
    private googleCalendarService: GoogleCalendarService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.initializeCalendar();
    // Verificar si ya está autenticado
    this.isAuthenticated.set(this.googleCalendarService.isSignedIn());
    // Cargar profesionales
    this.loadProfesionales();
  }

  private loadProfesionales() {
    // Cargar profesionales (lista completa)
    this.usuarioService.getProfesionales().subscribe({
      next: (profesionales) => {
        this.profesionales.set(profesionales);
        this.profesionalesFiltrados.set(profesionales);
      },
      error: (error) => console.error('Error al cargar profesionales:', error)
    });

    // Obtener especialidades desde el backend (endpoint dedicado) o fallback
    this.usuarioService.getEspecialidades().subscribe({
      next: (especialidades) => {
        this.especialidades.set(especialidades || []);
      },
      error: (error) => console.error('Error al cargar especialidades:', error)
    });
  }

  filtrarPorEspecialidad(especialidad: string) {
    this.especialidadSeleccionada = especialidad;
    this.newAppointment.especialidad = especialidad;
    
    if (especialidad === '') {
      this.profesionalesFiltrados.set(this.profesionales());
    } else {
      const filtrados = this.profesionales().filter(p => p.especialidad === especialidad);
      this.profesionalesFiltrados.set(filtrados);
    }
    
    // Resetear selección de profesional y mail cuando se cambia especialidad
    this.newAppointment.profesional_id = '';
    this.newAppointment.mail = '';
  }

  onProfesionalChange(profesionalId: string) {
    this.newAppointment.profesional_id = profesionalId;
    
    // Auto-llenar el email del profesional seleccionado
    const profesional = this.profesionales().find(p => p.id.toString() === profesionalId);
    if (profesional) {
      this.newAppointment.mail = profesional.mail;
    }
  }

  private initializeCalendar() {
    // Inicializar FullCalendar después de que el DOM esté listo
    setTimeout(() => {
      this.loadFullCalendar();
    }, 100);
  }

  private loadFullCalendar() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/fullcalendar@6.1.10/index.global.min.js';
    script.onload = () => {
      this.setupCalendar();
    };
    document.head.appendChild(script);
  }

  private setupCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (calendarEl && (window as any).FullCalendar) {
      this.calendar = new (window as any).FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        buttonText: {
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día'
        },
        allDayText: 'Horas',
        height: 650,
        eventClick: (info: any) => {
          this.showEventDetails(info.event);
        },
        events: this.events()
      });
      this.calendar.render();
    }
  }

  async authenticate() {
    this.isConnecting.set(true);
    try {
      const success = await this.googleCalendarService.authenticate();
      this.isAuthenticated.set(success);
    } catch (error) {
      this.isAuthenticated.set(false);
    } finally {
      this.isConnecting.set(false);
    }
  }

  async loadCalendar() {
    if (!this.isAuthenticated()) {
      alert('Primero debes conectarte con Google');
      return;
    }

    try {
      const googleEvents = await this.googleCalendarService.getEvents();
      const formattedEvents = googleEvents.map(event => ({
        title: event.summary || 'Sin título',
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date,
        id: event.id,
        extendedProps: {
          description: event.description,
          location: event.location,
          googleId: event.id
        }
      }));

      this.events.set(formattedEvents);
      if (this.calendar) {
        this.calendar.removeAllEvents();
        this.calendar.addEventSource(formattedEvents);
      }
    } catch (error) {
      alert('Error al cargar citas de Google Calendar');
    }
  }

  getUpcomingAppointments(): number {
    const today = new Date().toISOString().split('T')[0];
    return this.events().filter(event => {
      const eventDate = new Date(event.start).toISOString().split('T')[0];
      return eventDate >= today;
    }).length;
  }

  private showEventDetails(event: any) {
    this.selectedEvent.set(event);
    this.showEventModal.set(true);
  }

  closeEventModal() {
    this.showEventModal.set(false);
    this.selectedEvent.set(null);
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatTime(dateString: string): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  async cancelAppointment() {
    const event = this.selectedEvent();
    if (!event) return;

    const confirmed = confirm(`¿Estás seguro de cancelar la cita de ${event.title}?`);
    if (!confirmed) return;

    try {
      if (this.isAuthenticated()) {
        const googleEventId = event.extendedProps?.googleId || event.id;

        if (googleEventId) {
          const deleted = await this.googleCalendarService.deleteEvent(googleEventId);
          if (!deleted) {
            throw new Error('No se pudo cancelar la cita');
          }
        }
      }

      if (this.calendar) {
        event.remove();
      }

      const currentEvents = this.events();
      const updatedEvents = currentEvents.filter(e => e.start !== event.startStr);
      this.events.set(updatedEvents);

      this.closeEventModal();
      alert('Cita cancelada exitosamente');
    } catch (error) {
      alert('Error al cancelar la cita');
    }
  }

  showNewAppointmentModal() {
    this.showModal.set(true);
    // Establecer fecha actual por defecto
    this.newAppointment.fecha = new Date().toISOString().split('T')[0];
    this.especialidadSeleccionada = '';
  }

  closeModal() {
    this.showModal.set(false);
    this.resetForm();
  }

  async saveAppointment() {
    if (!this.newAppointment.profesional_id || !this.newAppointment.fecha || !this.newAppointment.hora) {
      alert('Por favor completa todos los campos obligatorios (*).');
      return;
    }

    const profesionalSeleccionado = this.profesionales().find(p => p.id.toString() === this.newAppointment.profesional_id);
    if (!profesionalSeleccionado) {
      alert('Profesional no válido');
      return;
    }

    const startDateTime = `${this.newAppointment.fecha}T${this.newAppointment.hora}:00`;
    const endTime = new Date(startDateTime);
    endTime.setMinutes(endTime.getMinutes() + parseInt(this.newAppointment.duracion));

    const googleEvent = {
      summary: `Cita - ${profesionalSeleccionado.nombre} ${profesionalSeleccionado.apellido}`,
      start: {
        dateTime: new Date(startDateTime).toISOString(),
        timeZone: 'America/Argentina/Buenos_Aires'
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'America/Argentina/Buenos_Aires'
      },
      description: this.newAppointment.notas || 'Cita médica',
      attendees: [
        {
          email: profesionalSeleccionado.mail
        }
      ]
    };

    try {
      let result: any = null;

      if (this.isAuthenticated()) {
        result = await this.googleCalendarService.createEvent(googleEvent);

        if (result?.error) {
          throw new Error(result.error.message || 'Error desconocido');
        }
      } else {
        alert('Debes estar conectado a Google Calendar para guardar el evento');
        return;
      }

      const newEvent = {
        title: `Cita - ${profesionalSeleccionado.nombre} ${profesionalSeleccionado.apellido}`,
        start: startDateTime,
        end: endTime.toISOString(),
        extendedProps: {
          notas: this.newAppointment.notas,
          profesional: profesionalSeleccionado.nombre + ' ' + profesionalSeleccionado.apellido,
          googleId: result?.id
        }
      };

      const currentEvents = this.events();
      this.events.set([...currentEvents, newEvent]);

      if (this.calendar) {
        this.calendar.addEvent(newEvent);
      }

      alert(`Cita creada exitosamente con ${profesionalSeleccionado.nombre} ${profesionalSeleccionado.apellido}.\nSe ha enviado una invitación por email a: ${profesionalSeleccionado.mail}`);

      this.closeModal();
    } catch (error) {
      console.error('Error al guardar la cita:', error);
      alert('Error al guardar la cita en Google Calendar');
    }
  }

  private resetForm() {
    this.newAppointment = {
      profesional_id: '',
      especialidad: '',
      mail: '',
      fecha: '',
      hora: '',
      duracion: '60',
      notas: ''
    };
  }
}
