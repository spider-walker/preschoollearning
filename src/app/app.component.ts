import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AngularFireAuth} from '@angular/fire/auth';
import {PleaseWaitPage} from '../pages/please-wait/please-wait';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = PleaseWaitPage;
    @ViewChild(Nav) nav: Nav;
    pages: Array<{title: string, component: any}>;
    constructor(
        platform: Platform,
        public afAuth: AngularFireAuth,
        statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            const authObserver = afAuth.authState.subscribe(user => {
                if (user) {
                    this.rootPage = 'HomePage';
                    authObserver.unsubscribe();
                } else {
                    this.rootPage = 'LoginPage';
                    authObserver.unsubscribe();
                }

            });
            
            this.pages = [
                {title: 'Home', component: 'HomePage'},
                {title: 'Category', component: 'CategoryPage'},
                {title: 'Settings', component: 'SettingsPage'},
                {title: 'Logout', component: 'LoginPage'}
            ];
        });
    }
    openPage(page) {
        if (page.title == "Logout") {
            this.afAuth.auth.signOut()
        }
        this.nav.setRoot(page.component);
    }
}
