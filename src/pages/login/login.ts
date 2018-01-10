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
present_alert(userfname){
  alert("this is user name"+userfname+"end");
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
    /*this.emailComposer.isAvailable().then((available: boolean) =>{//check whether email is available
    if(available) {
      //Now we know we can send
      let alert = this.alertCtrl.create({
        title: 'succeed!',
        subTitle: "Really!",
        });
        alert.present();
    }
    else
    {
      let alert = this.alertCtrl.create({
        title: 'Fail!',
        subTitle: "Really!",
        });
        alert.present();
    }
   });*/
   
   this.emailComposer.open({
    to:      userfmail,
    //cc:      'erika@mustermann.de',
    //bcc:     ['john@doe.com', 'jane@doe.com'],
    subject: 'Forget Password',
    body:    'Dear '+userfname+', the VCode is '+ this.VSCode
});
   /*let email = {
     to: 'teiyei5082@gmail.com',//this.mail.email
     //cc: 'erika@mustermann.de',
     //bcc: ['john@doe.com', 'jane@doe.com'],
     subject: 'Forget Password',
     body: 'Dear @username, the VCode is '+ this.VSCode,
     isHtml: true
   };
   
   // Send a text message using default options
   this.emailComposer.open(email);*/
   
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
        value: this.mail.name,
        placeholder: 'VSCode'
      });
        alert.addButton({
          text: 'Submit',
          handler: (data: any) => {
            this.getcode();
            if(this.mail.code == this.VSCode){//顯示更改密碼介面
              //this.person.changePassword();
            }
          }
        });
        alert.present();
  }


  private registerPhone(): void {
    let phone = '0028860917112927';


    (<any>window).verifyPhoneNumber(phone,60, id => {
        console.log("verificationID: " + id);
        this.Vid = id;
        this.showPrompt();
    }, error => {
        console.log("error: " + error);
    });
}

private verifyCode(code): void {
    console.log(code);

    let credential = firebase.auth.PhoneAuthProvider.credential(this.Vid, code);

    firebase.auth().signInWithCredential(credential).then((res) => {
        console.log('SCC', res);
        this.doLogin()
    })
}

private skip(): void {
    this.doLogin();
}

private showPrompt() {
    let prompt = this.alertCtrl.create({
        title: 'Verify',
        message: 'Type code that was received via SMS',
        inputs: [
            {
                name: 'code',
                placeholder: 'Code'
            },
        ],
        buttons: [
            {
                text: 'Cancel',
                handler: data => {
                    return;
                }
            },
            {
                text: 'Verify',
                handler: data => {
                    this.verifyCode(data.code);
                }
            }
        ]
    });
    prompt.present();
}

private doLogin() {
  this.navCtrl.push(TabsPage);
}
}