import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiResponse<T> {
  mensagem: string;
  dados: T;
}

export interface User {
  id?: number;
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API = '/api/usuarios';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<User[]> {
    return this.http.get<User[]>(this.API);
  }

  salvar(usuario: User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(this.API, usuario);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  buscarPorId(id: number): Observable<any> {
    return this.http.get<ApiResponse<User>>(`${this.API}/${id}`);
  }

  atualizar(id: number, usuario: User): Observable<any> {
    return this.http.put<ApiResponse<User>>(`${this.API}/${id}`, usuario);
  }
}
