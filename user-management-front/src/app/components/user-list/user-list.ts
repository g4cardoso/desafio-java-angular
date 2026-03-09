import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User, UserService } from '../../services/user';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  imports: [RouterModule, FormsModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserListComponent implements OnInit {
  usuarios: User[] = [];
  usuariosOriginal: User[] = [];
  filtroNome: string = '';

  constructor(
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.carregarUsuarios();
    console.log('Componente de lista carregado!');
  }

  carregarUsuarios() {
    this.userService.listarTodos().subscribe({
      next: (resultado: any) => {
        const dados = resultado;
        this.usuarios = dados;
        this.usuariosOriginal = dados;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.log('Erro ao buscar usuarios.', error);
      },
    });
  }

  filtrarUsuarios() {
    const nome = this.filtroNome.toLowerCase();
    this.usuarios = this.usuariosOriginal.filter((dado) => dado.nome.toLowerCase().includes(nome));
  }

  editarUsuario(usuario: User) {
    console.log(usuario);
    this.router.navigate(['/cadastro', usuario.id]);
  }

  deletarUsuario(id: number,nome:String) {
    this.changeDetectorRef.detectChanges();
    Swal.fire({
      title: 'Tem certeza?',
      text: `Você deseja excluir o usuário ${nome}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deletar(id).subscribe(() => {
          Swal.fire('Excluído!', 'O usuário foi removido com sucesso.', 'success');
          this.carregarUsuarios();
        },
          error => {
            Swal.fire('Erro!', 'Não foi possível excluir o usuário.', 'error');
          });
      }
    });
  }
}
