import { Registration_Master } from '../RegistrationMasterWebModel';
import { RegistrationTran_Master } from '../RegistrationTranMasterWebModel ';
import { OneLine_Master } from '../OneLineMaster';
import { Payment_Master } from '../PaymentWebModel ';
import { Surgery_Master } from '../SurgeryMasterWebModel';
import { SurgeryTran_Master } from '../SurgeryTranWebModel';
import { SurgeryCarriedOutDetails_Master } from '../SurgeryCarriedOutDetailsWebModel ';
import { Doctor_Master } from '../DoctorMaster.model';
import { ICD_Code_Master } from '../IcdMaster';
import { ICDMaster } from '../icdmaster.model';
import { surgeryadddetails } from '../surgeryadddetails';



export class SurgeryMaster {


  RegistrationMaster: Registration_Master = new Registration_Master();
  RegistrationTranMaster: RegistrationTran_Master = new RegistrationTran_Master();
  onelinemaster: OneLine_Master = new OneLine_Master();
  SurgeryMaster: Surgery_Master = new Surgery_Master();
  SurgeryTranMaster: SurgeryTran_Master = new SurgeryTran_Master();
  SurgeryCarriedOutDetailsMaster: SurgeryCarriedOutDetails_Master = new SurgeryCarriedOutDetails_Master();
  PaymentMaster: Payment_Master = new Payment_Master();
  DoctorMaster: Doctor_Master = new Doctor_Master();
  ICDMaster: ICDMaster = new ICDMaster();
  Surgerydetail: Array<Surgerydetail> = [];
  surgeryalldetails: Array<surgeryadddetails> = [];



}
export class Surgerydetail {

  UIN: string;
  Name: string;
  Age: number;
  DateofBirth: Date;
  Gender: string;
  Address1: string;
  Address2: string;
  Address3: string;


}



