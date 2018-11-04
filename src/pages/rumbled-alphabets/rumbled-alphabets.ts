import {Component, ElementRef, Input} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {DragulaService} from 'ng2-dragula';
import {Subscription} from 'rxjs';

@IonicPage()
@Component({
    selector: 'page-rumbled-alphabets',
    templateUrl: 'rumbled-alphabets.html',
})
export class RumbledAlphabetsPage {
    q1 = [];
    q2 = [];
    subs = new Subscription();
    constructor(
        private navController: NavController,
        public alertCtrl: AlertController,
        private dragulaService: DragulaService) {
        for (var i = 0; i < 20; i++) {
            this.q1.push("1. <" + i + ">");
            this.q2.push("2. <" + i + ">");
        }

        dragulaService.drop().subscribe((value) => {
            let alert = this.alertCtrl.create({
                title: 'Item moved',
                subTitle: 'So much fun!',
                buttons: ['OK']
            });
            alert.present();
        });
    }
}
