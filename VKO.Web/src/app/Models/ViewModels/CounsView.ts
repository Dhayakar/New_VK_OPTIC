import { Counselling } from '../Counselling';
import { DateTime, clamp } from 'wijmo/wijmo';
import { Time } from '@angular/common';

export class SURGDETAILS {
  surgeondetails: Array<Surgeondetails> = [];
  anesthetistdetails: Array<Anesthetistdetails> = [];
}



export class savingCounsellingdetails {
  //Surgeondetail: Array<Surgeondetails> = [];
  Mergedetail: Array<Mergeddetails> = [];
  //Anesthetistdetails: Array<Anesthetistdetails> = [];
  Checklistdetailsss: Array<ChecklistDetails> = [];
  PaymentdetailsAdvance: Array<PaymentdetailsAdvance> = [];
  PatientCounsellingDtls: PatientCounsellingDetails = new PatientCounsellingDetails();
  compnayid: string;
  Userid: string;
  Transactionid: string;
  Reasons: string;
  UINSS: string;
}





export class Mergeddetails {
  Doctornames: string;
  Designation: string;
}


export class Checklist {
  Cps: Counselling = new Counselling();
  ConslgDetails: Array<ConslgDetails> = [];
  //Checklistdetailsss: Array<ChecklistDetails> = [];
  //PaymentdetailsAdvance: Array<PaymentdetailsAdvance> = [];
  //PatientCounsellingDtls: PatientCounsellingDetails = new PatientCounsellingDetails();
}
export class Anesthetistdetails {
  IDS: string;
}
export class Surgeondetails {
  IDS: string;
  }
//export class SUrgeondetailssss {
//  IDSSS: string;
//}


export class PatientCounsellingDetails {

  Scheduleddate: DateTime;
  Fromtime: DateTime;
  ToTime: DateTime;
  //Surgeon: string;
  //Anesthiest: string;
  RoomID: string;
  Patienttype: string;
  Typeoflens: string;
  Pgognosis: string;
  Roomstatus: string;
  Remarks: string;
  UIN: string;
}


export class PaymentdetailsAdvance {

  PaymentFor: string;
  PaymentAgainstID: number;
  PaymentMode: string;
  InstrumentNumber: string;
  Instrumentdate: Date;
  BankName: string;
  BankBranch: string;
  Expirydate: Date;
  Amount: number;
  AdvAmount: number;

}

export class ChecklistDetails {
  ItemDescription: string;
  Select: boolean;
}


export class ConslgDetails {

  Description: string;
  Type: number;
  ID: number;
  CreatedBy: number;
  IsDeleted: boolean;
  Type1: string;
}
