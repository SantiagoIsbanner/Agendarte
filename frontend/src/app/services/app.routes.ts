import { Routes } from '@angular/router';
import { InicioComponent } from '../components/inicio/inicio.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterPacienteComponent } from '../components/register-paciente/register-paciente.component';
import { RegisterProfesionalComponent } from '../components/register-profesional/register-profesional.component';
import { AdminDashboardComponent } from '../components/admin-dashboard/admin-dashboard.component';
import { PanelProfesionalComponent } from '../components/panel-profesional/panel-profesional.component';
import { PanelPacienteComponent } from '../components/panel-paciente/panel-paciente.component';
import { MisTurnosComponent } from '../components/mis-turnos/mis-turnos.component';
import { AdministradorComponent } from '../components/administrador/administrador.component';
import { GestionUsuariosComponent } from '../components/gestion-usuarios/gestion-usuarios.component';
import { AdminRolesComponent } from '../components/admin-roles/admin-roles.component';
import { EditarPerfilComponent } from '../components/editar-perfil/editar-perfil.component';
import { GestionEspecialidadesComponent } from '../components/gestion-especialidades/gestion-especialidades.component';
import { GestionProfesionalesComponent } from '../components/gestion-profesionales/gestion-profesionales.component';
import { GestionPacientesComponent } from '../components/gestion-pacientes/gestion-pacientes.component';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register/paciente', component: RegisterPacienteComponent },
  { path: 'register/profesional', component: RegisterProfesionalComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'panel', component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: 'panel-profesional', component: PanelProfesionalComponent, canActivate: [authGuard] },
  { path: 'panel-paciente', component: PanelPacienteComponent, canActivate: [authGuard] },
  { path: 'mis-turnos', component: MisTurnosComponent, canActivate: [authGuard] },
  { path: 'administrador', component: AdministradorComponent, canActivate: [authGuard] },
  { path: 'gestion-usuarios', component: GestionUsuariosComponent, canActivate: [authGuard] },
  { path: 'admin-roles', component: AdminRolesComponent, canActivate: [authGuard] },
  { path: 'editar-perfil', component: EditarPerfilComponent, canActivate: [authGuard] },
  { path: 'gestion-especialidades', component: GestionEspecialidadesComponent, canActivate: [authGuard] },
  { path: 'gestion-profesionales', component: GestionProfesionalesComponent, canActivate: [authGuard] },
  { path: 'gestion-pacientes', component: GestionPacientesComponent, canActivate: [authGuard] }
];
