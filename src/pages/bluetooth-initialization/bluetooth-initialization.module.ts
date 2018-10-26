import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BluetoothInitializationPage } from './bluetooth-initialization';

@NgModule({
  declarations: [
    BluetoothInitializationPage,
  ],
  imports: [
    IonicPageModule.forChild(BluetoothInitializationPage),
  ],
})
export class BluetoothInitializationPageModule {}
