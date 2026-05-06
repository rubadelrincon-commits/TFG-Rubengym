import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'auth_token';
  private userSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    // Intentar recuperar el token al iniciar el servicio
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.getCurrentUser().subscribe();
    }
  }

  // Método para registrar un usuario
  register(registerData: { nombre: string; email: string; contrasena: string }): Observable<string> {
    return this.http.post(`${this.apiUrl}/register`, registerData, { responseType: 'text' });
  }

  // Método para iniciar sesión
  login(loginData: { email: string; contrasena: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      tap(response => {
        if (response.token) {
          //console.log('Token recibido:', response.token); // Añadimos esta línea
          localStorage.setItem(this.tokenKey, response.token);
          this.getCurrentUser().subscribe();
        }
      })
    );
  }

  // Método para obtener datos del usuario actual
  getCurrentUser(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/user`, { headers }).pipe(
      tap(user => {
        this.userSubject.next(user);
      })
    );
  }

  // Método para cerrar sesión
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem(this.tokenKey);
        this.userSubject.next(null);
      })
    );
  }

  // Obtener el token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Obtener el usuario actual como Observable
  getUser() {
    return this.userSubject.asObservable();
  }

  getAllUsers(): Observable<any[]> {
    const token = this.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Accept', 'application/json');
    return this.http.get<any[]>(`${this.apiUrl}/users`, { headers });
  }

  updateUser(id: number, userData: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    return this.http.put<any>(`${this.apiUrl}/users/${id}`, userData, { headers });
  }

  deleteUser(id: number) {
    return this.http.delete<{message: string}>(`${this.apiUrl}/users/${id}`);
  }

  createUser(userData: any): Observable<any> {
    const url = `${this.apiUrl}/newUser`;
    const token = this.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    return this.http.post(url, userData, { headers });
  }

  getUserRole(): string | null {
    const user = this.userSubject.getValue();
    return user ? user.rol : null;
  }

  isAdmin(): boolean {
    const user = this.userSubject.getValue();
    //console.log('Usuario actual:', user);
    if (user && user.rol === 'ROLE_ADMIN') {
      //console.log('El usuario es admin');
      return true;
    }
    //console.log('El usuario no es admin');
    return false;
  }

  updateUserPassword(userId: number, passwordData: {currentPassword: string, newPassword: string}): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    // Asegurarse de que los datos están en el formato correcto
    const payload = {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    };

    return this.http.put(`${this.apiUrl}/users/${userId}/password`, payload, { headers });
  }

  // Método específico para que los administradores actualicen contraseñas
  adminUpdateUserPassword(userId: number, newPassword: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    return this.http.put(
      `${this.apiUrl}/admin/users/${userId}/password`,
      { newPassword: newPassword },
      { headers }
    );
  }

}
