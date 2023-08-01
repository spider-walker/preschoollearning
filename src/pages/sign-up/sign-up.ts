import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	LoadingController,
	Loading,
	AlertController,
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { DbUser } from '../../models/DbUser';
import { UsersProvider } from '../../providers/users/users';

@IonicPage()
@Component({
	selector: 'page-sign-up',
	templateUrl: 'sign-up.html',
})
export class SignupPage {
	public signupForm: FormGroup;
	public loading: Loading;

	constructor(
		public nav: NavController,
		public authData: AuthProvider,
		public formBuilder: FormBuilder,
		public loadingCtrl: LoadingController,
		public firebaseProvider: UsersProvider,
		public alertCtrl: AlertController
	) {
		this.signupForm = formBuilder.group({
			name: [
				'',
				Validators.compose([Validators.required, Validators.minLength(10)]),
			],
			email: [
				'',
				Validators.compose([Validators.required, EmailValidator.isValid]),
			],
			password: [
				'',
				Validators.compose([Validators.minLength(6), Validators.required]),
			],
		});
	}

	signupUser() {
		if (!this.signupForm.valid) {
			console.log(this.signupForm.value);
		} else {
			let my_this = this;
			this.authData
				.signupUser(this.signupForm.value.email, this.signupForm.value.password)
				.then(
					() => {
						let dbUser: DbUser = {
							parent_id: new Date().getTime(),
							name: this.signupForm.value.name,
							username: this.signupForm.value.email,
							password: '123456',
							is_admin: 1,
						};
						let s = this.firebaseProvider
							.getDbUsers()
							.subscribe((snapshots) => {
								if (snapshots.length > 0) {
									dbUser.is_admin = 0;
								}
								my_this.firebaseProvider.addDbUser(dbUser);
								s.unsubscribe();
							});

						this.nav.setRoot('HomePage');
					},
					(error) => {
						this.loading.dismiss().then(() => {
							var errorMessage: string = error.message;
							let alert = this.alertCtrl.create({
								message: errorMessage,
								buttons: [
									{
										text: 'Ok',
										role: 'cancel',
									},
								],
							});
							alert.present();
						});
					}
				);

			this.loading = this.loadingCtrl.create({
				dismissOnPageChange: true,
			});
			this.loading.present();
		}
	}
}
