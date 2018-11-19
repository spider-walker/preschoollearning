import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-who-am-i',
    templateUrl: 'who-am-i.html',
})
export class WhoAmIPage {
    public whoami: string = 'doctor';
    public answer: string;
    public careers = ['astronaut', 'doctor', 'farmer', 'nurse', 'tailor', 'carpenter', 'driver', 'fisherman', 'pilot'];
    public pox_whoami = 0;
    public score_whoami = 0;
    public answers: Array<string> = [];
    constructor(public alertCtrl: AlertController,
        public navCtrl: NavController,
        public storage: Storage,
        public navParams: NavParams) {
        storage.get('score_whoami').then((val) => {
            if (val == null) {
                this.pox_whoami = 0;
                storage.set('score_careers', 0);
            } else {
                this.score_whoami = val;
            }
        });
        storage.get('pox_whoami').then((val) => {
            if (val == null) {
                this.pox_whoami = 0;
                storage.set('pox_whoami', this.pox_whoami);
            } else {
                this.pox_whoami = val;
            }
            this.start_game();
        });
    }
    random(min: number, max: number) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    }
    start_game() {
        this.whoami = this.careers[this.pox_whoami];
        this.answers = [];
        this.answers.push(this.whoami);
        for (let j = 0; j < this.careers.length; j++) {
            let n = this.random(0, this.careers.length - 1);
            this.answers.push(this.careers[n]);
            this.answers = this.answers.filter(function (elem, index, self) {
                return index === self.indexOf(elem);
            });
            if (this.answers.length == 4) {
                break;
            }
        }
        this.answers.sort(() => Math.random() - 0.5);
        console.log(this.answers);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad WhoAmIPage');
    } go_home() {
        this.navCtrl.setRoot('CategoryPage');
    }
    process_answers() {
        console.log(this.answer);
        if (this.answer == this.whoami) {
            this.pox_whoami++;
            this.score_whoami++;
            this.storage.set("pox_whoami", this.pox_whoami);
            this.storage.set("score_whoami", this.score_whoami);
            let alert = this.alertCtrl.create({
                title: 'You got it right!',
                subTitle: 'Go to next!',
                buttons: ['ok']
            });
            alert.onDidDismiss(() => {
                this.start_game();
            });

            alert.present();
        } else {
            let alert = this.alertCtrl.create({
                title: 'Wrong!',
                subTitle: 'Try again',
                buttons: ['ok']
            });
            alert.onDidDismiss(() => {
                this.start_game();
            });

            alert.present();
            
        }
    }

}
