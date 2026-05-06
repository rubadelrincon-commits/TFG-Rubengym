import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initTestimonialSlider();
  }

  toggleMenu(): void {
    const menu = document.querySelector('.menu');
    if (menu) {
      menu.classList.toggle('active');
    }
  }

  togglePricing(option: string): void {
    document.querySelectorAll<HTMLElement>('.plan').forEach(plan =>
      plan.classList.remove('active')
    );
    document.querySelectorAll<HTMLElement>(`.${option}`).forEach(plan =>
      plan.classList.add('active')
    );
  }

  initTestimonialSlider(): void {
    const slides = document.querySelectorAll<HTMLElement>('.slide');
    let index = 0;

    setInterval(() => {
      slides.forEach(slide => slide.classList.remove('active'));
      index = (index + 1) % slides.length;
      slides[index].classList.add('active');
    }, 4000); // cambia cada 4 segundos
  }
}
