import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  ElementRef,
  ViewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nutricion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nutricion.component.html',
  styleUrls: ['./nutricion.component.css']
})
export class NutricionComponent implements OnInit {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  resultado: string = '';
  mensajeMotivacional: string = '';
  rutinaSemanal: any[] = [];

  tips: string[] = [
    "Agrega más vegetales verdes a tus comidas 🥦",
    "Evita los azúcares refinados 🍬",
    "Bebe al menos 2 litros de agua al día 💧",
    "Incluye proteína en cada comida 🍗",
    "No te saltes el desayuno 🍳",
    "Planifica tus comidas con anticipación 📅"
  ];

  erroresNutricion: string[] = [
    "❌ Saltarse comidas pensando que ayuda a perder peso.",
    "❌ Consumir pocas proteínas, especialmente en entrenamientos intensos.",
    "❌ Depender de dietas milagrosas o restrictivas.",
    "❌ No hidratarse lo suficiente durante el día.",
    "❌ Comer por ansiedad o aburrimiento, no por hambre real."
  ];
  erroresVisibles: string[] = [];

  private frasesMotivacion: string[] = [
    "🔥 ¡No pares, estás a un paso de tu mejor versión!",
    "🏋️‍♂️ El sudor de hoy, es el resultado de mañana.",
    "🥗 Nutre tu cuerpo, eleva tu alma.",
    "💪 ¡Cada movimiento cuenta!",
    "🚀 La energía que das... ¡es la que recibes!"
  ];

