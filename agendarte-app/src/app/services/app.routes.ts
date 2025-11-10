import { Routes } from '@angular/router';
import { AdminDashboardComponent } from '../components/admin-dashboard/admin-dashboard.component';
import { PanelProfesionalComponent } from '../components/panel-profesional/panel-profesional.component';
import { HomeComponent } from '../components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'panel-profesional', component: PanelProfesionalComponent }
];
