import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ControlPage } from './control';

@NgModule({
  declarations: [
    ControlPage,
  ],
  imports: [
    IonicPageModule.forChild(ControlPage),
  ],
})
export class ControlPageModule {}
