import { Routes } from '@angular/router';
import { UserFormComponent } from './components/user-form/user-form';
import { UserListComponent } from './components/user-list/user-list';

export const routes: Routes = [
  { path: 'cadastro', component: UserFormComponent },
  { path: 'cadastro/:id', component: UserFormComponent },
  { path: 'usuario', component: UserListComponent },
  { path: '', redirectTo: 'cadastro', pathMatch: 'full' },
];
