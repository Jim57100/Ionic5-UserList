import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserNewPage } from './user-new.page';

const routes: Routes = [
  {
    path: '',
    component: UserNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserNewPageRoutingModule {}
