import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent {

  altaUsuario() {
    alert('Función Alta Usuario - En desarrollo');
  }

  gestionProfesionales() {
    alert('Gestión de Profesionales - En desarrollo');
  }

  gestionPacientes() {
    alert('Gestión de Pacientes - En desarrollo');
  }
}