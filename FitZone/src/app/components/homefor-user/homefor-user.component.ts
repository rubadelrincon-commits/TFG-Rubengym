import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-homefor-user',
  templateUrl: './homefor-user.component.html',
  styleUrl: './homefor-user.component.css'
})
export class HomeforUserComponent implements OnInit {
  nombreUsuario: string = 'Usuario';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Obtener información del usuario actual
      this.authService.getCurrentUser().subscribe({
        next: (user: any) => {
          if (user && user.nombre) {
            this.nombreUsuario = user.nombre;
          }
        },
        error: (error) => {
          console.error('Error al obtener datos del usuario:', error);
        }
      });
    }
  }

  toggleMenu() {
    const menu = document.querySelector('.menu');
    if (menu) {
      menu.classList.toggle('active');
    }
  }

  openPopup() {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'block';
    }
  }

  closePopup() {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'none';
    }
  }

  irALogin() {
    this.router.navigate(['/login']);
  }
}
