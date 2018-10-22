import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsersViewPage } from './users-view';

@NgModule({
  declarations: [
    UsersViewPage,
  ],
  imports: [
    IonicPageModule.forChild(UsersViewPage),
  ],
})
export class UsersViewPageModule {}
