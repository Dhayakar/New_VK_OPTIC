import { Patient } from '../PatientModel';
import { Registration_Master } from '../RegistrationMasterWebModel';
import { RegistrationTran_Master } from '../RegistrationTranMasterWebModel ';




export class PatientList {

  RegistrationMaster: Registration_Master = new Registration_Master

  RegistrationTran_Master: RegistrationTran_Master = new RegistrationTran_Master

  Regdetail: Array<Regdetail> = [];
}
export class Regdetail {

  UIN: string;
  Name: string;
  FromDate: Date;
  ToDate: Date;
}
