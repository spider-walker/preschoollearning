import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule, AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthProvider} from '../providers/auth/auth';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {PleaseWaitPage} from '../pages/please-wait/please-wait';
import {UsersProvider} from '../providers/users/users';
import {CustomFormsModule} from 'ng2-validation'
import {ReactiveFormsModule} from '@angular/forms';
import {ChildrenProvider} from '../providers/children/children';
import {ImmunizationProvider} from '../providers/immunization/immunization';
import {GamesProvider} from '../providers/games/games';
import { IonicStorageModule } from '@ionic/storage';
@NgModule({
    declarations: [
        MyApp, PleaseWaitPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp({
            apiKey: "AIzaSyCADqKxrxAhk_OSHNFEKYx6NxJdvoW56_o",
            authDomain: "preschoollearning-edef3.firebaseapp.com",
            databaseURL: "https://preschoollearning-edef3.firebaseio.com",
            projectId: "preschoollearning-edef3",
            storageBucket: "preschoollearning-edef3.appspot.com",
            messagingSenderId: "354733940738"
        }),
        ReactiveFormsModule,
        CustomFormsModule,
        HttpClientModule,
        HttpClientModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
       IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        PleaseWaitPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AngularFirestore,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AuthProvider,
        HttpClient,
        UsersProvider,
        ChildrenProvider,
        ImmunizationProvider,
        GamesProvider
    ]
})
export class AppModule {}
