import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class RegisterComponent {
  nombre: string = '';
  email: string = '';
  contrasena: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const registerData = {
      nombre: this.nombre,
      email: this.email,
      contrasena: this.contrasena,
    };

    this.authService.register(registerData).subscribe({
      next: (response) => {
        alert('Usuario registrado exitosamente. Por favor, inicia sesión.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // El backend devuelve texto plano en caso de error
        const mensaje = err.error || err.message || 'Error desconocido al registrar';
        alert('El registro falló: ' + mensaje);
      },
    });
  }
}
