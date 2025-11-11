import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gestion-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-pacientes.component.html',
  styleUrls: ['./gestion-pacientes.component.css']
})
export class GestionPacientesComponent implements OnInit {
  pacientes: any[] = [];
  pacientesFiltrados: any[] = [];
  filtroBusqueda = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPacientes();
  }

  loadPacientes() {
    this.http.get<any[]>('http://localhost:3000/api/usuarios/pacientes').subscribe({
      next: (data) => {
        this.pacientes = data;
        this.aplicarFiltros();
      },
      error: (error) => console.error('Error:', error)
    });
  }

  aplicarFiltros() {
    this.pacientesFiltrados = this.pacientes.filter(pac => {
      return !this.filtroBusqueda || 
        pac.nombre.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
        pac.apellido.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
        pac.mail.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
        pac.dni?.includes(this.filtroBusqueda);
    });
  }
}
