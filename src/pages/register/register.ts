import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { AlertProvider } from '../../providers/alert/alert';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public allRooms:any[]

  public credentials:any = {
    username:'',
    password:'',
    confirmPassword:''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage, private notification:AlertProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  signin(){
    this.navCtrl.setRoot(HomePage);
  }

  signup(){

  }

  passwordreset(){

  }

  public async saveRoom(room:any):Promise<any>{
    let rooms = await this.storage.get('rooms');
    if(rooms){
      this.allRooms = rooms ;
      this.allRooms.push(room);
     // console.log('Room is  IN PROVIDER:::  '+ JSON.stringify(this.allRooms));
      let result = await this.storage.set('rooms',this.allRooms);
      if(result) return {success:true}
      else return {success:false};
    }
    else{
     console.log('Room is  IN PROVIDER:::'+ JSON.stringify(this.allRooms));
      this.allRooms.push(room);
      let result = await this.storage.set('rooms',this.allRooms);
      if(result) return {success:true}
      else return {success:false};
    }

}

public async saveUser(){
    console.log("user before save: " + JSON.stringify(this.credentials));
    if(this.credentials.password !== this.credentials.confirmPassword){
      this.notification.showAlert("Rectify your password");
      return;
    }
    let users = await this.storage.get('users');
    if(users == null){
      this.storage.set('users',this.credentials)
      .then(()=>{
        console.log("User saved");

        this.navCtrl.setRoot(HomePage);
      },
      ()=>{
        console.log("User not saved");
      }
    )
    }else{
      console.log("There is already user");
    }
}

}
