import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController, ToastController, LoadingController, Loading} from 'ionic-angular';
import {DragulaService} from 'ng2-dragula';
import {Subscription} from 'rxjs';
import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-count-numbers',
    templateUrl: 'count-numbers.html',
})
export class CountNumbersPage {
    public rumblesA: Array<any> = [];
    public rumblesB: Array<any> = [];
    public rumblesC: Array<any> = [];
    public moving_a: string = '';
    public moving_b: string = '';
    public pox_rumbled_numbers = 0;
    public score_rumbled_numbers = 0;
    public no_of_retries = 1;
    subs = new Subscription();
    public loading: Loading;
    constructor(
        public loadingCtrl: LoadingController,
        private navCtrl: NavController,
        public alertCtrl: AlertController,
        public storage: Storage,
        public toastCtrl: ToastController,
        public dragulaService: DragulaService) {
        storage.get('score_rumbled_numbers').then((val) => {
            if (val == null) {
                this.pox_rumbled_numbers = 0;
                storage.set('score_rumbled_numbers', 0);
            } else {
                this.score_rumbled_numbers = val;
            }
        });
        storage.get('pox_rumbled_numbers').then((val) => {
            if (val == null) {
                this.pox_rumbled_numbers = 5;
                storage.set('pox_rumbled_numbers', 5);
            } else {
                this.pox_rumbled_numbers = val;
            }
            this.start_game();
        });
    }
    process_drag(source: string, b: string, i: number) {
        console.log(source, b, i, this.moving_b);
        if (source == "B") {
            this.moving_a = "";
            this.moving_b = b;
        }
        if (source == "A" && this.moving_b == "") {
            if (this.rumblesA[i] != "") {
                if (this.rumblesA[i] != '__') {
                    this.rumblesA[i] = '__';
                    this.rumblesB.push(b);
                    this.rumblesB.sort(() => Math.random() - 0.5);
                }

            }
            this.moving_a = "";
            this.moving_b = "";
        }
        if (source == "A" && this.moving_b != '') {
            if (this.rumblesA[i] != '') {
                if (this.rumblesA[i] == '__') {
                    this.rumblesA[i] = this.moving_b;
                    let index = this.rumblesB.indexOf(this.moving_b);
                    if (index > -1) {
                        this.rumblesB.splice(index, 1);
                    }
                }

            }
            this.moving_a = "";
            this.moving_b = "";
        }
        if (this.rumblesB.length == 0) {
            if (this.arraysEqual(this.rumblesA, this.rumblesC)) {
                if (this.pox_rumbled_numbers >= 30) {
                    let alert = this.alertCtrl.create({
                        message: "Perfect. You have completed",
                        buttons: [
                            {
                                text: "Ok",
                                role: 'cancel'
                            }
                        ]
                    });
                    alert.present();
                }
                this.pox_rumbled_numbers += 5;
                this.score_rumbled_numbers++;
                this.storage.set('pox_rumbled_numbers', this.pox_rumbled_numbers);
                this.storage.set('score_rumbled_numbers', this.score_rumbled_numbers);
                let toast = this.toastCtrl.create({
                    message: 'You have earned a point. Next level is setting up.',
                    duration: 3000,
                    position: 'middle'
                });

                toast.onDidDismiss(() => {
                    this.start_game();
                });

                toast.present();
                this.no_of_retries = 1;

            } else {
                this.no_of_retries++;
                if (this.no_of_retries == 3) {
                    this.score_rumbled_numbers = 0;
                    let toast = this.toastCtrl.create({
                        message: 'Sorry, wrong arrangment!  Game will restart.',
                        duration: 3000,
                        position: 'middle'
                    });
                    this.storage.set('pox_rumbled_numbers', this.pox_rumbled_numbers);
                    this.storage.set('score_rumbled_numbers', this.score_rumbled_numbers);
                    toast.onDidDismiss(() => {
                        this.start_game();
                    });

                    toast.present();
                } else {
                    let toast = this.toastCtrl.create({
                        message: 'Sorry, wrong arrangment! Game will restart.',
                        duration: 3000,
                        position: 'middle'
                    });

                    toast.onDidDismiss(() => {
                        this.start_game();
                    });

                    toast.present();
                }

            }
        }

    }
    start_game() {
        let my_this = this;
        //this.presentLoadingDefault();
        setTimeout(function () {
            console.log("Game is starting:" + my_this.pox_rumbled_numbers);
            let letters: Array<string> = [];
            for (let m = 1; m < 50; m++) {
                letters.push(m.toString());
            }
            my_this.rumblesA = letters.slice(0, my_this.pox_rumbled_numbers);
            my_this.rumblesB = letters.slice(0, my_this.pox_rumbled_numbers);
            my_this.rumblesC = letters.slice(0, my_this.pox_rumbled_numbers);
            my_this.rumblesB.sort(() => Math.random() - 0.5);
            let showed = my_this.random(5, 10);
            let hidden = [];
            for (let m = 0; m < showed; m++) {
                let h = my_this.random(Math.trunc((my_this.rumblesA.length * .3)), Math.trunc((my_this.rumblesA.length * .8)));
                hidden.push(h);
            }
            for (let p = 0; p < my_this.rumblesA.length; p++) {
                if (hidden.find(x => x === p)) {
                } else {
                    my_this.rumblesA[p] = "__";
                }

            }
            for (let p = 0; p < my_this.rumblesA.length; p++) {
                let index = my_this.rumblesB.indexOf(my_this.rumblesA[p]);
                if (index > -1) {
                    my_this.rumblesB.splice(index, 1);
                }

            }
            //my_this.loading.dismissAll();
        }, 2000);


    }
    arraysEqual(arr1: Array<string>, arr2: Array<string>) {
        if (arr1.length !== arr2.length)
            return false;
        for (let i = arr1.length; i--;) {
            if (arr1[i] !== arr2[i])
                return false;
        }
        return true;
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
    presentLoadingDefault() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    }
    presentToast(message: string, duration: number) {
        const toast = this.toastCtrl.create({
            message: message,
            duration: duration
        });
        toast.present();
    }
    restart_game() {
        this.pox_rumbled_numbers = 5;
        this.storage.set('pox_rumbled_numbers', 5);
        this.start_game();
    }
}
