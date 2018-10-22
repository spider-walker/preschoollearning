import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, Loading, AlertController, } from 'ionic-angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {UsersProvider} from '../../providers/users/users';
import {DbUser} from '../../models/DbUser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthProvider} from '../../providers/auth/auth';
import {EmailValidator} from '../../validators/email';
import {Observable} from 'rxjs';
@IonicPage()
@Component({
    selector: 'page-users-add',
    templateUrl: 'users-add.html',
})
export class UsersAddPage {
    dbusers: Observable<DbUser[]>;
    loginForm: FormGroup;
    loading: Loading;

    constructor(
        public navCtrl: NavController,
        public authData: AuthProvider,
        public formBuilder: FormBuilder,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public navParams: NavParams,
        public fAuth: AngularFireAuth,
        public firebaseProvider: UsersProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UsersAddPage');
    }
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            name: ['', Validators.compose([Validators.minLength(10), Validators.required]),],
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid]),],
        });
    }

    addItem() {
        if (!this.loginForm.valid) {
            console.log(this.loginForm.value);
        } else {
            let dbUser: DbUser = {
                parent_id: new Date().getTime(),
                name: this.loginForm.value.name,
                username: this.loginForm.value.email,
                password: '123456',
                is_admin: 0
            };
            console.log(dbUser);
            try {
                this.firebaseProvider.addDbUser(dbUser);
                this.navCtrl.setRoot('UsersListPage')
            } catch (e) {
                console.log(e);
            }
        }
    }


}
