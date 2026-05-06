import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-vivo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vivo.component.html',
  styleUrls: ['./vivo.component.css']
})
export class VivoComponent {
  constructor(private router: Router) {}

  filtroDia: string = 'lunes';
  mostrarModal: boolean = false;
  claseSeleccionada: any = null;

  clases = [
    { dia: 'lunes', hora: '08:00', nombre: 'Cardio HIIT', instructor: 'Laura', duracion: 30, tipo: 'Cardio', descripcion: 'Entrenamiento intenso de alta energía.' },
    { dia: 'lunes', hora: '18:00', nombre: 'Yoga Flow', instructor: 'Carlos', duracion: 45, tipo: 'Relajación', descripcion: 'Sesión de yoga para aliviar el estrés.' },
    { dia: 'martes', hora: '09:00', nombre: 'Fuerza Funcional', instructor: 'Ana', duracion: 40, tipo: 'Fuerza', descripcion: 'Entrenamiento de cuerpo completo con peso corporal.' },
    { dia: 'martes', hora: '20:00', nombre: 'Dance Fit', instructor: 'Marcos', duracion: 50, tipo: 'Diversión', descripcion: 'Clase con música latina para quemar calorías bailando.' },
    { dia: 'miércoles', hora: '07:30', nombre: 'Stretch & Mobility', instructor: 'Julia', duracion: 30, tipo: 'Relajación', descripcion: 'Mejora tu flexibilidad y recuperación muscular.' },
    { dia: 'miércoles', hora: '19:00', nombre: 'Core Blast', instructor: 'Sergio', duracion: 25, tipo: 'Fuerza', descripcion: 'Rutina intensa enfocada en abdomen y zona media.' },
    { dia: 'jueves', hora: '08:00', nombre: 'Pilates Online', instructor: 'Sofía', duracion: 45, tipo: 'Relajación', descripcion: 'Fortalece y estira tu cuerpo con movimientos controlados.' },
    { dia: 'jueves', hora: '21:00', nombre: 'Box Fit', instructor: 'Juan', duracion: 50, tipo: 'Cardio', descripcion: 'Entrenamiento estilo boxeo para mejorar tu resistencia.' },
    { dia: 'viernes', hora: '10:00', nombre: 'Full Body Circuit', instructor: 'Martina', duracion: 60, tipo: 'Fuerza', descripcion: 'Circuito funcional de cuerpo completo.' },
    { dia: 'viernes', hora: '17:00', nombre: 'Zumba Virtual', instructor: 'Luis', duracion: 45, tipo: 'Diversión', descripcion: 'Clase dinámica para moverse y pasarlo bien.' },
    { dia: 'sábado', hora: '11:00', nombre: 'Bootcamp Express', instructor: 'Andrea', duracion: 35, tipo: 'Cardio', descripcion: 'Entrenamiento de alta intensidad en poco tiempo.' },
    { dia: 'domingo', hora: '09:30', nombre: 'Mindful Yoga', instructor: 'Valentina', duracion: 50, tipo: 'Relajación', descripcion: 'Clase suave para empezar el domingo con calma.' },
  ];

  get clasesFiltradas() {
    return this.clases.filter(clase => clase.dia === this.filtroDia);
  }

  filtrarDia(dia: string) {
    this.filtroDia = dia;
  }

  abrirModal(clase: any) {
    this.claseSeleccionada = clase;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.claseSeleccionada = null;
  }

  reservarClase(clase: any) {
    alert(`¡Has reservado la clase de "${clase.nombre}" con ${clase.instructor}!`);
  }

  toggleMenu() {
    const menu = document.querySelector('.menu');
    if (menu) {
      menu.classList.toggle('active');
    }
  }
  ngOnInit(): void {
    const video = document.getElementById('videoFondo') as HTMLVideoElement;
    if (video) {
      video.playbackRate = 0.5; // 👈 Baja la velocidad a 75% (más lento)
    }
  }
}
