import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserRole } from '../../models/user.model';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="main-layout">
      <nav class="navbar">
        <div class="logo">Agendarte</div>
        <div class="nav-links">
          <ng-container *ngIf="authService.currentUserValue">
            <a *ngIf="authService.hasRole(UserRole.ADMIN)" routerLink="/admin">Panel Administrativo</a>
            <a *ngIf="authService.hasRole(UserRole.PROFESSIONAL)" routerLink="/professional">Panel Profesional</a>
            <a *ngIf="authService.hasRole(UserRole.PATIENT)" routerLink="/patient">Panel Paciente</a>
            <button (click)="logout()">Cerrar Sesión</button>
          </ng-container>
        </div>
      </nav>
      <div class="content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .main-layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #f8f9fa;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .nav-links {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    .nav-links a {
      text-decoration: none;
      color: #333;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    .nav-links a:hover {
      background-color: #e9ecef;
    }
    .content {
      flex: 1;
      padding: 2rem;
    }
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      background-color: #dc3545;
      color: white;
      cursor: pointer;
    }
    button:hover {
      background-color: #c82333;
    }
  `]
})
export class MainLayoutComponent {
  UserRole = UserRole;

  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}