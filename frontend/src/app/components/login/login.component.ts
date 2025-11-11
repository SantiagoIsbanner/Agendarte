import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  showModal = false;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor complete todos los campos';
      return;
    }

    this.http.post<any>('http://localhost:3000/api/auth/login', {
      mail: this.username,
      contraseña: this.password
    }).subscribe({
      next: (response) => {
        const usuario = response.usuario;
        localStorage.setItem('usuario', JSON.stringify(usuario));
        
        if (usuario.rol === 'administrador') {
          this.router.navigate(['/admin']);
        } else if (usuario.rol === 'profesional') {
          this.router.navigate(['/panel-profesional']);
        } else {
          this.router.navigate(['/inicio']);
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.error || 'Error al iniciar sesión';
      }
    });
  }

  openRegisterModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  registerAs(role: string) {
    this.closeModal();
    this.router.navigate(['/register', role]);
  }
}