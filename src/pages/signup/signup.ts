import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsersProvider } from '../../providers/user/user';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private afauth:AngularFireAuth, private userService:UsersProvider, private platform:Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


  signup(data:any){
    this.platform.ready().then(()=>{
      if(data.email != '' && data.name != '' && data.mobile != '' && data.address != ''){
        this.afauth.auth.createUserWithEmailAndPassword(data.email,data.password)
            .then(() => {
              this.userService.addUser(data.email,this.afauth.auth.currentUser.uid,data.name,data.mobile,data.address).then(()=>{
                console.log("User Added");
                this.navCtrl.push("OptionsPage");
              })
            })
      }
    })
  }

  looking(){
    this.platform.exitApp();
  }

}
