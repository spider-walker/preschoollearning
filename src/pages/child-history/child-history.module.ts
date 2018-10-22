import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChildHistoryPage } from './child-history';

@NgModule({
  declarations: [
    ChildHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ChildHistoryPage),
  ],
})
export class ChildHistoryPageModule {}
