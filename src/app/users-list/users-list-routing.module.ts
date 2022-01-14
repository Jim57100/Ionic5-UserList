import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersListPage } from './users-list.page';

const routes: Routes = [
  {
    path: '',
    component: UsersListPage
  },
  {
    path: 'new',
    loadChildren: () => import('./user-new/user-new.module').then( m => m.UserNewPageModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersListPageRoutingModule {}
