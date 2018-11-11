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
        this.pages.push({title: "Who am I?", icon: "outlet", page: 'WhoAmIPage' });
        this.pages.push({title: "Drag the Shapes", icon: "browsers", page: 'DragTheShapesPage' });
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
