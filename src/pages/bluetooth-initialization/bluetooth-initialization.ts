import { Component,NgZone } from '@angular/core';
import { IonicPage,NavController,LoadingController,Platform,NavParams, AlertController,} from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertProvider } from '../../providers/alert/alert';
import { RoomDbProvider } from '../../providers/room-db/room-db';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the BluetoothInitializationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bluetooth-initialization',
  templateUrl: 'bluetooth-initialization.html',
})
export class BluetoothInitializationPage {

  public devices:any;
  public room:any = {};
  public allRooms:any[] = [];

  constructor(public navCtrl: NavController, public bluetooth:BluetoothSerial,public alert:AlertProvider,private ngZone:NgZone,private loadingCtrl:LoadingController,private platform:Platform, private navParams:NavParams, private roomDB:RoomDbProvider, private storage:Storage, private alertCtrl:AlertController) {

     platform.ready().then(()=>{
        this.enableBluetooth();
      });

      this.room = navParams.get('room');
      console.log(this.room);
  }

  ionViewDidEnter() {

  }

  enableBluetooth(){
    this.bluetooth.enable().then(()=>{
      this.bluetooth.list().then(res=>{
      this.ngZone.run(()=>{
      this.devices = res
      });
      })
    },()=>{
      this.alert.showAlert("Please turn on the bluetooth");
    })
  }


 onSelect(device:any){
  let loader = this.loadingCtrl.create({
  content:"Attempting For BluetoothSerial",
  dismissOnPageChange:true
  });
  loader.present();
  this.bluetooth.connect(device.id)
  .subscribe(()=>{
      this.ngZone.run(async ()=>{
          this.room.name = device.name;
          this.room.id = device.id;
        //  this.alert.showAlert("Look: " + JSON.stringify(this.room));           //Remove this line after Testing
          let r = await this.saveRoom(this.room);
          if(r.success === true){
            this.alert.showToast("Room Data Saved");
            this.navCtrl.push('RoomPage');
          }else this.alert.showToast("Check Back the Code at BluetoothInitializationPage");

      })
  },
  ()=>{
       this.ngZone.run(()=>{
            loader.onDidDismiss(()=>{
           // this.alert.showAlert("Please connect to a Serial Enabled Microcontroller");   //This is the ORIGINAL App code. Active this line after testing period
           this.presentConfirm();
            });
            loader.dismiss();
    })
  })
  }

  private async saveRoom(room:any):Promise<any>{
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
     //console.log('Room is  IN PROVIDER:::'+ JSON.stringify(this.allRooms));
      this.allRooms.push(room);
      let result = await this.storage.set('rooms',this.allRooms);
      if(result) return {success:true}
      else return {success:false};
    }

  }

    //Only for testing purposes. Remove it at final app.

  private presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'BluetoothSerial Not Found',
      message: 'Proceed anyway?',
      buttons: [
        {
          text: 'It is OK',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Proceed',
          handler: () => {
              this.saveRoom(this.room).then(r =>{
              if(r.success === true){
                this.alert.showToast("Room Data Saved");
                this.navCtrl.push('RoomPage');
              }else this.alert.showToast("Check Back the Code at BluetoothInitializationPage");
            })
           }
        }
      ]
    });
    alert.present();
  }


}
