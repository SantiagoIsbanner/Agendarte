import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleCalendarService } from '../../services/google-calendar.service';

@Component({
  selector: 'app-panel-profesional',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './panel-profesional.component.html',
  styleUrls: ['./panel-profesional.component.css']
})
export class PanelProfesionalComponent implements OnInit {
  protected readonly isAuthenticated = signal(false);
  protected readonly events = signal<any[]>([]);
  protected readonly showModal = signal(false);
  protected readonly showEventModal = signal(false);
  protected readonly isConnecting = signal(false);
  protected readonly selectedEvent = signal<any>(null);
  protected isEditing = false; 
  protected editingEventId: string = '';
  
  protected newAppointment = {
    patient: '',
    email: '',
    date: '',
    time: '',
    duration: '60',
    notes: ''
  };
  
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
      alert('Error al cargar eventos de Google Calendar');
    }
  }

  getTodayEvents(): number {
    const today = new Date().toISOString().split('T')[0];
    return this.events().filter(event => {
      const eventDate = new Date(event.start).toISOString().split('T')[0];
      return eventDate === today;
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

  editEvent() {
    const event = this.selectedEvent();
    if (!event) return;

    // Marcar como edición y guardar ID del evento
    this.isEditing = true;
    this.editingEventId = event.extendedProps?.googleId || event.id || '';

    // Cargar datos del evento en el formulario
    const eventDate = new Date(event.start);
    this.newAppointment = {
      patient: event.title.replace('Consulta - ', ''),
      email: event.extendedProps?.email || '',
      date: eventDate.toISOString().split('T')[0],
      time: eventDate.toTimeString().slice(0, 5),
      duration: '60',
      notes: event.extendedProps?.notes || ''
    };

    this.closeEventModal();
    this.showModal.set(true);
  }

  async deleteEvent() {
    const event = this.selectedEvent();
    if (!event) return;

    const confirmed = confirm(`¿Estás seguro de eliminar la cita de ${event.title.replace('Consulta - ', '')}?`);
    if (!confirmed) return;

    try {
      // Eliminar de Google Calendar si está autenticado
      if (this.isAuthenticated()) {
        const googleEventId = event.extendedProps?.googleId || event.id;
        
        if (googleEventId) {
          const deleted = await this.googleCalendarService.deleteEvent(googleEventId);
          if (!deleted) {
            throw new Error('No se pudo eliminar de Google Calendar');
          }
        }
      }

      // Eliminar del calendario local
      if (this.calendar) {
        event.remove();
      }

      // Actualizar la lista de eventos
      const currentEvents = this.events();
      const updatedEvents = currentEvents.filter(e => e.start !== event.startStr);
      this.events.set(updatedEvents);

      this.closeEventModal();
      alert('Cita eliminada exitosamente de Google Calendar');
    } catch (error) {
      alert('Error al eliminar la cita de Google Calendar');
    }
  }

  async createQuickAppointment() {
    if (!this.isAuthenticated()) {
      alert('Primero debes conectarte con Google Calendar');
      return;
    }

    const patientName = prompt('Nombre del paciente:');
    if (!patientName) return;

    const appointmentDate = prompt('Fecha (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
    if (!appointmentDate) return;

    const appointmentTime = prompt('Hora (HH:MM):', '09:00');
    if (!appointmentTime) return;

    try {
      const startDateTime = `${appointmentDate}T${appointmentTime}:00`;
      const endTime = new Date(startDateTime);
      endTime.setHours(endTime.getHours() + 1); // 1 hora de duración por defecto

      const googleEvent = {
        summary: `Consulta - ${patientName}`,
        start: {
          dateTime: startDateTime,
          timeZone: 'America/Argentina/Buenos_Aires'
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: 'America/Argentina/Buenos_Aires'
        },
        description: 'Turno creado desde Panel Profesional'
      };

      await this.googleCalendarService.createEvent(googleEvent);
      
      const newEvent = {
        title: `Consulta - ${patientName}`,
        start: startDateTime,
        end: endTime.toISOString()
      };

      if (this.calendar) {
        this.calendar.addEvent(newEvent);
      }

      alert(`Turno creado exitosamente para ${patientName}`);
      console.log('Turno guardado en Google Calendar:', googleEvent);
    } catch (error) {
      console.error('Error creando turno:', error);
      alert('Error al crear el turno en Google Calendar');
    }
  }

  showNewAppointmentModal() {
    this.showModal.set(true);
    // Establecer fecha actual por defecto
    this.newAppointment.date = new Date().toISOString().split('T')[0];
  }
  
  closeModal() {
    this.showModal.set(false);
    this.isEditing = false;
    this.editingEventId = '';
    this.resetForm();
  }
  
  async saveAppointment() {
    if (!this.newAppointment.patient || !this.newAppointment.email || !this.newAppointment.date || !this.newAppointment.time) {
      alert('Por favor completa todos los campos obligatorios (*).');
      return;
    }
    
    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.newAppointment.email)) {
      alert('Por favor ingresa un email válido');
      return;
    }
    
    const startDateTime = `${this.newAppointment.date}T${this.newAppointment.time}:00`;
    const endTime = new Date(startDateTime);
    endTime.setMinutes(endTime.getMinutes() + parseInt(this.newAppointment.duration));
    
    const googleEvent = {
      summary: `Consulta - ${this.newAppointment.patient}`,
      start: {
        dateTime: new Date(startDateTime).toISOString(),
        timeZone: 'America/Argentina/Buenos_Aires'
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'America/Argentina/Buenos_Aires'
      },
      description: this.newAppointment.notes || 'Consulta médica',
      attendees: [
        {
          email: this.newAppointment.email
        }
      ]
    };
    
    try {
      let result: any = null;
      
      if (this.isAuthenticated()) {
        if (this.isEditing && this.editingEventId) {
          result = await this.googleCalendarService.updateEvent(this.editingEventId, googleEvent);
        } else {
          result = await this.googleCalendarService.createEvent(googleEvent);
        }
        
        if (result?.error) {
          throw new Error(result.error.message || 'Error desconocido');
        }
      } else {
        alert('Debes estar conectado a Google Calendar para guardar el evento');
        return;
      }
      
      const newEvent = {
        title: `Consulta - ${this.newAppointment.patient}`,
        start: startDateTime,
        end: endTime.toISOString(),
        extendedProps: {
          notes: this.newAppointment.notes,
          email: this.newAppointment.email,
          googleId: result?.id || this.editingEventId
        }
      };
      
      if (this.isEditing) {
        // Actualizar evento existente en el calendario local
        const currentEvents = this.events();
        const updatedEvents = currentEvents.map(e => 
          e.extendedProps?.googleId === this.editingEventId ? newEvent : e
        );
        this.events.set(updatedEvents);
        
        if (this.calendar) {
          // Recargar el calendario para mostrar cambios
          this.calendar.refetchEvents();
        }
      } else {
        // Agregar nuevo evento
        const currentEvents = this.events();
        this.events.set([...currentEvents, newEvent]);
        
        if (this.calendar) {
          this.calendar.addEvent(newEvent);
        }
      }
      
      const action = this.isEditing ? 'actualizado' : 'creado';
      alert(`Turno ${action} exitosamente en Google Calendar.\nSe ha enviado una invitación por email a: ${this.newAppointment.email}`);
      
      // Resetear estado de edición
      this.isEditing = false;
      this.editingEventId = '';
      
      this.closeModal();
    } catch (error) {
      alert('Error al guardar el turno en Google Calendar');
    }
  }
  
  private resetForm() {
    this.newAppointment = {
      patient: '',
      email: '',
      date: '',
      time: '',
      duration: '60',
      notes: ''
    };
  }
}