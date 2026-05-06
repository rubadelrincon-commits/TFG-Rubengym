import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  editingUser: any = null;
  creandoUsuario = false;
  nuevoUsuario = {
    nombre: '',
    email: '',
    contrasena: '',
    rol: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {

    this.loadUsers();
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe({
      next: (users) => {
        if (Array.isArray(users)) {
          this.users = users;
        } else {
          //console.error('La respuesta no es un array:', users);
          this.users = [];
        }
      },
      error: (err) => {
        console.error('Error cargando usuarios:', err);
        if (err.status === 401) {
          this.router.navigate(['/login']);
        } else {
          alert('Error al cargar los usuarios. Por favor, inténtelo de nuevo.');
        }
      }
    });
  }

  editUser(user: any) {
    this.editingUser = {...user};
  }

  cancelEdit() {
    this.editingUser = null;
  }

  saveUser() {
    if (this.editingUser) {
      if (this.editingUser.newPassword !== undefined) {
        const newPassword = this.editingUser.newPassword.trim();

        if (!newPassword) {
          alert('La nueva contraseña no puede estar vacía');
          return;
        }

        this.authService.adminUpdateUserPassword(
          this.editingUser.id,
          newPassword
        ).subscribe({
          next: () => {
            // Después de actualizar la contraseña exitosamente
            alert('Contraseña actualizada correctamente');
            this.updateUserDetails();
          },
          error: (err) => {
            //console.error('Error actualizando contraseña:', err);
            const errorMessage = err.error?.message || 'Error al actualizar la contraseña';
            alert(errorMessage);
          }
        });
      } else {
        this.updateUserDetails();
      }
    }
  }

  private updateUserDetails() {
    // Creamos una copia sin el campo de nueva contraseña
    const userUpdate = {
      nombre: this.editingUser.nombre,
      email: this.editingUser.email,
      rol: this.editingUser.rol
    };

    this.authService.updateUser(this.editingUser.id, userUpdate).subscribe({
      next: (response) => {
        const index = this.users.findIndex(u => u.id === this.editingUser.id);
        if (index !== -1) {
          this.users[index] = { ...this.users[index], ...userUpdate };
        }
        this.editingUser = null;
        alert('Usuario actualizado correctamente');
      },
      error: (err) => {
        console.error('Error actualizando usuario:', err);
        alert('Error al actualizar el usuario');
      }
    });
  }

  deleteUser(id: number) {
    if (!confirm('¿Está seguro de que desea eliminar este usuario?')) {
      return;
    }

    this.authService.deleteUser(id).subscribe({
      next: () => {
        // Actualizar la lista local sin importar la respuesta del servidor
        this.users = this.users.filter(user => user.id !== id);
        alert('Usuario eliminado correctamente');
      },
      error: (error) => {
        //console.error('Error al eliminar usuario:', error);
        // Si el error es de parsing JSON pero el usuario fue eliminado
        if (error instanceof SyntaxError || error.status === 200) {
          this.users = this.users.filter(user => user.id !== id);
          alert('Usuario eliminado correctamente');
        } else {
          alert('Error al eliminar el usuario. Por favor, intente de nuevo.');
        }
      }
    });
  }

  mostrarFormularioCreacion() {
    this.creandoUsuario = true;
  }

  cancelarCreacion() {
    this.creandoUsuario = false;
    this.nuevoUsuario = {
      nombre: '',
      email: '',
      contrasena: '', 
      rol: 'ROLE_CLIENTE'
    };
  }

  crearUsuario() {
    this.authService.createUser(this.nuevoUsuario).subscribe({
      next: () => {
        this.loadUsers();
        this.cancelarCreacion();
      },
      //console.error('Error al crear usuario:', error)
    });
  }

  irAPerfil() {
    this.router.navigate(['/profile']);
  }
}
