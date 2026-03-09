import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../../services/user';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { UserFormComponent } from './user-form';


Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // depreciado
    removeListener: vi.fn(), // depreciado
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
describe('UserFormComponent - Fluxo de Cadastro', () => {
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
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {} },
          },
        },
        {
          provide: Router,
          useValue: { navigate: vi.fn() },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);

    fixture.detectChanges();
  });

  it('tela vazia', () => {
    expect(component).toBeTruthy();
    expect(component.form.getRawValue()).toEqual({
      nome: '',
      email: '',
      senha: '',
      confirmacaoSenha: '',
    });
  });

  it('cadastrar usuario', () => {
    const mockResponse = {
      mensagem: 'Usuário cadastrado com sucesso',
      dados: {
        id: 1,
        nome: 'Gabriel Cardoso',
        email: 'gabriel@teste.com',
      },
    };
    const spySalvar = vi.spyOn(userService, 'salvar').mockReturnValue(of(mockResponse));

    component.form.patchValue({
      nome: 'Gabriel Cardoso',
      email: 'gabriel@teste.com',
      senha: 'password123',
      confirmacaoSenha: 'password123',
    });

    expect(component.form.valid).toBe(true);

    component.salvar();

    expect(spySalvar).toHaveBeenCalledTimes(1);
    expect(spySalvar).toHaveBeenCalledWith(component.form.getRawValue());
  });
});
