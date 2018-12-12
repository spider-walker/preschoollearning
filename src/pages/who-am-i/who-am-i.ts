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
        this.answer = "";
        if (this.pox_whoami == this.careers.length) {
            this.pox_whoami = 0;
        }
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
    show_answers() {
        this.answer = this.whoami;
        this.showAlert("I am", this.answer.toUpperCase());
        this.pox_whoami++;
        this.storage.set("pox_whoami", this.pox_whoami);
        this.storage.set("score_whoami", this.score_whoami);
    }
    process_answers() {
        if (this.answer == '') {
            this.showAlert("Please Make a selection", "Try again!");
            return;
        }
        if (this.answer == this.whoami) {
            this.pox_whoami++;
            this.score_whoami++;
            this.storage.set("pox_whoami", this.pox_whoami);
            this.storage.set("score_whoami", this.score_whoami);
            this.showAlert('You got it right!', 'Go to next!');

        } else {
            this.score_whoami = 0;
            this.storage.set("pox_whoami", this.pox_whoami);
            this.storage.set("score_whoami", this.score_whoami);
            this.showAlert("Wrong!", "Try again!");

        }
    }
    showAlert(message: string, subTitle: string) {
        let alert = this.alertCtrl.create({
            title: message,
            subTitle: subTitle,
            buttons: ['ok']
        });
        alert.onDidDismiss(() => {
            this.start_game();
        });

        alert.present();
    }
    select_image(b: string, e: any) {
        let a = document.getElementsByClassName('choices-image');
        var redDivs = document.querySelectorAll('.active');

        if (redDivs.length) {
             for (let i = 0; i < redDivs.length; i++) {
                redDivs[i].classList.remove('active');
                redDivs[i].classList.add('black')
            }
        } else {
             var blackDivs = document.querySelectorAll('.black');
            for (let i = 0; i < blackDivs.length; i++) {
                blackDivs[i].classList.remove('black')
                blackDivs[i].classList.add('red')
            }
        }
        let classList = e.target.classList;
        let classes = e.target.className;
        classes.includes('active') ? classList.remove('active') : classList.add('active');
        this.answer = b;
    }
}
