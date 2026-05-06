import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any = null;
  editMode: boolean = false;
  editedUser: any = {
    currentPassword: '',
    newPassword: ''
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile() {
    const token = this.authService.getToken();
    //console.log('Token actual:', token);

    if (!token) {
      //console.error('No hay token disponible');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get('http://localhost:8080/api/auth/user', { headers })
      .subscribe({
        next: (data) => {
          this.userData = data;
          //console.log('Datos del usuario:', data);
        },
        error: (error) => {
          console.error('Error completo:', error);
        }
      });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.editedUser = { ...this.userData };
    }
  }

  updateProfile() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const userId = this.userData.id;

    const updateData: any = {
      nombre: this.editedUser.nombre,
      email: this.editedUser.email
    };

    // Validar si hay nuevas contraseñas
    if (this.editedUser.currentPassword && this.editedUser.newPassword) {
      // Primero actualizar la contraseña
      const passwordData = {
        currentPassword: this.editedUser.currentPassword.trim(),
        newPassword: this.editedUser.newPassword.trim()
      };

      this.http.put(`http://localhost:8080/api/auth/users/${userId}/password`,
        passwordData,
        { headers }
      ).subscribe({
        next: () => {
          // Si la contraseña se actualizó correctamente, actualizamos el resto del perfil
          this.updateUserData(userId, updateData, headers, true);
        },
        error: (error) => {
          //console.error('Error al actualizar la contraseña:', error);
          alert('Error al actualizar la contraseña: ' + error);
        }
      });
    } else {
      // Si no hay cambio de contraseña, solo actualizamos los datos del perfil
      this.updateUserData(userId, updateData, headers, false);
    }
  }

  private updateUserData(userId: string, updateData: any, headers: HttpHeaders, passwordChanged: boolean) {
    this.http.put(`http://localhost:8080/api/auth/users/${userId}`, updateData, { headers })
      .subscribe({
        next: (response) => {
          this.userData = response;
          this.editMode = false;

          if (passwordChanged) {
            alert('Perfil y contraseña actualizados correctamente. Por favor, inicie sesión de nuevo.');
            this.authService.logout().subscribe({
              next: () => this.router.navigate(['/login']),
              error: () => this.router.navigate(['/login'])
            });
          } else {
            alert('Perfil actualizado correctamente.');
          }
        },
        error: (error) => {
          //console.error('Error al actualizar el perfil:', error);
          alert('Error al actualizar el perfil');
        }
      });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/home']);

      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
      }
    });
  }
}
