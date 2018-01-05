import { Component } from '@angular/core';
import { NavController, Refresher } from 'ionic-angular';
import { LeaveFormPage } from '../../pages/leave-form/leave-form';
//import { AlertController } from 'ionic-angular';
//import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';


@Component({
  selector: 'page-leave',
  templateUrl: 'leave.html'
})
export class LeavePage {

  constructor(public navCtrl: NavController) {

  }

  showLeaveForm() {
    this.navCtrl.push(LeaveFormPage);
}

}
