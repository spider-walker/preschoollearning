import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	Loading,
	AlertController,
} from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsersProvider } from '../../providers/users/users';
import { DbUser } from '../../models/DbUser';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs';
@IonicPage()
@Component({
	selector: 'page-users-list',
	templateUrl: 'users-list.html',
})
export class UsersListPage {
	dbusers: Observable<DbUser[]>;
	loading: Loading;
	constructor(
		public navCtrl: NavController,
		public authData: AuthProvider,
		public fAuth: AngularFireAuth,
		public alertCtrl: AlertController,
		public usersProvider: UsersProvider
	) {
		try {
			this.dbusers = this.usersProvider.getDbUsers();
		} catch (e) {}
	}
	add_member() {
		this.navCtrl.setRoot('UsersAddPage');
	}
	delete_parent(user: DbUser) {
		const prompt = this.alertCtrl.create({
			title: '',
			message: 'Are you sure want to remote member' + user.name + '?',
			buttons: [
				{
					text: 'Cancel',
					handler: (data) => {
						console.log('Cancel clicked');
					},
				},
				{
					text: 'Yes',
					handler: (data) => {
						// this.usersProvider.deleteDbUser(user);
					},
				},
			],
		});
		prompt.present();
	}
	view_parent(user: DbUser) {
		this.navCtrl.setRoot('UsersViewPage', { user: user });
	}
}
