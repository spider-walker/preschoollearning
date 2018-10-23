import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular'; 
@IonicPage()
@Component({
    selector: 'page-rumbled-alphabets',
    templateUrl: 'rumbled-alphabets.html',
})
export class RumbledAlphabetsPage {

    public rumblesA: Array<any> = [];
    public rumblesB: Array<any> = [];
    public rumblesC: Array<any> = [];
    constructor(public navCtrl: NavController, public navParams: NavParams) {
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
            }else{
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

}
