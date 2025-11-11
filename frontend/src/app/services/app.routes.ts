import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterPacienteComponent } from '../components/register-paciente/register-paciente.component';
import { RegisterProfesionalComponent } from '../components/register-profesional/register-profesional.component';
import { AdminDashboardComponent } from '../components/admin-dashboard/admin-dashboard.component';
import { PanelProfesionalComponent } from '../components/panel-profesional/panel-profesional.component';
import { AdministradorComponent } from '../components/administrador/administrador.component';
import { InicioComponent } from '../components/inicio/inicio.component';
import { GestionUsuariosComponent } from '../components/gestion-usuarios/gestion-usuarios.component';
import { AdminRolesComponent } from '../components/admin-roles/admin-roles.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register/paciente', component: RegisterPacienteComponent },
  { path: 'register/profesional', component: RegisterProfesionalComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'panel-profesional', component: PanelProfesionalComponent },
  { path: 'administrador', component: AdministradorComponent },
  { path: 'gestion-usuarios', component: GestionUsuariosComponent },
  { path: 'admin-roles', component: AdminRolesComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
