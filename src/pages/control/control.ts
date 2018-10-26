import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertProvider } from '../../providers/alert/alert';
import { HomePage } from '../home/home';

/**
 * Generated class for the ControlPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-control',
  templateUrl: 'control.html',
})
export class ControlPage {

  public device:any;
  public data:any;
  public readings:any;
  public one:any;
  public two:any;
  public three:any;
  public four:any;
  public five:any;
  public six:any;
  public seven:any;
  public eight:any;
  public nine:any;
  public ten:any;
  public rangeState:any;

  //Room object from Database is taken
  /*
  public db:any = {
    room:"Bed Room",
    first:"Light 1",
    second:"Light 2",
    third:"Ac",
    fourth:"Fan 1"
  }
  */
  public dbRoom:any;
  public dbArray:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public bluetooth:BluetoothSerial,public notification:AlertProvider,private ngZone:NgZone, private platform:Platform) {
    this.dbRoom = navParams.get('room');
    this.dbArray = this.obToArr(this.dbRoom);
    this.read();

  }


  public sendToggle(index:number){

    let data:string;
    switch(index){
      case 1 :
        data = (this.one) ? 'fo' : 'ff';
        (this.platform.is('cordova')) ? this.send(data) : console.log("SENT DATA: " + data);
        break;
      case 2 :
        data = (this.two) ? 'so' : 'sf';
        (this.platform.is('cordova')) ? this.send(data) : console.log("SENT DATA: " + data);
        break;
      case 3 :
        data = (this.three) ? 'to' : 'tf';
        (this.platform.is('cordova')) ? this.send(data) : console.log("SENT DATA: " + data);
        break;
      case 4 :
        data = (this.four) ? 'f1' : 'f2';
        (this.platform.is('cordova')) ? this.send(data) : console.log("SENT DATA: " + data);
        break;
      case 5 :

       // data = this.five;
        if(!this.rangeState){
          this.notification.showToast("Please turn on Fan Switch");
           setTimeout(() => {
            this.five = 10;
           // console.log("Here I am");
          }, 300);

          break;

        }
// 35  60  85  110  135  160  185  210  235  255
        if(this.five== 10){
          data = 'd0';
        }else if(35>this.five){
          data = 'd1';
        }else if(60>this.five){
          data = 'd2';
        }else if(85>this.five){
          data = 'd3';
        }else if(110>this.five){
          data = 'd4';
        }else if(135>this.five){
          data = 'd5';
        }else if(160>this.five){
          data = 'd6';
        }else if(185>this.five){
          data = 'd7';
        }else if(210>this.five){
          data = 'd8';
        }else if(255>this.five){
          data = 'd9';
        }else if(this.five == 255){
          data = 'da'
        }
        (this.platform.is('cordova')) ? this.send(data) : console.log("SENT DATA: " + data);
        break;
      case 6 :
        data = (this.six) ? 's1' : 's2';
        (this.platform.is('cordova')) ? this.send(data) : console.log("SENT DATA: " + data);
        break;
        case 7 :
        data = (this.seven) ? 's3' : 's4';
        (this.platform.is('cordova')) ? this.send(data) : console.log("SENT DATA: " + data);
        break;
        case 8 :
        data = (this.eight) ? 'eo' : 'ef';
        (this.platform.is('cordova')) ? this.send(data) : console.log("SENT DATA: " + data);
        break;
        case 9 :
        data = (this.nine) ? 'no' : 'nf';
        (this.platform.is('cordova')) ? this.send(data) : console.log("SENT DATA: " + data);
        break;
        case 10 :
        data = (this.ten) ? 'tn' : 'tf';
        (this.platform.is('cordova')) ? this.send(data) : console.log("SENT DATA: " + data);
        break;
    }

  }

  public send(data:string){
    this.bluetooth.write(data)
    .then(()=>{
    console.log("Data written");
 //   this.notification.showToast("Data written");
    });
  }

  private initialise(){
    let a = Array.from(this.readings);
    this.one = (a[0] == 1) ? true : false ;
    this.two = (a[1] == 1) ? true : false ;
    this.three = (a[2] == 1) ? true : false ;
    this.four = (a[3] == 1) ? true : false ;
    this.five = parseInt(`${a[4]}${a[5]}${a[6]}`,10);
    this.six = (a[7] == 1) ? true : false ;
    this.seven = (a[8] == 1) ? true : false ;
    this.eight = (a[9] == 1) ? true : false ;
    this.nine = (a[10] == 1) ? true : false ;
    this.ten = (a[11] == 1) ? true : false ;
    this.rangeState = (this.five < 11) ? false : true;
  }

  public read(){
    this.bluetooth.write("re")
      .then(()=>{
      console.log("Data written");
      //reading starts here
      setTimeout(()=>{
        //taken from former read function
        this.bluetooth.readUntil('\n').then((data)=>{
            this.ngZone.run(()=>{
            this.readings = data;
            this.initialise();
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

  private obToArr(ob){
    let _arr = [];
    for(let x in ob){
        if(x == 'room' || x =="name" || x =='id'){
           continue;
        }
        else{
          let i = {
            name:ob[x],
            key:x
          }
          _arr.push(i)
        }
    }
    return _arr;
  }

  private disconnect(){
    this.bluetooth.disconnect()
    .then(()=>{
      this.navCtrl.setRoot(HomePage);
      this.notification.showToast("Disconnected");
    })
  }

  public changeStateOfRange(val:number){
    if(val>10 || val!=undefined) {
      setTimeout(() => {
        this.five=10;
        (this.platform.is('cordova')) ? this.send('d0') : console.log("SENT DATA: d0");
      }, 400);
    }
  }



  ionViewWillLeave(){
    this.bluetooth.disconnect()
    .then(()=>{
      this.notification.showToast("Disconnected");
    })
  }


}
