import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { TabsPage } from '../tabs/tabs';

import { PersonPage } from '../person/person';

import { AlertController } from 'ionic-angular';

import { EmailComposer } from '@ionic-native/email-composer';

import { SMS } from '@ionic-native/sms';

@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  VSCode="1234";
  username:string;
  usermail:string;
  private mail:any;
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData,public alertCtrl: AlertController,public person:PersonPage) { //private sms: SMS,private emailComposer: EmailComposer
    this.mail=
    {
      name:'',
      email:'',
      phone:'',
      code:''
    }
  }

  getUsername() {
    this.userData.getUsername().then((name) => {
      this.mail.name = name;
    });
  }

  getmail() {
    this.userData.getmail().then((email) => {
      this.mail.email = email;
    });
  }

  getphone() {
    this.userData.getphone().then((phone) => {
      this.mail.phone = phone;
    });
  }

  getcode() {
    this.userData.getcode().then((code) => {
      this.mail.code = code;
    });
  }

  Email() {
    let alert = this.alertCtrl.create({
      title: 'Forget Password',
      subTitle: "Enter your Username and E-mail to change your password"+this.mail.name+this.mail.email+"**",

      });
      alert.addInput({
        type:'prompt',
        name: 'username',
        value: this.mail.name,
        placeholder: 'username'
      });
      alert.addInput({
        type:'prompt',
        name: 'e-mail',
        value: this.mail.email,
        placeholder: 'e-mail'
      });

      alert.addButton({
        text: 'Cancel',
        handler: (data: any) => {
          this.ForgetPW();
        }
      });

      alert.addButton({
          text: 'Submit',
          handler: (data: any) => {
            this.getUsername();//不知道有沒有存到值
            this.getmail();//同上
            this.Email_Sending();
            this.Enter_VSCode();//輸入VSCode後顯示更改密碼介面
          }
        });  
    
        alert.present();
      }

      SMS() {
        let alert = this.alertCtrl.create({
          title: 'Forget Password',
          subTitle: "Enter your Username and Phone Number to change your password"+this.mail.name+this.mail.phone+"**",
    
          });
          alert.addInput({
            type:'prompt',
            name: 'username',
            value: this.mail.name,
            placeholder: 'username'
          });
          alert.addInput({
            type:'prompt',
            name: 'phone_number',
            value: this.mail.phone,
            placeholder: 'phone number'
          });
    
          alert.addButton({
            text: 'Cancel',
            handler: (data: any) => {
              this.ForgetPW();
            }
          });
    
          alert.addButton({
              text: 'Submit',
              handler: (data: any) => {
                this.getUsername();//不知道有沒有存到值
                this.getphone();//同上
                this.SMS_Sending();
                this.Enter_VSCode();//之後輸入VSCode後顯示更改密碼介面
              }
            });  
        
            alert.present();
          }

  ForgetPW() {
    let alert = this.alertCtrl.create({
      title: 'Forget Password',
      subTitle: "How to change your password?",
      });
        alert.addButton({
          text: 'By E-mail',
          handler: (data: any) => {
            this.Email();
          }
        });
        alert.addButton({
          text: 'By SMS',
          handler: (data: any) => {
            this.SMS();
          }
        });
        alert.present();
      }


  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.navCtrl.push(TabsPage);
    }
  }
  Email_Sending(){
   /* this.emailComposer.isAvailable().then((available: boolean) =>{//check whether email is available
    if(available) {
      //Now we know we can send
    }
   });
   
   let email = {
     to: this.mail.email,
     //cc: 'erika@mustermann.de',
     //bcc: ['john@doe.com', 'jane@doe.com'],
     subject: 'Forget Password',
     body: 'Dear @username, the VCode is '+ this.VSCode,
     isHtml: true
   };
   
   // Send a text message using default options
   this.emailComposer.open(email);*/
  }
  
  SMS_Sending(){
    //this.sms.send(this.mail.phone, this.VSCode);
  }
  Enter_VSCode(){
    let alert = this.alertCtrl.create({
      title: 'Forget Password',
      subTitle: "Please enter the VSCode to change your password",
      });
      alert.addInput({
        type:'prompt',
        name: 'VSCode',
        value: this.mail.name,
        placeholder: 'VSCode'
      });
        alert.addButton({
          text: 'Submit',
          handler: (data: any) => {
            this.getcode();
            if(this.mail.code == this.VSCode){//顯示更改密碼介面
              this.person.changePassword();
            }
          }
        });
        alert.present();
  }
}
