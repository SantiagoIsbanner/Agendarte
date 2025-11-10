import { Component } from '@angular/core';

@Component({
  selector: 'app-professional-dashboard',
  standalone: true,
  template: `
    <div class="dashboard professional-dashboard">
      <h1>Panel del Profesional</h1>
      <div class="dashboard-content">
        <div class="card">
          <h3>Mis Pacientes</h3>
          <p>Ver y gestionar lista de pacientes</p>
        </div>
        <div class="card">
          <h3>Agenda</h3>
          <p>Gestionar citas y horarios</p>
        </div>
        <div class="card">
          <h3>Historiales Clínicos</h3>
          <p>Acceder a historiales de pacientes</p>
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
export class ProfessionalDashboardComponent {}