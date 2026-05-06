import { Component } from '@angular/core';

@Component({
  selector: 'app-planespersonalizados',
  imports: [],
  templateUrl: './planespersonalizados.component.html',
  styleUrl: './planespersonalizados.component.css'
})
export class PlanespersonalizadosComponent {
   toggleMenu() {
    const menu = document.querySelector('.menu');
    if (menu) {
      menu.classList.toggle('active');
    }
  }

}
