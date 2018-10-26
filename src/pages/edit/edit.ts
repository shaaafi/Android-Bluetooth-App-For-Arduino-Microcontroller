import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { RoomDbProvider } from '../../providers/room-db/room-db';
import { AlertProvider } from '../../providers/alert/alert';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  /*
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
  */

  public loads:any[] =[];
  public allRooms:any[]=[];
  public index:number;


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
  public name:any;
  public id:any;
  public roomName:any;

  public dbArray: any;
  public myRoom:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alert: AlertProvider, private roomDB: RoomDbProvider, private storage: Storage, private platform: Platform) {}

  async ionViewDidLoad() {
   this.allRooms = await this.roomDB.getAllRooms();
    this.myRoom  = this.navParams.get('room');
    this.index = this.navParams.get('index');
    console.log("ALLrOOMS: " + JSON.stringify(this.allRooms));
    console.log("My Room: " + JSON.stringify(this.myRoom));
    let index = this.allRooms.indexOf(this.myRoom);
    console.log('index in edit: '+index);
    this.initialise();
    this.dbArray = this.obToArr(this.myRoom) ;
    console.log("My dbArray: " + JSON.stringify(this.dbArray));

  }

  private initialise(){
    this.one = this.myRoom.first || '';
    this.two = this.myRoom.second || '' ;
    this.three = this.myRoom.third || '';
    this.four = this.myRoom.fourth || '';
    this.five = this.myRoom.fifth || '';
    this.six = this.myRoom.sixth || '';
    this.seven = this.myRoom.seventh || '';
    this.eight = this.myRoom.eighth || '';
    this.nine = this.myRoom.nineth || '';
    this.ten = this.myRoom.tenth || '';
    this.roomName = this.myRoom.room || '';
    this.name = this.myRoom.name || '';
    this.id = this.myRoom.id || ''
}

  private async update() {
    let updatedRoom = {
      room:this.roomName,
      first:this.one,
      second:this.two,
      third:this.three,
      fourth:this.four,
      fifth:this.five,
      sixth:this.six,
      seventh:this.seven,
      eight:this.eight,
      nineth:this.nine,
      tenth:this.ten,
      name:this.name,
      id:this.id
    }
    console.log(updatedRoom);

    let r = await this.updateRoom(updatedRoom,this.index);
       if (r.success == true) {
        this.alert.showToast("Room Data Updated");
        this.navCtrl.push('RoomPage');
      } else this.alert.showToast("Check Back the Code at RoomCreate page");

    }

  private obToArr(ob){
      let _arr = [];
      for(let x in ob){

              let i = {
                name:ob[x],
                key:x
              }
              _arr.push(i)

      }
      return _arr;
    }


    moreRoom() {
      let i = this.dbArray.length;
      if (i < 11) {
        let ob: any = {
         // key: this.numToString(i),
          dis: `${i}th Load`,
          name:""
        }
        console.log(ob);
        this.dbArray.push(ob);
      } else {
        this.alert.showAlert("Load LIMIT EXCEEDED !!! You can add maximum 10 loads");
      }

    }

    public async updateRoom(updatedRoom:any, index:number):Promise<any>{
      //  this.allRooms = await this.storage.get('rooms');
      //  let index = this.allRooms.indexOf(room);
       console.log('UR: index: '+index);

           this.allRooms[index] = updatedRoom ;
           console.log('UR: updated: '+JSON.stringify(this.allRooms));
           let result = await this.storage.set('rooms',this.allRooms);
            if(result) return {success:true}
            else return {success:false};


      }




}
