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
  protected readonly isConnecting = signal(false);
  
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
          this.showEventModal(info.event);
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
      if (success) {
        console.log('Conectado con Google Calendar exitosamente');
      } else {
        console.error('Error en la autenticación');
      }
    } catch (error) {
      console.error('Error conectando con Google:', error);
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
        extendedProps: {
          description: event.description,
          location: event.location
        }
      }));
      
      this.events.set(formattedEvents);
      if (this.calendar) {
        this.calendar.removeAllEvents();
        this.calendar.addEventSource(formattedEvents);
      }
      console.log('Eventos de Google Calendar cargados:', formattedEvents);
    } catch (error) {
      console.error('Error cargando eventos:', error);
      alert('Error al cargar eventos de Google Calendar');
    }
  }

  private showEventModal(event: any) {
    const notes = event.extendedProps?.notes ? `\nNotas: ${event.extendedProps.notes}` : '';
    alert(`Evento: ${event.title}\nInicio: ${event.start.toLocaleString()}\nFin: ${event.end?.toLocaleString() || 'No definido'}${notes}`);
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
        dateTime: startDateTime,
        timeZone: 'America/Argentina/Buenos_Aires'
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'America/Argentina/Buenos_Aires'
      },
      description: this.newAppointment.notes,
      attendees: [
        {
          email: this.newAppointment.email,
          responseStatus: 'needsAction'
        }
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 día antes
          { method: 'popup', minutes: 30 } // 30 minutos antes
        ]
      }
    };
    
    try {
      if (this.isAuthenticated()) {
        await this.googleCalendarService.createEvent(googleEvent);
        console.log('Evento creado en Google Calendar con invitación enviada');
      }
      
      const newEvent = {
        title: `Consulta - ${this.newAppointment.patient}`,
        start: startDateTime,
        end: endTime.toISOString(),
        extendedProps: {
          notes: this.newAppointment.notes,
          email: this.newAppointment.email
        }
      };
      
      const currentEvents = this.events();
      this.events.set([...currentEvents, newEvent]);
      
      if (this.calendar) {
        this.calendar.addEvent(newEvent);
      }
      
      alert(`Turno creado exitosamente.\nSe ha enviado una invitación por email a: ${this.newAppointment.email}`);
      console.log('Turno asignado con invitación:', newEvent);
      this.closeModal();
    } catch (error) {
      console.error('Error guardando turno:', error);
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