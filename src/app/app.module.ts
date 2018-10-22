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
import { ImmunizationProvider } from '../providers/immunization/immunization';

@NgModule({
    declarations: [
        MyApp, PleaseWaitPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp({
            apiKey: "AIzaSyB8qtu1uamihBU91fK6eZb73I-nvViOcOY",
            authDomain: "immunivac.firebaseapp.com",
            databaseURL: "https://immunivac.firebaseio.com",
            projectId: "immunivac",
            storageBucket: "immunivac.appspot.com",
            messagingSenderId: "482802537972"

        }),
        ReactiveFormsModule,
        CustomFormsModule,
        HttpClientModule,
        HttpClientModule,
        AngularFirestoreModule,
        AngularFireAuthModule,
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
    ImmunizationProvider
    ]
})
export class AppModule {}
