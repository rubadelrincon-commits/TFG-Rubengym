import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Clase {
  nombre: string;
  categoria: string;
  imagen: string;
  descripcion?: string;
}

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {
  filtroActivo: string = 'todos';

  clases: Clase[] = [
    {
      nombre: 'Yoga Flow',
      categoria: 'Relajación',
      imagen: 'assets/images/yoga.jpg',
      descripcion: 'Conecta cuerpo y mente con esta clase suave de yoga para todos los niveles.'
    },
    {
      nombre: 'HIIT Explosivo',
      categoria: 'Cardio',
      imagen: 'assets/images/hiit.jpg',
      descripcion: 'Entrenamiento intenso de intervalos para quemar grasa y mejorar tu resistencia.'
    },
    {
      nombre: 'Fuerza Funcional',
      categoria: 'Fuerza',
      imagen: 'assets/images/fuerza.jpg',
      descripcion: 'Ejercicios de fuerza con tu peso corporal o mancuernas para todo el cuerpo.'
    },
    {
      nombre: 'Dance Fit',
      categoria: 'Diversión',
      imagen: 'assets/images/danza.jpg',
      descripcion: 'Suelta el estrés y diviértete con rutinas coreografiadas al ritmo de la música.'
    },
    {
      nombre: 'Pilates Suave',
      categoria: 'Relajación',
      imagen: 'assets/images/pilates.jpg',
      descripcion: 'Fortalece el core, mejora tu postura y relaja tu mente con movimientos controlados.'
    },
    {
      nombre: 'Box Virtual',
      categoria: 'Cardio',
      imagen: 'assets/images/cardio.jpg',
      descripcion: 'Golpea el estrés con esta clase de boxeo sin contacto que acelera tu ritmo.'
    },
    {
      nombre: 'Core Killer',
      categoria: 'Fuerza',
      imagen: 'assets/images/core.jpg',
      descripcion: 'Enfócate en tu zona abdominal con ejercicios retadores y efectivos.'
    },
    {
      nombre: 'Zumba Party',
      categoria: 'Diversión',
      imagen: 'assets/images/zumba.jpg',
      descripcion: 'Una fiesta de baile para quemar calorías y liberar endorfinas sin darte cuenta.'
    }
  ];

  clasesFiltradas: Clase[] = [...this.clases];

  // 🆕 Propiedades del modal
  mostrarModal: boolean = false;
  claseSeleccionada: Clase | null = null;

  constructor() {}

  ngOnInit(): void {
    // Inicializa cualquier funcionalidad adicional al cargar el componente
  }

  toggleAnswer(event: Event): void {
    const button = event.target as HTMLElement;
    const answer = button.nextElementSibling;

    if (answer) {
      answer.classList.toggle('show');
    }
  }

  toggleMenu(): void {
    const menu = document.querySelector('.menu');
    if (menu) {
      menu.classList.toggle('active');
    }
  }

  openPopup(): void {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'block';
    }
  }

  closePopup(): void {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'none';
    }
  }

  filtrarClases(categoria: string): void {
    this.filtroActivo = categoria;
    if (categoria === 'todos') {
      this.clasesFiltradas = [...this.clases];
    } else {
      this.clasesFiltradas = this.clases.filter(clase => clase.categoria === categoria);
    }
  }

  // 🆕 Modal con detalle de clase
  verDetalle(clase: Clase): void {
    this.claseSeleccionada = clase;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }
}

