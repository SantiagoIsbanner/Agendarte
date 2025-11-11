import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleCalendarService } from '../../services/google-calendar.service';

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
  protected readonly isConnecting = signal(false);
  protected readonly selectedEvent = signal<any>(null);

  private calendar: any;

  constructor(private googleCalendarService: GoogleCalendarService) {}

  ngOnInit() {
    this.initializeCalendar();
    // Verificar si ya está autenticado
    this.isAuthenticated.set(this.googleCalendarService.isSignedIn());
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
}
