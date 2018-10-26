import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial'
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AlertProvider } from '../providers/alert/alert';
import { RoomDbProvider } from '../providers/room-db/room-db';
import { FirebaseConfig } from './app.firebaseconfig';
import { UsersProvider } from '../providers/user/user';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FirebaseConfig),
   AngularFireAuthModule,
   AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothSerial,
    NativePageTransitions,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlertProvider,
    RoomDbProvider,
    UsersProvider
  ]
})
export class AppModule {}
