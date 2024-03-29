import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  
  public items : Array<any>;
  public form: FormGroup;

  public email: any;

  private _HOST : string 			=	"http://localhost:4201/";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private _FB: FormBuilder,
              private _HTTP: HttpClient,
              private _TOAST: ToastController) 
  {
    this.form = this._FB.group({
      'email': ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
    });
  }

  validation_messages = {
      'email': [
        { type: 'required', message: 'E-mail is required.' },
        { type: 'pattern', message: 'Email is incorrect.' }
      ],
    }

  displayNotification(message : string) : void
  {
     let toast = this._TOAST.create({
        message 	: message,
        duration 	: 3000
     });
     toast.present();
  }



  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Password Reset',
      message: 'Do you want to get a password reset link to the followng email address?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Reset',
          handler: () => {
            console.log('Your password was successfully reset..!');
            this.displayNotification("Link has been sent to your email");
          }
          
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  onSubmit(){
    let email: any = this.form.controls['email'].value,
      headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = {email: email},
      
      url: any = this._HOST + "forgotpassword/reset";
      this._HTTP
      .post(url, options, headers)
      .subscribe((data: any) => {
        if(data.state){
          this.presentConfirm();
          
        }else{
          this.displayNotification("Invalid Email");
        }      
      },
        (error: any) => {
          console.dir(error);
        });
  }



}
