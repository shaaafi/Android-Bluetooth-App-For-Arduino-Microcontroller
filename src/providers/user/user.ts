import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable'


/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsersProvider {

  constructor(public http: HttpClient, private afdb:AngularFireDatabase) {
    console.log('Hello UsersProvider Provider');
  }

  public addUser(email:string,uid:string,name?:string,mobile?:string,address?:string){
    return this.afdb.object('/users/' + uid).set({
      name:name || '',
      mobile:mobile || '',
      address:address || '',
      email:email,
      uid:uid
    })
  }

}
