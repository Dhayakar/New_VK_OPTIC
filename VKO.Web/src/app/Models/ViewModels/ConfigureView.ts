
import { Configure } from '../configure.model';
import { configuretrans } from '../configuretrans';
import { ClassStmt } from '@angular/compiler';


export class ConfigureView {


  ConfigureTranss: Array<configuretrans> = [];
  //selected: Array<selected> = [];
  details: Array<details> = [];
  Add_Det: Array<Add_Det> = [];

  Cons: Configure = new Configure();

  // ConfigureDetails1: Array<ConfigureDetails1> = [];
}

export class selected {

}


export class details {

  CMPID: number;
  id: number;
  RRDescription: string;
  RRAdvDays: number;
  FrequencyperDay: number;
  HostEmailID: string;
  Phonenumber: string;
  Frequencytime: string;
  SendSMS: string;
  SendEmail: string;

}


//export class ConfigureDetails1 {

//  id: number;
//  RRDescription: string;
//  RRAdvdays: number;
//  FrequencyperDay: number;
//  HostEmailID: string;
//  HostPassword: string;
//  Phonenumber: string;
//  SendSMS: boolean;
//  SendEmail: boolean;
//  Frequencytime: string;




//}

export class Add_Det {

  RRDescription: string;
  RRAdvDays: number;
  FrequencyperDay: number;
  Frequencytime: string;
  NotifyDoctor_SMS: boolean;
  NotifyDoctor_Mail: boolean;
  NotifyPatient_SMS: boolean;
  NotifyPatient_Mail: boolean;
  NotifyPatient_Whatsapp: boolean;
  NotifyDoctor_Whatsapp: boolean;
}
