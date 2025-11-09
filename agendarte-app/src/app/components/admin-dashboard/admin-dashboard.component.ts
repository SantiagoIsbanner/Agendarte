import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  protected readonly isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}