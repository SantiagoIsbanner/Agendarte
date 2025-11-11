import { Routes } from '@angular/router';
import { InicioComponent } from '../components/inicio/inicio.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterPacienteComponent } from '../components/register-paciente/register-paciente.component';
import { RegisterProfesionalComponent } from '../components/register-profesional/register-profesional.component';
import { AdminDashboardComponent } from '../components/admin-dashboard/admin-dashboard.component';
import { PanelProfesionalComponent } from '../components/panel-profesional/panel-profesional.component';
import { PanelPacienteComponent } from '../components/panel-paciente/panel-paciente.component';
import { AdministradorComponent } from '../components/administrador/administrador.component';
import { GestionUsuariosComponent } from '../components/gestion-usuarios/gestion-usuarios.component';
import { AdminRolesComponent } from '../components/admin-roles/admin-roles.component';
import { EditarPerfilComponent } from '../components/editar-perfil/editar-perfil.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register/paciente', component: RegisterPacienteComponent },
  { path: 'register/profesional', component: RegisterProfesionalComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'panel-profesional', component: PanelProfesionalComponent },
  { path: 'panel-paciente', component: PanelPacienteComponent },
  { path: 'administrador', component: AdministradorComponent },
  { path: 'gestion-usuarios', component: GestionUsuariosComponent },
  { path: 'admin-roles', component: AdminRolesComponent },
  { path: 'editar-perfil', component: EditarPerfilComponent }
];
