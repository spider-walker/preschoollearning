import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, } from 'ionic-angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthProvider} from '../../providers/auth/auth';
@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public authData: AuthProvider,
        public fAuth: AngularFireAuth, ) {
        try {
            console.log(this.fAuth.auth.currentUser.email);
        } catch (e) {

        }
    }
    goToOtherPage(page) {
        this.navCtrl.setRoot(page);
    }

}
