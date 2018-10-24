import {Component, ElementRef, Input} from '@angular/core';
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
    @Input('makeDraggable') data: any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams) {
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
             console.log(p+"."+this.rumblesB[p]);
            if (this.rumblesB.find(x => x === this.rumblesA[p])) {
                 console.log("Found"+this.rumblesA[p]);
                this.rumblesB.slice(p,1);
            }
        }
    }
    ngOnInit() {

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
