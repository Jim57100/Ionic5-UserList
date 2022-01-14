import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserNewPageRoutingModule } from './user-new-routing.module';

import { UserNewPage } from './user-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserNewPageRoutingModule
  ],
  declarations: [UserNewPage]
})
export class UserNewPageModule {}