  private diasSemana: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.mostrarTipAleatorio();
      this.cargarParticlesJS();
      this.mostrarErroresAnimadamente();
      this.agitarAlertaNutricion();
    }
  }

  async exportarPDF(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      const html2pdf = (await import('html2pdf.js')).default;

      const options = {
        filename: 'rutina-semanal-FITZONE.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      const element = this.pdfContent.nativeElement;
      html2pdf().set(options).from(element).save();
    }
  }

  cargarParticlesJS(): void {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
    script.onload = () => {
      (window as any).particlesJS('particles-background', {
        particles: {
          number: { value: 80 },
          color: { value: '#00ffd5' },
          shape: { type: 'circle' },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#0ff',
            opacity: 0.4,
            width: 1
          },
          move: { enable: true, speed: 2 }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'repulse' }
          }
        },
        retina_detect: true
      });
    };
    document.body.appendChild(script);
  }

  calcularCalorias(event: Event): void {
    event.preventDefault();

    const edad = +(document.getElementById('edad') as HTMLInputElement).value;
    const genero = (document.getElementById('genero') as HTMLSelectElement).value;
    const peso = +(document.getElementById('peso') as HTMLInputElement).value;
    const altura = +(document.getElementById('altura') as HTMLInputElement).value;
    const actividad = +(document.getElementById('actividad') as HTMLSelectElement).value;

    let tmb: number;
    if (genero === 'hombre') {
      tmb = 10 * peso + 6.25 * altura - 5 * edad + 5;
    } else {
      tmb = 10 * peso + 6.25 * altura - 5 * edad - 161;
    }

    const calorias = Math.round(tmb * actividad);

    this.animarConteo('.resultado', 0, calorias, 1500, '🔥 Necesitas aproximadamente ', ' kcal por día.');
    this.generarRutinaSemanal(calorias);

    const calProte = calorias * 0.30;
    const calGrasas = calorias * 0.25;
    const calCarbs = calorias * 0.45;

    this.animarConteo('#cal-proteinas', 0, Math.round(calProte), 1000, '', ' kcal');
    this.animarConteo('#gr-proteinas', 0, Math.round(calProte / 4), 1000, '', ' g');

    this.animarConteo('#cal-grasas', 0, Math.round(calGrasas), 1000, '', ' kcal');
    this.animarConteo('#gr-grasas', 0, Math.round(calGrasas / 9), 1000, '', ' g');

    this.animarConteo('#cal-carbs', 0, Math.round(calCarbs), 1000, '', ' kcal');
    this.animarConteo('#gr-carbs', 0, Math.round(calCarbs / 4), 1000, '', ' g');

    (document.getElementById("macros") as HTMLElement).style.display = "block";

    this.mostrarTipAleatorio();
  }

  generarRutinaSemanal(calorias: number): void {
    const ejercicios = [
      'Cardio 30 minutos 🏃‍♀️', 'Fuerza: Tren superior 🏋️‍♂️', 'Yoga y estiramientos 🧘‍♀️',
      'HIIT 20 minutos 🔥', 'Piernas y glúteos 🦵', 'Descanso activo (caminar) 🚶‍♂️', 'Circuito completo 🌀'
    ];

    const desayunos = [
      'Avena con frutas y nueces',
      'Huevos revueltos con pan integral',
      'Smoothie de plátano y espinaca',
      'Tostadas con aguacate y tomate',
      'Yogur natural con granola y frutos rojos'
    ];

    const almuerzos = [
      'Pechuga de pollo con arroz integral y ensalada',
      'Salmón al horno con quinoa y vegetales',
      'Bowl de legumbres con aguacate',
      'Tortilla de espinacas y batata asada',
      'Pollo al curry con arroz y brócoli'
    ];

    const cenas = [
      'Crema de calabaza con pan de centeno',
      'Ensalada con atún y huevo duro',
      'Revuelto de tofu con verduras',
      'Sopa de lentejas y tostadas integrales',
      'Wrap de pollo con vegetales'
    ];

    this.rutinaSemanal = this.diasSemana.map((dia, index) => {
      const desayuno = desayunos[index % desayunos.length];
      const almuerzo = almuerzos[index % almuerzos.length];
      const cena = cenas[index % cenas.length];
      const comidaCalorias = Math.round(calorias * 0.30) + Math.round(calorias * 0.45) + Math.round(calorias * 0.25);

      return {
        dia,
        ejercicio: ejercicios[index % ejercicios.length],
        comida: {
          desayuno,
          almuerzo,
          cena,
          calorias: comidaCalorias
        }
      };
    });
  }

  animarConteo(selector: string, desde: number, hasta: number, duracion: number, prefijo: string = '', sufijo: string = ''): void {
    const elemento = document.querySelector(selector);
    if (!elemento) return;

    const paso = Math.ceil(hasta / (duracion / 30));
    let valorActual = desde;

    const intervalo = setInterval(() => {
      valorActual += paso;
      if (valorActual >= hasta) {
        valorActual = hasta;
        clearInterval(intervalo);
      }
      (elemento as HTMLElement).textContent = `${prefijo}${valorActual}${sufijo}`;
    }, 30);
  }

  mostrarTipAleatorio(): void {
    const randomTip = this.tips[Math.floor(Math.random() * this.tips.length)];
    const tipElement = document.getElementById("tip-text");
    if (tipElement) {
      tipElement.textContent = randomTip;
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

  mostrarErroresAnimadamente(): void {
    let i = 0;
    const intervalo = setInterval(() => {
      if (i < this.erroresNutricion.length) {
        this.erroresVisibles.push(this.erroresNutricion[i]);
        i++;
      } else {
        clearInterval(intervalo);
      }
    }, 800);
  }

  agitarAlertaNutricion(): void {
    const el = document.querySelector('.errores-nutricion-content h1');
    if (el) {
      el.classList.add('vibrar');
    }
  }

  mostrarMotivacion(event: MouseEvent): void {
    const random = Math.floor(Math.random() * this.frasesMotivacion.length);
    this.mensajeMotivacional = this.frasesMotivacion[random];

    const mensajeEl = document.getElementById('motivacionMensaje');
    if (mensajeEl) {
      mensajeEl.classList.add('show');
      setTimeout(() => {
        mensajeEl.classList.remove('show');
      }, 3000);
    }

    this.lanzarConfeti(event);
  }

  lanzarConfeti(event: MouseEvent): void {
    for (let i = 0; i < 12; i++) {
      const emoji = ["🍎", "🏃‍♀️", "💪", "🥦", "🔥"][Math.floor(Math.random() * 5)];
      const confeti = document.createElement("div");
      confeti.className = "confeti";
      confeti.textContent = emoji;

      confeti.style.left = (event.clientX + Math.random() * 60 - 30) + "px";
      confeti.style.top = (event.clientY + Math.random() * 60 - 30) + "px";

      document.body.appendChild(confeti);
      setTimeout(() => confeti.remove(), 1000);
    }
  }
  
}
