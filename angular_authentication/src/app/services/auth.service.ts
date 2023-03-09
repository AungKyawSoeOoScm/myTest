import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  roleAs!: string;
  constructor(private router: Router) { }
  getRoles() {
    this.roleAs = localStorage.getItem('ROLE')!;
    return this.roleAs;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['login']);
  }
  setRole(r: string) {
    localStorage.setItem('role', r)
  }
  getRole(): string | null {
    return localStorage.getItem('role')
  }

  login({ email, password }: any): Observable<any> {
    if (email === 'admin@gmail.com' && password === 'admin123') {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      this.setRole('admin');
      return of({ name: 'admin', email: 'admin@gmail.com', role: this.getRole });
    } else if (email === 'user@gmail.com' && password === 'user123') {
      this.setRole('user');
      this.setToken('acbdetyhiuilryrbgrstuvwerz');
      return of({ name: 'user', email: 'user@gmail.com', role: this.getRole });
    }
    return throwError(new Error('Failed to login'));
  }
}
