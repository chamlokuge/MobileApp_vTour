import { TravelAgentsPage } from './../travel-agents/travel-agents';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-add-new-agent',
  templateUrl: 'add-new-agent.html',
  //  'search/template.html',
})



export class AddNewAgentPage {
  public items : Array<any>;
  public form: FormGroup;

  public fname: string;
  public lname: string;
  public username: string;
  public password: any;
  public email: any;
  public address: string;
  public isadmin: any;
  public telephone: [string];
  public rePassword :any;

  private _HOST : string 			=	"http://localhost:4201/";


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _FB: FormBuilder,
              private _HTTP: HttpClient,
              private _TOAST: ToastController)
              
  {
    this.form = this._FB.group({
      'fname': ['', Validators.required],
      'lname': ['', Validators.required],
      'username': ['', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        // Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])],
      'email': ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      'password': ['', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])],
      'rePassword': ['', Validators.required],
      'isadmin': ['', Validators.required],
      //'profilepic': ['', Validators.required],
      'telephone': ['', Validators.required],
      'address': ['', Validators.required],
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
    console.log('ionViewDidLoad AddNewTravelAgentFormPage');
  }



    /*if (this.navParams.get("record")) {
      this._HTTP
        .put(url + '/' + this._ID, options, headers)
        .subscribe((data: any) => {
          // If the request was successful clear the form of data
          // and notify the user
          this.clearForm();
          this.displayNotification(fname + 'Put was successfully updated');
        },
          (error: any) => {
            console.dir(error);
          });
    }*/

  clearForm(): void {
    //this._ID = "";
    this.fname = "";
    this.lname = "";
    this.address=""
    this.username = "";
    this.email = "";
    this.password = "";
    this.rePassword="";
    this.isadmin = false;
    //this.profilepic = "";
    this.telephone = [null];
  }

  onSubmit(){
    let fname: any = this.form.controls['fname'].value,
      lname: any = this.form.controls['lname'].value,
      usrename: any = this.form.controls['username'].value,
      address: any = this.form.controls['address'].value,
      email: any = this.form.controls['email'].value,
      password: any = this.form.controls['password'].value,
      //rePassword: any = this.form.controls['rePassword'].value,
      isadmin: any = this.form.controls['isadmin'].value,
      // profilepic: any = this.form.controls['profilepic'].value,
      telephone: any = this.form.controls['telephone'].value,
      headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { fname: fname, lname: lname, username: usrename, email: email, password: password, isadmin: isadmin, telephone: telephone, address: address },
      url: any = this._HOST + "travelagents";

    this._HTTP
      .post(url, options, headers)
      .subscribe((data: any) => {
        console.log(url + " data " + JSON.stringify(data));
        this.clearForm();
        this.displayNotification('Account Created Sucessfully');
        this.navCtrl.pop();
      },
        (error: any) => {
          console.dir(error);
        });
        this.navCtrl.pop();
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
      'lname': [
        { type: 'required', message: 'Last Name is required.' }
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
      'isadmin': [
        { type: 'required', message: 'This is a required field.' }
      ],
    }
  

  

}

/*  public items : Array<any>;
  public form: FormGroup;

  //private _ID: String;
  public fname: string;
  public lname: string;
  public username: string;
  public password: any;
  public email: any;
  public address: string;
  public isadmin: any;
  //public profilepic: string;
  public telephone: [string];
  public rePassword :any;

   private _HOST : string 			=	"http://localhost:4201/";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _FB: FormBuilder,
    private _HTTP: HttpClient,
    private _TOAST: ToastController) {
      this.form = this._FB.group({
        'fname': ['', Validators.required],
        'lname': ['', Validators.required],
        'username': ['', Validators.required],
        'email': ['', Validators.required],
        'password': ['', Validators.required],
        'rePassword': ['', Validators.required],
        'isadmin': ['', Validators.required],
        //'profilepic': ['', Validators.required],
        'telephone': ['', Validators.required],
        'address': ['', Validators.required],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewAgentPage');
  }

  displayNotification(message : string) : void
  {
     let toast = this._TOAST.create({
        message 	: message,
        duration 	: 3000
     });
     toast.present();
  }

  clearForm(): void {
    //this._ID = "";
    this.fname = "";
    this.lname = "";
    this.address=""
    this.username = "";
    this.email = "";
    this.password = "";
    this.rePassword="";
    this.isadmin = false;
    //this.profilepic = "";
    this.telephone = [null];
  }

  onSubmit(){
    let fname: any = this.form.controls['fname'].value,
      lname: any = this.form.controls['lname'].value,
      usrename: any = this.form.controls['username'].value,
      address: any = this.form.controls['address'].value,
      email: any = this.form.controls['email'].value,
      password: any = this.form.controls['password'].value,
      //rePassword: any = this.form.controls['rePassword'].value,
      isadmin: any = this.form.controls['isadmin'].value,
      // profilepic: any = this.form.controls['profilepic'].value,
      telephone: any = this.form.controls['telephone'].value,
      headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
      options: any = { fname: fname, lname: lname, username: usrename, email: email, password: password, isadmin: isadmin, telephone: telephone, address: address },
      url: any = this._HOST + "travelagents";

    this._HTTP
      .post(url, options, headers)
      .subscribe((data: any) => {
        console.log(url + " data " + JSON.stringify(data));
        this.clearForm();
        this.displayNotification('Account Created Sucessfully');
      },
        (error: any) => {
          console.dir(error);
        });
  }

}
*/