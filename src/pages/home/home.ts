import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { Storage } from '@ionic/storage';
import { AlertProvider } from '../../providers/alert/alert';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public username:string;
  public password:string;
  private dbUser:any;
  public check:boolean;
  five:any;


  constructor(public navCtrl: NavController,private nativePageTransitions: NativePageTransitions, private storage:Storage, private notification:AlertProvider) {
    this.getUser();
  }

  login(){

    if(this.username == '' && this.password == ''){
      this.notification.showAlert("Please insert the correct username and password !!!");
      return;
    }
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 200,
      slowdownfactor: 2,
      slidePixels: 10,
      iosdelay: 100,
      androiddelay: 100,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 0
     };

    // this.nativePageTransitions.slide(options);

     if(this.username == this.dbUser.username && this.password == this.dbUser.password){
       console.log("user matched");
       if(this.check){
         this.saveBackupUser();
       }else{
         this.removeBackupUser();
       }
       this.navCtrl.setRoot('RoomPage');
     }else{
      this.notification.showAlert("Please insert the correct username and password !!!");
     }


  }

  register(){
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 200,
      slowdownfactor: 3,
      slidePixels: 10,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 0
     };

     this.nativePageTransitions.slide(options);
    this.navCtrl.push('RegisterPage');
  }

  async getUser(){
    this.storage.get('users')
    .then(val => {
      this.dbUser = val;
      console.log("Home reg user: " + JSON.stringify(this.dbUser));
    });

    let backupUser = await this.storage.get('backupUser');
    if(backupUser){
      this.check = true;
      this.username = this.dbUser.username;
      this.password = this.dbUser.password;
    }

  }

  public saveBackupUser(){


      this.storage.set('backupUser',this.dbUser)
      .then(()=>{
        console.log("User saved in backup");

       // this.navCtrl.setRoot(HomePage);
      },
      ()=>{
        console.log("User not saved in backup");
      }
    )

}

public removeBackupUser(){
  this.storage.remove('backupUser')
  .then(()=>{
    console.log("User removed from backupUser");
  })
}

}
