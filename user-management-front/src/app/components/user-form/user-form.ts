import { Component, OnInit } from '@angular/core';
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
  idUsuarioEdicao: number | null = null;
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
    if (this.idUsuarioEdicao) {
      this.form.get('email')?.disable();
    }
    if (id) {
      this.idUsuarioEdicao = +id;
      this.tituloPagina = 'Editar Usuário';
      this.textoBotao = 'Salvar Alterações';
      this.form.get('email')?.disable();
      this.preencherDadosEdicao(this.idUsuarioEdicao);
    }
  }

  salvar(): void {
    if (this.form.valid) {
      this.carregando = true;

      const operacao = this.idUsuarioEdicao
        ? this.userService.atualizar(this.idUsuarioEdicao, this.form.value)
        : this.userService.salvar(this.form.value);

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
              if (this.idUsuarioEdicao) {
                this.router.navigate(['/usuario']).then(() => {
                  this.carregando = false;
                  window.location.reload();
                });
              } else {
                this.router.navigate(['/cadastro']).then(() => {
                  this.carregando = false;
                  window.location.reload();
                });
              }
            }
          });
        },
        error: (err) => {
          console.log(err);
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
