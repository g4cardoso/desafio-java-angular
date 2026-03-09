import { TestBed } from '@angular/core/testing';

import { UserService } from './user';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

describe('User', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mock = { id: 1, nome: 'John', email: 'teste@teste.com', senha: '123' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('buscar o id do usuario', () => {
    service.buscarPorId(1).subscribe((user) => {
      expect(user.dados.nome).toBe('John');
    });

    const result = httpMock.expectOne('/api/usuarios/1');
    expect(result.request.method).toBe('GET');
    result.flush({ dados: mock });
  });

  it('cadastrar um novo usuario(POST)', () => {
    service.salvar(mock).subscribe((res) => {
      expect(res.mensagem).toBe('Usuário cadastrado com sucesso');
    });

    const req = httpMock.expectOne('/api/usuarios');
    expect(req.request.method).toBe('POST');
    req.flush({ mensagem: 'Usuário cadastrado com sucesso' });
  });

  it('tualizar os dados do usuario (PUT)', () => {
    service.atualizar(1, mock).subscribe((res) => {
      expect(res.status).toBe(200); //
    });

    const req = httpMock.expectOne('/api/usuarios/1');
    expect(req.request.method).toBe('PUT');
    req.flush({ status: 200 });
  });

  it('deve excluir um usuário pelo ID (DELETE)', () => {
    service.deletar(1).subscribe((res) => {
      expect(res).toBeTruthy(); //
    });

    const req = httpMock.expectOne('/api/usuarios/1');
    expect(req.request.method).toBe('DELETE'); //
    req.flush({ sucesso: true });
  });
});
