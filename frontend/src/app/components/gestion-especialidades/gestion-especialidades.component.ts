import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Especialidad {
  id?: number;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-gestion-especialidades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-especialidades.component.html',
  styleUrls: ['./gestion-especialidades.component.css']
})
export class GestionEspecialidadesComponent implements OnInit {
  especialidades: Especialidad[] = [];
  showModal = false;
  isEditing = false;
  especialidadForm: Especialidad = { nombre: '', descripcion: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadEspecialidades();
  }

  loadEspecialidades() {
    this.http.get<Especialidad[]>('http://localhost:3000/api/especialidades').subscribe({
      next: (data) => this.especialidades = data,
      error: (error) => console.error('Error:', error)
    });
  }

  openModal(especialidad?: Especialidad) {
    this.showModal = true;
    if (especialidad) {
      this.isEditing = true;
      this.especialidadForm = { ...especialidad };
    } else {
      this.isEditing = false;
      this.especialidadForm = { nombre: '', descripcion: '' };
    }
  }

  closeModal() {
    this.showModal = false;
    this.especialidadForm = { nombre: '', descripcion: '' };
  }

  save() {
    if (this.isEditing) {
      this.http.put(`http://localhost:3000/api/especialidades/${this.especialidadForm.id}`, this.especialidadForm).subscribe({
        next: () => {
          this.loadEspecialidades();
          this.closeModal();
        },
        error: (error) => alert('Error al actualizar')
      });
    } else {
      this.http.post('http://localhost:3000/api/especialidades', this.especialidadForm).subscribe({
        next: () => {
          this.loadEspecialidades();
          this.closeModal();
        },
        error: (error) => alert('Error al crear')
      });
    }
  }

  delete(id: number) {
    if (confirm('¿Está seguro de eliminar esta especialidad?')) {
      this.http.delete(`http://localhost:3000/api/especialidades/${id}`).subscribe({
        next: () => this.loadEspecialidades(),
        error: (error) => alert('Error al eliminar')
      });
    }
  }
}
