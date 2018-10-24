import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
@IonicPage()
@Component({
    selector: 'page-count-numbers',
    templateUrl: 'count-numbers.html',
})
export class CountNumbersPage {

    public rumblesA: Array<any> = [];
    public rumblesB: Array<any> = [];
    public rumblesC: Array<any> = [];
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        for (let m = 1; m < 21; m++) {
            this.rumblesA.push(m);
            this.rumblesB.push(m);
        }
        this.rumblesB.sort(() => Math.random() - 0.5);
        let showed = this.random(5, 10);
        let hidden = [];
        for (let m = 0; m < showed; m++) {
            let h = this.random(4, 21);
            hidden.push(h);
        }
        for (let p = 0; p < this.rumblesA.length; p++) {
            if (hidden.find(x => x === p)) {
            } else {
                this.rumblesA[p] = "__";
            }

        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RumbledAlphabetsPage');
    }
    read_alod(letter: string) {

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
    
    public allowDrop(ev: any) {
         console.log(ev);
        ev.preventDefault();
    }

    public ondragstart_item(ev: any, data, idx: any) {
        console.log(this.rumblesB[idx]);
        ev.dataTransfer.setData('data', data);
    }

    public drop_item(ev,data) {
        let dataTransfer = ev.dataTransfer.getData('data');
        console.log(dataTransfer);
        ev.preventDefault();
    }

}
