import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WhoAmIPage } from './who-am-i';

@NgModule({
  declarations: [
    WhoAmIPage,
  ],
  imports: [
    IonicPageModule.forChild(WhoAmIPage),
  ],
})
export class WhoAmIPageModule {}
