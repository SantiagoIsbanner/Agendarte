import { Routes } from '@angular/router';
import { AdminDashboard } from './views/admin-dashboard/admin-dashboard';
import { ProfessionalDashboard } from './views/professional-dashboard/professional-dashboard';
import { PatientDashboard } from './views/patient-dashboard/patient-dashboard';
import { MainLayout } from './views/main-layout/main-layout';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { AuthGuard } from './guards/auth.guard';
import { UserRole } from './models/user.model';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin',
        component: AdminDashboard,
        canActivate: [AuthGuard],
        data: { role: UserRole.ADMIN }
      },
      {
        path: 'professional',
        component: ProfessionalDashboard,
        canActivate: [AuthGuard],
        data: { role: UserRole.PROFESSIONAL }
      },
      {
        path: 'patient',
        component: PatientDashboard,
        canActivate: [AuthGuard],
        data: { role: UserRole.PATIENT }
      },
      {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: '**',
    redirectTo: ''
  }
];