import { Registration_Master } from '../RegistrationMasterWebModel';
import { RegistrationTran_Master } from '../RegistrationTranMasterWebModel ';
import { OneLine_Master } from '../OneLineMaster';
import { RegistrationExtension } from '../RegistrationExtensionWebModel';
import { DateTime } from 'wijmo/wijmo';
import { Payment_Master } from '../PaymentWebModel ';



export class RegistrationMasterI {
  // KinNDetails: PatientKINDetails = new PatientKINDetails();
  // kinDetails: Array<PatientKINDetails> = [];

  RegistrationMaster: Registration_Master = new Registration_Master();
  RegistrationTranMaster: RegistrationTran_Master = new RegistrationTran_Master();
  RegistrationExtension: RegistrationExtension = new RegistrationExtension();
  Patientlist: Array<Patientlists> = [];
  PatientVSInsurance: Array<PatientVSIns> = [];
  paymentREG: Array<paymentR> = [];
  PatientAssignStatus: Array<PatientAssignStatus> = [];
  BRule: Array<Business_Rule> = [];
  OneLineMaster: OneLine_Master = new OneLine_Master();
  MastersName: string;
  NV1: string;
  NV2: string;
  Companyname: string;
  CampUIN: string;
  AppUIN: string;
}

export class PatientVSIns {

 
  InsurancevsMiddlemenID: number;
  PolicyName: string;
  PolicyNo: string;
  PolicyTakenOn: Date;
  PeriodFrom: Date;
  PeriodTo: Date;
  IsJointPolicy: boolean;
  SumAssured: number;
  AmountAvailed: number;
  IsActive: boolean;
  IsTransacted: boolean;
  Remarks: string;


}

export class Business_Rule {
  BRID: number;
  From: number;
  TO: number;
  Amount: number;
  NoofDays: number;
  CountOfRegTran: number;
}

export class RegistrationMaster {
  RegistrationMaster: Registration_Master = new Registration_Master();
  RegistrationTranMaster: RegistrationTran_Master = new RegistrationTran_Master();
  RegistrationExtension: RegistrationExtension = new RegistrationExtension();
  onelinemaster: OneLine_Master = new OneLine_Master();
  Regdetail: Array<Regdetail> = [];
  Excelimport: Array<Registration_Master> = [];
  Patientlist: Array<Patientlist> = [];
  RevPatientlist: Array<RevPatientlist> = [];
  //PatientAssignStatus: Array<PatientAssignStatus> = [];
  opticalhistorytab1: Array<opticalhistorytabb> = [];
  CompanyID: string;
  password: string;
  confirmpasswword: string;
  oldpassword: string;
  userid: number;
  TypeofVisit: number;
  Status: string;
  Remarks: string;
  UIN: string;
  PTotalAmountcon1: number;
  userroleID: string;
  PIECHARTDETAILSs: Array<PIECHARTDETAILS> = [];
  PaymentMaster: Array<Payment_Master> = [];
  PaymentMastermas: Payment_Master = new Payment_Master();
  fndid: number;

  AppointmentStatus: string;
  APpointmentSceduleDate: DateTime;
  AppointmentCancellationReasons: string;
  Appointmentmemberd: string;

  Appointmentuserid: string;
  Hour: string;
  Mnute: string;


  Exceluploaddataa: Array<Exceluploaddata> = [];


}



export class Exceluploaddata {
  Name: string;
  Age: number;
  Gender: string;
  AppointmentDate: string;
  Purpose: string;
  Status: number;
  CancelledDate: string;
  Bookedby: string;
  PreferredDoctor: string;

}

export class PIECHARTDETAILS {

  Amount: number;
  Desc: string;

}

export class opticalhistorytabb {

  Type: number = null;
  Ocular: string = null;
  DistSph: string = null;
  NearCyl: string = null;
  PinAxis: string = null;
  Add: string = null;
  Remarks: string = null;

}

export class paymentR {
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
  UIN: string;
  PaymentReferenceID: number;

}



export class Patientlists {

  // /////////KinNDetailsReg///////
  Relationship: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  ContactNumber: number;
  EmailID: string;
  PrimaryKinId: boolean;

}

export class Assign {
  PatientAssignStatus: Array<PatientAssignStatus> = [];
  Cancellatioreasons: string;
  CancellatioreasonsSeparation: string;
  PAtientstatus: string;
  UserRole: string;
  appointmenttime: string;
  appointmentdate: string;
  Eyedoctor: string;
  Cmpid: string;
}

export class billingdetails {
  UIN: string;
  Name: string;
  TreatmentAdvice: string;
  consultationamount: string;
}

export class Regdetail {

  UIN: string;
  CMPID: number;
  DateofRegistration: Date;
  Name: string;
  Age: number;
  DateofBirth: Date;
  Gender: string;
  Address1: string;
  Address2: string;
  Address3: string;
  FatherHusbandName: string;
  Occupation: string;
  Phone: string;
  AadharNumber: string;
  EmailID: string;
  SourceofReferralID: number;
  ReferralPhone: string;
  DateofVisit: Date;
  TypeofVisit: number;
  Status: number;
  StatusDateTime: Date;
  Remarks: string;

}
export class Patientlist {

  UIN: string;
  Name: string;
  DOR: Date;
  Age: number;
  Sex: string;
  DateofBirth: Date;
  Remarks: string;
  Status: string;


}
export class RevPatientlist {

  RUIN: string;
  RName: string;
  DOV: Date;
  RAge: number;
  RSex: string;
  FDate: Date;
  RStatus: string;



}
export class PatientAssignStatus {
  RegistrationTranID: number;
  StatusID: string;
  DoctorID: number;
  OptometristcID: number;
  VisionID: number;
  /////// paymentreg/////
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
  // UIN: string;
  PaymentReferenceID: number;
  PAmount: number;
  Visittype: string;
}
