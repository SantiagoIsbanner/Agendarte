import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gestion-profesionales',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-profesionales.component.html',
  styleUrls: ['./gestion-profesionales.component.css']
})
export class GestionProfesionalesComponent implements OnInit {
  profesionales: any[] = [];
  profesionalesFiltrados: any[] = [];
  especialidades: any[] = [];
  filtroEspecialidad = '';
  filtroBusqueda = '';

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.loadEspecialidades();
    this.loadProfesionales();
  }

  loadEspecialidades() {
    this.http.get<any[]>('http://localhost:3000/api/especialidades').subscribe({
      next: (data) => this.especialidades = data,
      error: (error) => console.error('Error:', error)
    });
  }

  loadProfesionales() {
    this.http.get<any[]>('http://localhost:3000/api/usuarios/profesionales').subscribe({
      next: (data) => {
        this.profesionales = data;
        this.aplicarFiltros();
      },
      error: (error) => console.error('Error:', error)
    });
  }

  aplicarFiltros() {
    this.profesionalesFiltrados = this.profesionales.filter(prof => {
      const matchBusqueda = !this.filtroBusqueda || 
        prof.nombre.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
        prof.apellido.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
        prof.mail.toLowerCase().includes(this.filtroBusqueda.toLowerCase());
      
      const matchEspecialidad = !this.filtroEspecialidad || 
        prof.especialidad_id == this.filtroEspecialidad;
      
      return matchBusqueda && matchEspecialidad;
    });
  }

  gestionEspecialidades() {
    this.router.navigate(['/gestion-especialidades']);
  }
}
