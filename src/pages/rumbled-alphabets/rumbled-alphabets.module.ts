import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RumbledAlphabetsPage } from './rumbled-alphabets';
import { DragulaModule, DragulaService } from "ng2-dragula"
@NgModule({
  declarations: [
    RumbledAlphabetsPage,
  ],
  imports: [
    IonicPageModule.forChild(RumbledAlphabetsPage),
    DragulaModule.forRoot(),
  ],
    providers:[DragulaService]
})
export class RumbledAlphabetsPageModule {}
