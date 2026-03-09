import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User, UserService } from '../../services/user';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserFormComponent implements OnInit {
  idEdicaoUsuario: number | null = null;
  form: FormGroup;
  carregando = false;

  mensageSucesso: string = '';

  tituloPagina = 'Novo Usuário';
  textoBotao = 'Cadastrar Usuário';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmacaoSenha: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    if (this.idEdicaoUsuario) {
      this.form.get('email')?.disable();
    }
    if (id) {
      this.idEdicaoUsuario = +id;
      this.tituloPagina = 'Editar Usuário';
      this.textoBotao = 'Salvar Alterações';
      this.form.get('email')?.disable();
      this.preencherDadosEdicao(this.idEdicaoUsuario);
    }
  }

  salvar(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.carregando = true;

      const operacao = this.idEdicaoUsuario
        ? this.userService.atualizar(this.idEdicaoUsuario, this.form.getRawValue())
        : this.userService.salvar(this.form.getRawValue());

      operacao.subscribe({
        next: (res: any) => {
          this.carregando = false;
          Swal.fire({
            title: 'Sucesso!',
            text: res.mensagem,
            icon: 'success',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              const rota = this.idEdicaoUsuario ? '/usuario' : '/cadastro';
              this.router.navigate([rota]);
            }
          });
        },
        error: (err) => {
          console.log(err);
          this.carregando = false;

          this.form.patchValue({
            senha:'',
            confirmacaoSenha:"",
          })
          this.cdr.detectChanges();
          Swal.fire('Erro!', err.error?.message || 'Falha ao cadastrar', 'error');
        },
      });
    }
  }

  preencherDadosEdicao(id: number) {
    this.userService.buscarPorId(id).subscribe({
      next: (res: any) => {
        this.form.patchValue(res.dados);
      },
    });
  }
}
