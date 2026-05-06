import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ HttpClientModule, CommonModule, RouterModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Suscribirse a los cambios del usuario
    this.authService.getUser().subscribe(user => {
      this.isAdmin = user?.rol === 'ROLE_ADMIN';
      //console.log('Es admin:', this.isAdmin);
    });
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

  irAPerfil() {
    this.router.navigate(['/profile']);
  }
}
