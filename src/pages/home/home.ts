import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, } from 'ionic-angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthProvider} from '../../providers/auth/auth';
import {UsersProvider} from '../../providers/users/users';
@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {
    is_admin: boolean = false;
    constructor(

        public navCtrl: NavController,
        public navParams: NavParams,
        public authData: AuthProvider,
        public firebaseProvider: UsersProvider,
        public fAuth: AngularFireAuth) {
        try {
            console.log(this.fAuth.auth.currentUser.email);
            let s = this.firebaseProvider.getDbUsers().subscribe(snapshots => {
                snapshots.forEach(snapshot => {
                    console.log(snapshot.is_admin);
                    if (snapshot.username == this.fAuth.auth.currentUser.email) {
                        console.log(snapshot.is_admin);
                        if (snapshot.is_admin == 1) {
                            this.is_admin = true;
                        }
                    }
                });
                s.unsubscribe();
            });
        } catch (e) {

        }
    }
    goToOtherPage(page) {
        this.navCtrl.setRoot(page);
    }

}
