import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the RoomDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RoomDbProvider {

  private allRooms:any[] = [] ;

  constructor(private storage:Storage) { }

  public async getAllRooms():Promise<any[]>{
    this.allRooms = await this.storage.get('rooms');
    return this.allRooms ;
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

  public async removeRoom(room:any):Promise<any>{
    this.allRooms = await this.storage.get('rooms');
    let index = this.allRooms.indexOf(room);
    if(index){
      this.allRooms.splice(index,1);
      let result = await this.storage.set('rooms',this.allRooms);
          if(result) return {success:true}
          else return {success:false};
    }
   
  }

  public async updateRoom(room:any, updatedRoom:any, index:number):Promise<any>{
  //  this.allRooms = await this.storage.get('rooms');
  //  let index = this.allRooms.indexOf(room);
   console.log('UR: index: '+index);
    if(index){
       this.allRooms[index] = updatedRoom ;
       console.log('UR: updated: '+JSON.stringify(this.allRooms));
       let result = await this.storage.set('rooms',this.allRooms);
        if(result) return {success:true}
        else return {success:false};
    }
    
  }

}
