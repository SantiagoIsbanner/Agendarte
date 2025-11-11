import { Component, signal, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { PermisosService } from '../services/permisos.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('agendarte-app');
  protected readonly isMenuOpen = signal(false);
  protected readonly isLoginPage = signal(false);
  protected menuItems = signal<any[]>([]);

  constructor(
    private router: Router,
    private permisosService: PermisosService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isLoginPage.set(event.url === '/' || event.url === '/login' || event.url.startsWith('/register'));
    });
  }

  ngOnInit() {
    this.loadMenuItems();
    this.permisosService.permisos$.subscribe(() => {
      this.loadMenuItems();
    });
  }

  loadMenuItems() {
    this.menuItems.set(this.permisosService.getMenuItems());
  }

  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  logout(): void {
    this.closeMenu();
    this.router.navigate(['/login']);
  }
}
