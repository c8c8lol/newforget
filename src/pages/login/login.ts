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
import * as firebase from 'firebase';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  Vid:any;
  code: string = "";
  VSCode="1234";
  username:string;
  usermail:string;
  private mail:any;
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData,public alertCtrl: AlertController,private emailComposer: EmailComposer,private sms: SMS) { //public person:PersonPage,
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



  Email() {
    let alert = this.alertCtrl.create({
      title: 'Forget Password',
      subTitle: "Enter your Username and E-mail to change your password",

      });
      alert.addInput({
        type:'prompt',
        name: 'userfname',
        placeholder: 'username'
      });
      alert.addInput({
        type:'prompt',
        name: 'userfmail',
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
            //console.log(JSON.stringify(data)); //to see the object
            console.log(data.userfname);
            console.log(data.userfmail);
            //this.present_alert(data.userfmail);
            this.Email_Sending(data.userfname,data.userfmail);
            this.Enter_VSCode();//輸入VSCode後顯示更改密碼介面
          }
        });  
    
        alert.present();
      }

      SMS() {
        let alert = this.alertCtrl.create({
          title: 'Forget Password',
          subTitle: "Enter your Username and Phone Number to change your password",
    
          });
          alert.addInput({
            type:'prompt',
            name: 'userfname',
            placeholder: 'username'
          });
          alert.addInput({
            type:'prompt',
            name: 'userfphone',
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
                console.log(data.userfname);
                console.log(data.userfphone);
                this.userData.settestname(data.userfname);
                this.SMS_Sending(data.userfname,data.userfphone);
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
  Email_Sending(userfname,userfmail){
    
   this.emailComposer.open({
    to:      userfmail,
    //cc:      'erika@mustermann.de',
    //bcc:     ['john@doe.com', 'jane@doe.com'],
    subject: 'Forget Password',
    body:    'Dear '+userfname+', the VCode is '+ this.VSCode
    });   
  }
  
  SMS_Sending(userfname,userfphone){
    this.sms.send(userfphone, 'Dear'+userfname+',your VSCode is'+this.VSCode);
  }
  Enter_VSCode(){
    let alert = this.alertCtrl.create({
      title: 'Forget Password',
      subTitle: "Please enter the VSCode to change your password",
      });
      alert.addInput({
        type:'prompt',
        name: 'VSCode',
        placeholder: 'VSCode'
      });
        alert.addButton({
          text: 'Submit',
          handler: (data: any) => {
            console.log(data.VSCode);
            if(data.VSCode == this.VSCode){//顯示更改密碼介面
              this.present_alert();
              //this.person.changePassword();
            }
          }
        });
        alert.present();
  }

  present_alert(){
    alert('changing password');
  }
  
}