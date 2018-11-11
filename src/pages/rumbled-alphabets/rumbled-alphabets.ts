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
        let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "W", "X", "Y", "Z"];
        this.rumblesA = letters.slice(0, 7);
        this.rumblesB = letters.slice(0, 7);
        this.rumblesC = letters.slice(0, 7);
        this.rumblesB.sort(() => Math.random() - 0.5);
        let showed = this.random(5, 10);
        let hidden = [];
        for (let m = 0; m < showed; m++) {
            let h = this.random(Math.trunc((this.rumblesA.length * .3)), Math.trunc((this.rumblesA.length * .8)));
            hidden.push(h);
        }
        for (let p = 0; p < this.rumblesA.length; p++) {
            if (hidden.find(x => x === p)) {
            } else {
                this.rumblesA[p] = "__";
            }

        }
        for (let p = 0; p < this.rumblesA.length; p++) {
            let index = this.rumblesB.indexOf(this.rumblesA[p]);
            if (index > -1) {
                this.rumblesB.splice(index, 1);
            }

        }
        this.dragulaService.dragend().subscribe((value) => {
            let index = ([].slice.call(value.el.parentElement.children).indexOf(value.el));

            console.log(value.el.textContent.trim());
            if (this.rumblesA[index] == '__') {
                this.rumblesA.splice(index, 1);
                if (this.rumblesA.indexOf(value.el.textContent.trim()) == -1) {
                    this.rumblesA[index] = value.el.textContent.trim();
                }
            } else {

            }
            console.log(this.rumblesA);
            console.log(this.rumblesB);

        });

        this.dragulaService.drag().subscribe((args) => {
            console.log("Dragged:" + args.el.hasAttribute("title").valueOf());
            let index = this.rumblesB.indexOf(args.el.textContent.trim());
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
