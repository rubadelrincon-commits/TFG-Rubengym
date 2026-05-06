import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Agrega HttpClientModule a los imports
})
export class LoginComponent {
  email: string = '';
  contrasena: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const loginData = {
      email: this.email,
      contrasena: this.contrasena,
    };

    this.authService.login(loginData).subscribe({
      next: (response: any) => {
        //console.log('Respuesta completa:', response);

        // Esperar a que se obtenga la información del usuario
        this.authService.getCurrentUser().subscribe({
          next: (user: any) => {
            //console.log('Información del usuario:', user);

            if (user && user.rol === 'ROLE_ADMIN') {
              //console.log('Redirigiendo a admin - ROL:', user.rol);
              this.router.navigate(['/admin']).then(() => {
                alert('Usuario autenticado correctamente como administrador');
              });
            } else {
              //console.log('Redirigiendo a profile - ROL:', user.rol);
              this.router.navigate(['/homefor-user']).then(() => {
                alert('Usuario autenticado correctamente');
              });
            }
          },
          error: (err) => {
            //console.error('Error obteniendo información del usuario:', err);
            this.router.navigate(['/profile']);
          }
        });
      },
      error: (err) => {
        //console.error('Error en login:', err);
        alert('Error en el inicio de sesión. Por favor, verifique sus credenciales.');
      },
    });
  }
}
