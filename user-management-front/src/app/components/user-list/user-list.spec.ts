import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UserListComponent } from './user-list';
import { UserService } from '../../services/user';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';


Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;

  const mockUsuarios = [
    { id: 1, nome: 'Gabriel', email: 'gabriel@email.com' },
    { id: 2, nome: 'Jessyka', email: 'jessyka@email.com' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [UserService, provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
  });

  it('criacao do componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar a lista de usuários na tabela', () => {
    vi.spyOn(userService, 'listarTodos').mockReturnValue(of(mockUsuarios));

    component.ngOnInit();
    fixture.detectChanges();

    const linhas = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(linhas.length).toBe(2);
    expect(linhas[0].textContent).toContain('Gabriel');
  });



  it('deve chamar o método deletar ao clicar no botão excluir', async () => {
    const spy = vi.spyOn(component, 'deletarUsuario');

    component.usuarios = [{ id: 10, nome: 'Teste', email: 'teste@email.com' }];
    fixture.detectChanges();
    await fixture.whenStable();

    const botaoExcluir = fixture.nativeElement.querySelector('.btn-delete');

    botaoExcluir.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(spy).toHaveBeenCalledWith(10, 'Teste');
  });
});
