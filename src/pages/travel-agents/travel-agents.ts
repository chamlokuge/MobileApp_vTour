import { AddNewAgentPage } from './../add-new-agent/add-new-agent';
import { EditTravelAgentPage } from './../edit-travel-agent/edit-travel-agent';
import {PackagesPage} from '../packages/packages';
import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController, NavParams,ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-travel-agents',
  templateUrl: 'travel-agents.html',
})
export class TravelAgentsPage {


  public items : Array<any>;

   private _HOST : string       =  "http://localhost:4201/";

   constructor(public navCtrl   : NavController,
      public alertController: AlertController,
           private _TOAST       : ToastController,
            private _HTTP       : HttpClient)
   {}
   ionViewDidEnter() : void
   {
      this.retrieve();
   }

    addNewAgent(){
       this.navCtrl.push(AddNewAgentPage);
    }

   retrieve() : void
   {
      this._HTTP
      .get(this._HOST + "travelagents")
      .subscribe((data : any) =>
      {
         this.items = data;
      },
      (error : any) =>
      {
         console.dir(error);
      });
   }

   deleteRecord(item : any) : void
   {
      let alert = this.alertController.create({
         title: 'Do you want to delete ?',
         buttons: [
            {     
              text: 'Confirm',
              handler: data => {
       

      let recordID     : string    = item._id,
          url         : any        = this._HOST + "travelagents/" + recordID;

      this._HTTP
      .delete(url)
      .subscribe((data : any) =>
      {
         this.retrieve();
         this.displayNotification('successfully deleted');
         this.navCtrl.pop();
      },
      (error : any) =>
      {
         console.dir(error);
      });
            }
                              },{

                                 text: 'Cancel',
                                 role: 'cancel',
                                 handler: () => {
                                 console.log('Cancel clicked');
                              }
                           }
                        ]
                     });
                     alert.present();
                  }
   updateRecord(item : any) : void
   {
     this.navCtrl.push(EditTravelAgentPage, { record : item });
   }


   displayNotification(message : string) : void
   {
      let toast = this._TOAST.create({
         message   : message,
         duration   : 3000
      });
      toast.present();
   }
}

