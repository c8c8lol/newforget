import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaveFormPage } from './leave-form';

@NgModule({
  declarations: [
    LeaveFormPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaveFormPage),
  ],
})
export class LeaveFormPageModule {}
