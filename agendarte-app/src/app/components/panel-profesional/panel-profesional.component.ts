import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel-profesional',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-profesional.component.html',
  styleUrls: ['./panel-profesional.component.css']
})
export class PanelProfesionalComponent implements OnInit {
  protected readonly isAuthenticated = signal(false);
  protected readonly events = signal<any[]>([]);

  ngOnInit() {
    this.initializeCalendar();
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
      const calendar = new (window as any).FullCalendar.Calendar(calendarEl, {
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
        height: 650,
        eventClick: (info: any) => {
          this.showEventModal(info.event);
        }
      });
      calendar.render();
    }
  }

  authenticate() {
    // Simular autenticación con Google
    this.isAuthenticated.set(true);
    console.log('Conectando con Google Calendar...');
  }

  loadCalendar() {
    if (!this.isAuthenticated()) {
      alert('Primero debes conectarte con Google');
      return;
    }
    
    // Simular carga de eventos
    const mockEvents = [
      {
        title: 'Consulta - Juan Pérez',
        start: new Date().toISOString().split('T')[0] + 'T10:00:00',
        end: new Date().toISOString().split('T')[0] + 'T11:00:00'
      },
      {
        title: 'Consulta - María García',
        start: new Date().toISOString().split('T')[0] + 'T14:00:00',
        end: new Date().toISOString().split('T')[0] + 'T15:00:00'
      }
    ];
    
    this.events.set(mockEvents);
    console.log('Eventos cargados:', mockEvents);
  }

  private showEventModal(event: any) {
    alert(`Evento: ${event.title}\nInicio: ${event.start.toLocaleString()}`);
  }

  clearCalendar() {
    this.events.set([]);
    console.log('Calendario limpiado');
  }
}