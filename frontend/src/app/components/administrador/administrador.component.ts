import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent {

  constructor(private router: Router) {}

  altaUsuario() {
    this.router.navigate(['/gestion-usuarios']);
  }

  gestionProfesionales() {
    this.router.navigate(['/gestion-profesionales']);
  }

  gestionPacientes() {
    alert('Gestión de Pacientes - En desarrollo');
  }
}