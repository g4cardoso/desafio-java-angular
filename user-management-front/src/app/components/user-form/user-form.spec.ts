import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form';
import { UserService } from '../../services/user';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormComponent],
      providers: [
        UserService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        // Mock do ActivatedRoute para simular parâmetros de URL
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => null } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.form.value).toEqual({ nome: '', email: '', senha: '' });
  });

  it('deve chamar o serviço de salvar quando o formulário for válido', () => {

    const mockResponse = {
      mensagem: 'Sucesso',
      dados: { id: 1, nome: 'Gabriel', email: 'gabriel@teste.com' }, // O campo 'dados' é obrigatório!
    };
    const spy = vi.spyOn(userService, 'salvar').mockReturnValue(of(mockResponse));

    // Preenchemos o formulário
    component.form.setValue({
      nome: 'Gabriel Cardoso',
      email: 'gabriel@teste.com',
      senha: '123',
    });

    component.salvar();

    expect(spy).toHaveBeenCalled();
  });
});
