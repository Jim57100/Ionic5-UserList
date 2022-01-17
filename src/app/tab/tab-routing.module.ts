import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: 'tab',
    component: TabPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'users',
        loadChildren: () => import('../users-list/users-list.module').then( m => m.UsersListPageModule)
      },
      {
        path: 'geolocation',
        loadChildren: () => import('../geolocation/geolocation.module').then( m => m.GeolocationPageModule)
      },

    ]
  },
  {
    path: '',
    redirectTo: '/tab/home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
