import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Platform
} from 'ionic-angular';
import {
  AlertProvider
} from '../../providers/alert/alert';
import {
  RoomDbProvider
} from '../../providers/room-db/room-db';
import {
  Storage
} from '@ionic/storage';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

/**
 * Generated class for the RoomCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-room-create',
  templateUrl: 'room-create.html',
})
export class RoomCreatePage {

  public loads: any[] = [{
    name: "room",
    dis: "Room Name"
  }, {
    name: "first",
    dis: "1st Load"
  }, {
    name: "second",
    dis: "2nd Load"
  }, {
    name: "third",
    dis: "3rd Load"
  }, {
    name: "fourth",
    dis: "4th Load"
  }, {
    name: "fifth",
    dis: "5th Load"
  }];

  public allRooms: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alert: AlertProvider, private roomDB: RoomDbProvider, private storage: Storage, private platform: Platform,private nativePageTransitions: NativePageTransitions) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomCreatePage');
  }

  private async save(val) {
    if (this.platform.is('android')) {
      //slidding
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
      
      this.navCtrl.push("BluetoothInitializationPage", {
        room: val
      }); //Testing code for DB is here
    } else {
      let r = await this.saveRoom(val);
      if (r.success === true) {
        this.alert.showToast("Room Data Saved");
        //sliding

        this.navCtrl.push('RoomPage');
      } else this.alert.showToast("Check Back the Code at RoomCreate page");
    }

  }


  private async saveRoom(room: any): Promise < any > {
    let rooms = await this.storage.get('rooms');
    if (rooms) {
      this.allRooms = rooms;
      this.allRooms.push(room);
      // console.log('Room is  IN PROVIDER:::  '+ JSON.stringify(this.allRooms));
      let result = await this.storage.set('rooms', this.allRooms);
      if (result) return {
        success: true
      }
      else return {
        success: false
      };
    } else {
      console.log('Room is  IN PROVIDER:::' + JSON.stringify(this.allRooms));
      this.allRooms.push(room);
      let result = await this.storage.set('rooms', this.allRooms);
      if (result) return {
        success: true
      }
      else return {
        success: false
      };
    }

  }


  moreRoom() {
    let i = this.loads.length;
    if (i < 11) {
      let ob: any = {
        name: this.numToString(i),
        dis: `${i}th Load`
      }
      console.log(ob);
      this.loads.push(ob);
    } else {
      this.alert.showAlert("Load LIMIT EXCEEDED !!! You can add maximum 10 loads");
    }

  }

  numToString(val) {
    switch (val) {
      case 6:
        return "sixth";
      case 7:
        return "seventh";
      case 8:
        return "eighth";
      case 9:
        return "nineth";
      case 10:
        return "tenth";
      case 11:
        return "eleventh";
      case 12:
        return "twelveth";
      case 13:
        return "thirteenth";
      case 14:
        return "fourteenth";
      case 15:
        return "fifteenth";
      case 16:
        return "sixteenth";
      case 17:
        return "seventeenth";
      case 18:
        return "eighteenth";
      case 19:
        return "nineteenth";
      case 20:
        return "twentyth";
      case 21:
        return "twentyoneth";
      case 22:
        return "twentytwoth";
      case 23:
        return "twentythreeth";
      case 24:
        return "twentyfourth";
      case 25:
        return "twentyfiveth";
      case 26:
        return "twentysixth";
      case 27:
        return "twentyseventh";
      case 28:
        return "twentyeightth";
      case 29:
        return "twentynineth";
      case 30:
        return "thirtyth";
    }

  }


}
