import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AngularFireAuth} from '@angular/fire/auth';
import {PleaseWaitPage} from '../pages/please-wait/please-wait';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = PleaseWaitPage;

    constructor(
        platform: Platform,
        afAuth: AngularFireAuth,
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
        });
    }
}
