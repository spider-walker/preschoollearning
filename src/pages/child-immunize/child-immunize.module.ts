import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChildImmunizePage } from './child-immunize';

@NgModule({
  declarations: [
    ChildImmunizePage,
  ],
  imports: [
    IonicPageModule.forChild(ChildImmunizePage),
  ],
})
export class ChildImmunizePageModule {}
