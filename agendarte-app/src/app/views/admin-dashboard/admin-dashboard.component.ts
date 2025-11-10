import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  template: `
    <div class="dashboard admin-dashboard">
      <h1>Panel Administrativo</h1>
      <div class="dashboard-content">
        <div class="card">
          <h3>Gestión de Usuarios</h3>
          <p>Administrar usuarios y permisos del sistema</p>
        </div>
        <div class="card">
          <h3>Reportes</h3>
          <p>Ver estadísticas y generar informes</p>
        </div>
        <div class="card">
          <h3>Configuración</h3>
          <p>Ajustes generales del sistema</p>
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
export class AdminDashboardComponent {}