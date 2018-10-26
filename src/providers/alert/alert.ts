import { Injectable } from '@angular/core';
import { AlertController,ToastController } from 'ionic-angular';
/*
Generated class for the AlertProvider provider.
See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class AlertProvider {
    
    constructor(public altc:AlertController,public toast:ToastController) {
    console.log('Hello AlertProvider Provider');
    }
    showAlert(msg:any){
        let alert = this.altc.create({
            title:'Plz Notice',
            subTitle:msg,
            buttons:['OK']
        });
        alert.present();
    }

    showToast(msg:any){
        let toast = this.toast.create({
            message:msg,
            duration:3000
            });
            toast.present();
        }
}