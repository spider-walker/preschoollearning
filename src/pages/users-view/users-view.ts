import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	AlertController,
} from 'ionic-angular';
import { DbUser, Children, Immunization } from '../../models/DbUser';
import { UsersProvider } from '../../providers/users/users';
import { ChildrenProvider } from '../../providers/children/children';
import { ImmunizationProvider } from '../../providers/immunization/immunization';

@IonicPage()
@Component({
	selector: 'page-users-view',
	templateUrl: 'users-view.html',
})
export class UsersViewPage {
	parent_id: any;
	user: DbUser;
	childrens: Children[];
	constructor(
		public navCtrl: NavController,
		public usersProvider: UsersProvider,
		public childrenProvider: ChildrenProvider,
		public immunizationProvider: ImmunizationProvider,
		public alertCtrl: AlertController,
		public navParams: NavParams
	) {
		this.parent_id = this.navParams.get('parent_id');
		let my_this = this;
		this.usersProvider.getDbUser(this.parent_id).subscribe((snapshots) => {
			snapshots.forEach((snapshot) => {
				my_this.user = snapshot;
			});
		});

		my_this.childrens = [];
		this.childrenProvider
			.getParentChildrens(this.parent_id)
			.subscribe((snapshots) => {
				snapshots.forEach((snapshot) => {
					snapshot.immunization = [];
					my_this.immunizationProvider
						.getParentImmunizations(snapshot.child_id)
						.subscribe((snapshots_im) => {
							snapshots_im.forEach((snapshot_im) => {
								snapshot.immunization.push(snapshot_im);
							});
						});
					my_this.childrens.push(snapshot);
				});
			});
	}

	add_children() {
		this.navCtrl.setRoot('ChildAddPage');
	}
	send_reminder() {}
	scheduleImmunization(child: Children) {
		const prompt = this.alertCtrl.create({
			title: 'Immunization',
			message: 'Schedule an Immunization',
			inputs: [
				{ name: 'title', placeholder: 'Description' },
				{ name: 'scheduled_date', placeholder: 'Scheduled Date' },
			],
			buttons: [
				{
					text: 'Cancel',
					handler: (data) => {
						console.log('Cancel clicked');
					},
				},
				{
					text: 'Save',
					handler: (data) => {
						let immunization: Immunization = {
							immunization_id: new Date().getTime(),
							name: data.title,
							scheduled_date: data.scheduled_date,
							administered_date: '',
							height: 0,
							weight: 0,
							child_id: child.child_id,
							done_by: 1,
						};
						console.log(immunization);
						try {
							this.immunizationProvider.addImmunization(immunization);
						} catch (e) {
							console.log(e);
						}

						console.log(data);
					},
				},
			],
		});
		prompt.present();
	}
}
