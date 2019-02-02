import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
/**
 * Generated class for the AddNewServiceProviderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-new-service-provider',
  templateUrl: 'add-new-service-provider.html',
})
export class AddNewServiceProviderPage {

  public items : Array<any>;
  public form: FormGroup;

  public fname: string;
  public password : any;
  public email: any;
  public address: string;
  public type : string;
  public description : string;
  public telephone: any;
  public rePassword: any;
  public username:string

  private _HOST : string 			=	"http://localhost:4201/";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _FB: FormBuilder,
    private _HTTP: HttpClient,
    private _TOAST: ToastController) {
      this.form = this._FB.group({
        'fname': ['', Validators.required],
        'password': ['', Validators.compose([
          Validators.maxLength(25),
          Validators.minLength(5),
          Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
          Validators.required
        ])],
        'rePassword': ['', Validators.required],
        'email': ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        'address': ['', Validators.required],
        'type': ['', Validators.required],
        'description': [''],
        'telephone': ['', Validators.required],
        'username': ['', Validators.compose([
          Validators.maxLength(25),
          Validators.minLength(5),
          // Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
          Validators.required
        ])],
        
      });
    }
        

  displayNotification(message : string) : void
  {
     let toast = this._TOAST.create({
        message 	: message,
        duration 	: 3000
     });
     toast.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewServiceProviderPage');
  }

  clearForm(): void {
    //this._ID = "";
    this.fname = "";
    this.password = "";
    this.rePassword = "";
    this.email = "";
    this.address=""
    this.type = "";
    this.description="";
    this.telephone = "";
    this.username="";
      }
      onSubmit(){
        let fname: any = this.form.controls['fname'].value,
        password: any = this.form.controls['password'].value,
          rePassword: any = this.form.controls['rePassword'].value,
        email: any = this.form.controls['email'].value,
          address: any = this.form.controls['address'].value,
          type: any = this.form.controls['type'].value,
          telephone: any = this.form.controls['telephone'].value,
          description: any = this.form.controls['description'].value,
          username: any = this.form.controls['username'].value,
          headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
          options: any = { fname: fname, password: password, username:username, email: email, address: address, type: type, telephone: telephone, description: description },
          url: any = this._HOST + "serviceproviders";
    
        this._HTTP
          .post(url, options, headers)
          .subscribe((data: any) => {
            console.log(url + " data " + JSON.stringify(data));
            
            this.displayNotification('Account Created Sucessfully');
            this.navCtrl.pop();
          },
            (error: any) => {
              console.dir(error);
            });
      }
      validation_messages = {
        'username': [
            { type: 'required', message: 'Username is required.' },
            { type: 'minlength', message: 'Username must be at least 5 characters long.' },
            { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
            // { type: 'pattern', message: 'Username must contain only numbers and letters.' }
          ],
          'fname': [
            { type: 'required', message: 'First Name is required.' }
          ],
          
          'email': [
            { type: 'required', message: 'E-mail is required.' },
            { type: 'pattern', message: 'Email is incorrect.' }
          ],
          'password': [
            { type: 'required', message: 'Password is required.' },
            { type: 'minlength', message: 'Password must be at least 5 characters long.' },
            { type: 'maxlength', message: 'Password cannot be more than 25 characters long.' },
            { type: 'pattern', message: 'Password must contain only numbers and letters.' }
          ],
          'address': [
            { type: 'required', message: 'Address is required.' }
          ],
          'telephone': [
            { type: 'required', message: 'Telephone Number is required.' }
          ],
          'type': [
            { type: 'required', message: 'This is a required field.' }
          ],
          'description': [
            { type: 'required', message: 'This is a required field.' }
          ]
        }

      
    }


    