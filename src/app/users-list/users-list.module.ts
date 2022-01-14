import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersListPageRoutingModule } from './users-list-routing.module';

import { UsersListPage } from './users-list.page';
import { UserNewPipe } from './user-new.pipe';
import { UserPipe } from './user.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersListPageRoutingModule
  ],
  declarations: [UsersListPage, UserNewPipe, UserPipe]
})
export class UsersListPageModule {}
