import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountNumbersPage } from './count-numbers';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
	declarations: [CountNumbersPage],
	imports: [
		IonicPageModule.forChild(CountNumbersPage),
		DragulaModule.forRoot(),
	],
})
export class CountNumbersPageModule {}
