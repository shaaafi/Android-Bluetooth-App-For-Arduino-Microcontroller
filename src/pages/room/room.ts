import { Component,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Platform } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertProvider } from '../../providers/alert/alert';
import { HomePage } from '../home/home';
import { RoomDbProvider } from '../../providers/room-db/room-db';
import { Storage } from '@ionic/storage';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
/**
 * Generated class for the RoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {

  //public rooms:string[] = ["Bed Room 1","Bed Room 2","Drawing Room","Kitchen","Dinning Room"];

  public dbRooms:any[] = [];     //Testing variable to take data from roomDB
  private allowedBoards:any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public bluetooth:BluetoothSerial,public alert:AlertProvider,private ngZone:NgZone,private loadingCtrl:LoadingController,private platform:Platform, private roomDbProvider:RoomDbProvider, private storage:Storage,private nativePageTransitions: NativePageTransitions) {

    platform.ready().then(async ()=>{
        this.enableBluetooth();
        this.dbRooms = await roomDbProvider.getAllRooms();
        this.allowedBoards = await this.storage.get('boards');
       // console.log("allowed Boards in ROOMpage: " + JSON.stringify(this.allowedBoards));
      // this.alert.showAlert("Boards are:  " + JSON.stringify(this.allowedBoards));
      });

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomPage');
  }

  create(){
    this.navCtrl.push('RoomCreatePage');
  }

  edit(room:any){
    let index = this.dbRooms.indexOf(room);
    this.navCtrl.push('EditPage',{room:room,index:index});
   // this.navCtrl.push('RoomCreatePage');

    //console.log("index in room page: "+index);
   // console.log("RP: "+JSON.stringify(this.dbRooms));
   // console.log("Rp: "+JSON.stringify(room));
  }

  public async delete(room:any){
    let index = this.dbRooms.indexOf(room);
    this.dbRooms.splice(index , 1);
    let res = await this.roomDbProvider.removeRoom(room);
    if(res.success === true) this.alert.showToast('Room Deleted !!!')
  }

  test(room:any){
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 300,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 0
     };

     this.nativePageTransitions.slide(options);                                                 //This is the testing function to avoid native cordova
   this.navCtrl.push("ControlPage",{room:room});

  }

  goToOption(){
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

     this.nativePageTransitions.slide(options);
    this.navCtrl.push("OptionsPage");
  }


  enableBluetooth(){
      this.bluetooth.enable().then(()=>{
          console.log("Bluetooth On");
      },()=>{
         this.alert.showAlert("Please turn on the bluetooth");
      })
    }

  connectBluetooth(room:any){
      let loader = this.loadingCtrl.create({
        content:"Attempting For BluetoothSerial",
        dismissOnPageChange:true
    });
    loader.present();

    this.bluetooth.connect(room.id)    //Actually Id will be taken from Database. Here only id is required '20:15:05:21:06:59'
    .subscribe(()=>{
        this.ngZone.run(()=>{
         //sliding
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


           this.nativePageTransitions.slide(options);
        this.navCtrl.push("ControlPage",{room:room});
        this.alert.showToast("Device Connected");
        })
    },
    ()=>{
    this.ngZone.run(()=>{
        loader.onDidDismiss(()=>{
        this.alert.showAlert("Please connect to a Serial Enabled Microcontroller");
        });
        loader.dismiss();
      })
      })

  }



  onSelect(room:any){
    let indicator:boolean = true;                                   //This is the main function which will replace test() in real app on device
    for(let board of this.allowedBoards){
      //console.log("ENTERED:::"+board.boardId+"  room "+ room.id);
      if(room.id == board.boardId){
        this.connectBluetooth(room);
        indicator = false
       // this.alert.showAlert("device matched "+room.id +" == "+ board.boardId);
       // console.log(room.id +"=="+ board.boardId);
        break;
      }
    }
    if(indicator == true){
      //console.log("BOARD not MATCHED");
      this.alert.showAlert("Board Not Matched");
    }
   }

}
