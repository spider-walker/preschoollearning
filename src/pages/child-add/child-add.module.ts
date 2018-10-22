import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChildAddPage } from './child-add';

@NgModule({
  declarations: [
    ChildAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ChildAddPage),
  ],
})
export class ChildAddPageModule {}
