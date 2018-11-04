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
    public rumblesA: Array<any> = [];
    public rumblesB: Array<any> = [];
    public rumblesC: Array<any> = [];
    subs = new Subscription();
    constructor(

        private navCtrl: NavController,
        public alertCtrl: AlertController,
        private dragulaService: DragulaService) {

        this.rumblesA = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "W", "X", "Y", "Z"];
        this.rumblesB = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "W", "X", "Y", "Z"];
        this.rumblesB.sort(() => Math.random() - 0.5);
        let showed = this.random(5, 10);
        let hidden = [];
        for (let m = 0; m < showed; m++) {
            let h = this.random(4, 25);
            hidden.push(h);
        }
        for (let p = 0; p < this.rumblesA.length; p++) {
            if (hidden.find(x => x === p)) {
            } else {
                this.rumblesA[p] = "__";
            }

        }
        for (let p = 0; p < this.rumblesB.length; p++) {
            for (let a = 0; a < this.rumblesA.length; a++) {
                if (this.rumblesB[p] == this.rumblesA[a]) {
                    console.log(this.rumblesB[p])
                    this.rumblesB.splice(p, 1);
                }
            }
        }
        this.dragulaService.dragend().subscribe((value) => {
            let index = ([].slice.call(value.el.parentElement.children).indexOf(value.el));
            this.dragulaService.cancel();
            this.rumblesA.splice(index, 1);
        });

        this.dragulaService.drop().subscribe((args) => {
            console.log(([].slice.call(args.source.parentElement.children).indexOf(args.source.parentElement)));
            console.log([].slice.call(args.target.parentElement.children).indexOf(args.target.parentElement));
        });
    }
    random(min: number, max: number) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    }
    go_home() {
        this.navCtrl.setRoot('CategoryPage');
    }
}
