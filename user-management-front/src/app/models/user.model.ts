export interface User {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
}

export interface ApiResponse<T> {
  mensagem: string;
  dados: T;
}
