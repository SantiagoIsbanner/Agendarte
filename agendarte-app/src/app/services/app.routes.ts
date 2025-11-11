import { Routes } from '@angular/router';
import { AdminDashboardComponent } from '../components/admin-dashboard/admin-dashboard.component';
import { PanelProfesionalComponent } from '../components/panel-profesional/panel-profesional.component';
import { AdministradorComponent } from '../components/administrador/administrador.component';

export const routes: Routes = [
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'panel-profesional', component: PanelProfesionalComponent },
  { path: 'administrador', component: AdministradorComponent },
  { path: '', redirectTo: '/admin', pathMatch: 'full' }
];
