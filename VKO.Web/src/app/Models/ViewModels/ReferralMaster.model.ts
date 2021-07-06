import { Referral_Master } from '../referralmaster.model';
import { Referral_Patients_HDR } from '../ReferralPatientHDRWebModel';

export class ReferralMaster {


  ReferralMaster: Referral_Master = new Referral_Master();
  Referral: Referral_Patients_HDR = null;
  Refdetail: Array<Refdetail> = [];
}
export class Refdetail {

  Referral_Code = '';
  Referral_Name = '';
  Phone_No = '';
  Email_Id = '';
  Referral_Address1 = '';
  Referral_Address2 = '';
  Referral_Address3 = '';
  Contact_Person = '';
}
