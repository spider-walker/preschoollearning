import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountNumbersPage } from './count-numbers';

@NgModule({
  declarations: [
    CountNumbersPage,
  ],
  imports: [
    IonicPageModule.forChild(CountNumbersPage),
  ],
})
export class CountNumbersPageModule {}
