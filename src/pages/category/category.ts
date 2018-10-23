import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-category',
    templateUrl: 'category.html',
})
export class CategoryPage {
    public pages: Array<any> = [];
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.pages.push({title: "Rumbled Alphabet", icon: "logo-nodejs", page: 'RumbledAlphabetsPage'});
        this.pages.push({title: "Count the Numbers", icon: "logo-twitch", page: 'CountNumbersPage'});
        this.pages.push({title: "Where I am", icon: "outlet", });
        this.pages.push({title: "I am", icon: "hand", });
        this.pages.push({title: "Drug the Shapes", icon: "browsers", });
        this.pages.push({title: "Paint the colors", icon: "nutrition", });
        this.pages.push({title: "Find my baby animals", icon: "paw", });
        this.pages.push({title: "Ride in vehicles", icon: "car", });
        this.pages.push({title: "My body parts", icon: "man", });
    }

    ionViewDidLoad() {

    }
    goToOtherPage(item) {
        this.navCtrl.setRoot(item.page);
    }
    go_home() {
        this.navCtrl.setRoot('HomePage');
    }
}
