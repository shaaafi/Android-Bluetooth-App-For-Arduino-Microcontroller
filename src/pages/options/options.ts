import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertProvider } from '../../providers/alert/alert';
import { Subscription } from 'rxjs/Subscription';
/**
 * Generated class for the OptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-options',
  templateUrl: 'options.html',
})
export class OptionsPage {

  public allowedBoards:any[] = [];
  private subscription:Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage, private afauth:AngularFireAuth, private afdb:AngularFireDatabase, private platform:Platform, private alert:AlertProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OptionsPage');
  }

  goToSignup(){
   this.navCtrl.push("SignupPage");
    }

    goTOSignup(){
      this.navCtrl.push("SignupPage");
      }
    
      sync(user:any){
       // this.alert.showToast("Pressed");
        this.platform.ready().then(()=>{
          if(user.email != '' && user.password != ''){
            this.afauth.auth.signInWithEmailAndPassword(user.email,user.password)
            .then(() => {
            this.subscription = this.afdb.list('/allowedboards/' + this.afauth.auth.currentUser.uid).valueChanges().subscribe(res => {
            this.allowedBoards = res;
            console.log('Response of allowed: ' + JSON.stringify(res));
            console.log('allow of allowed: ' + JSON.stringify(this.allowedBoards));
            this.saveRoom();
            this.storage.get('boards').then(g => console.log("Boards database result : "+ JSON.stringify(g)));
            this.navCtrl.push("RoomPage");
            })
            })
          }
         })

     
      }

      private async saveRoom(): Promise < any > {
      let result = await this.storage.set('boards', this.allowedBoards);
      if (result) return {
      success: true
      }
      else return {
      success: false
      };
      }

     async showAllowedBoards(){
        let authorizedBoards = await this.storage.get('boards') || "";
        this.alert.showAlert(JSON.stringify(authorizedBoards));
      }

      ionViewDidLeave(){
        this.afauth.auth.signOut();
        this.subscription.unsubscribe();
      }
      

}
