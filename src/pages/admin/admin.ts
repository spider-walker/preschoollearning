import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {GamesProvider} from '../../providers/games/games';
import {Observable} from 'rxjs/internal/Observable';
import {Games} from '../../models/DbUser';



@IonicPage()
@Component({
    selector: 'page-admin',
    templateUrl: 'admin.html',
})
export class AdminPage {
    games: Observable<Games[]>;
    constructor(public navCtrl: NavController,
        public gamesProvider: GamesProvider,
        public alertCtrl: AlertController,
        public navParams: NavParams) {
        try {
            this.games = this.gamesProvider.getDbGames();
        } catch (e) {
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AdminPage');
    }
    go_home() {
        this.navCtrl.setRoot('HomePage');
    }
    addgames() {
        const prompt = this.alertCtrl.create({
            title: 'Add Game',
            message: "Please enter name below",
            inputs: [
                {name: 'name', placeholder: 'Description'},
                {name: 'category', placeholder: 'Category'},
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        let game: Games = {
                            game_id: new Date().getTime(),
                            name: data.name,
                            category: data.category,
                        };
                        console.log(game);
                        try {
                            this.gamesProvider.addGames(game);

                        } catch (e) {
                            console.log(e);
                        }

                        console.log(data);
                    }
                }
            ]
        });
        prompt.present();
    }

}
