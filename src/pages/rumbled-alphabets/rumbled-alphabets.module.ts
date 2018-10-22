import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RumbledAlphabetsPage } from './rumbled-alphabets';

@NgModule({
  declarations: [
    RumbledAlphabetsPage,
  ],
  imports: [
    IonicPageModule.forChild(RumbledAlphabetsPage),
  ],
})
export class RumbledAlphabetsPageModule {}
