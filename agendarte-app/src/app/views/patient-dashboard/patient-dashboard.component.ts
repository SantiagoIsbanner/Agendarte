import { Component } from '@angular/core';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  template: `
    <div class="dashboard patient-dashboard">
      <h1>Panel del Paciente</h1>
      <div class="dashboard-content">
        <div class="card">
          <h3>Mis Citas</h3>
          <p>Ver y gestionar mis citas programadas</p>
        </div>
        <div class="card">
          <h3>Mi Historia Clínica</h3>
          <p>Acceder a mi historial médico</p>
        </div>
        <div class="card">
          <h3>Agendar Cita</h3>
          <p>Programar una nueva cita</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 2rem;
    }
    .dashboard-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    .card {
      padding: 1.5rem;
      border-radius: 8px;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
      color: #2c3e50;
      margin-bottom: 2rem;
    }
    h3 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }
    p {
      color: #666;
    }
  `]
})
export class PatientDashboardComponent {}