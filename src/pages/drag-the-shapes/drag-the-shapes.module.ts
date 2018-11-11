import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DragTheShapesPage } from './drag-the-shapes';

@NgModule({
  declarations: [
    DragTheShapesPage,
  ],
  imports: [
    IonicPageModule.forChild(DragTheShapesPage),
  ],
})
export class DragTheShapesPageModule {}
