import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-drag-the-shapes',
  templateUrl: 'drag-the-shapes.html',
})
export class DragTheShapesPage {
    public shapes: string = '1';
    public answer: string;
    public careers = ['1', '2', '3', '4', '5', '6', '7', '8', '9','10','11','12','13'];
    public pox_shapes = 0;
    public score_shapes = 0;
    public answers: Array<string> = [];
    constructor(public alertCtrl: AlertController,
        public navCtrl: NavController,
        public storage: Storage,
        public navParams: NavParams) {
        storage.get('score_shapes').then((val) => {
            if (val == null) {
                this.pox_shapes = 0;
                storage.set('score_careers', 0);
            } else {
                this.score_shapes = val;
            }
        });
        storage.get('pox_shapes').then((val) => {
            if (val == null) {
                this.pox_shapes = 0;
                storage.set('pox_shapes', this.pox_shapes);
            } else {
                this.pox_shapes = val;
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
        this.shapes = this.careers[this.pox_shapes];
        this.answers = [];
        this.answers.push(this.shapes);
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
        if (this.answer == this.shapes) {
            this.pox_shapes++;
            this.score_shapes++;
            this.storage.set("pox_shapes", this.pox_shapes);
            this.storage.set("score_shapes", this.score_shapes);
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
