import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DragTheShapesPage } from './drag-the-shapes';
import {FaIconComponent} from "../../components/fa.icon.component/fa.icon.component";
@NgModule({
  declarations: [
    DragTheShapesPage,
    FaIconComponent,
  ],
  imports: [
    IonicPageModule.forChild(DragTheShapesPage),
  ],
})
export class DragTheShapesPageModule {}
