import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertProvider } from '../../providers/alert/alert';
import { HomePage } from '../home/home';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  public device:any;
  public data:any;
  public to:boolean;
  public readings:any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public bluetooth:BluetoothSerial,public notification:AlertProvider,private ngZone:NgZone) {
      this.device = this.navParams.get('device');
  }

  ionViewDidLoad() {
      console.log('ionViewDidLoad DetailPage');
  }

  send(){
      this.bluetooth.write(this.data)
      .then(()=>{
      console.log("Data written");
      this.notification.showToast("Data written");
      });
  }
  
  read(){
    this.bluetooth.write("read")
      .then(()=>{
      console.log("Data written");
      //reading starts here
      setTimeout(()=>{
        //taken from former read function
        this.bluetooth.readUntil('\n').then((data)=>{
            this.ngZone.run(()=>{
            this.readings = data;
            console.log("CHECKED");
          });
        });
        this.bluetooth.clear().then(()=>{
        console.log("Cleared");
        })
        //former read function end
      },1500);
    });
  }
  
  sendToggle(){
    let data:string;
    if(this.to){
      data = "switchOn"
    }else{
      data = "switchOff"
    }

    this.bluetooth.write(data)
    .then(()=>{
      console.log("Data written");
      this.notification.showToast("Toggle Data written");
    })

  }
  
  disconnect(){
      this.bluetooth.disconnect()
      .then(()=>{
        this.navCtrl.setRoot(HomePage);
        this.notification.showToast("Disconnected");
      })
  }

  ionViewWillLeave(){
      this.bluetooth.disconnect()
      .then(()=>{
        this.notification.showToast("Disconnected");
      })
  }
  
}
