import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterPacienteComponent } from '../components/register-paciente/register-paciente.component';
import { AdminDashboardComponent } from '../components/admin-dashboard/admin-dashboard.component';
import { PanelProfesionalComponent } from '../components/panel-profesional/panel-profesional.component';
import { AdministradorComponent } from '../components/administrador/administrador.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register/paciente', component: RegisterPacienteComponent },
  { path: 'register/profesional', component: LoginComponent }, // Temporal
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'panel-profesional', component: PanelProfesionalComponent },
  { path: 'administrador', component: AdministradorComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
