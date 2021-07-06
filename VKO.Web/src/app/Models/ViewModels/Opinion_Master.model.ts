
import { Opinion_Master } from "../Opinion.model"
import { RegistrationTran_Master } from "../registrationtrans.model"
import { OneLine_Master } from "../OneLineMaster"
import { Doctor_Master } from '../DoctorMaster.model';

export class OpinionRef {

  OpinionMaster: Opinion_Master = new Opinion_Master();
  RegistrationTran: RegistrationTran_Master = new RegistrationTran_Master();
  OneLineMasters: OneLine_Master = new OneLine_Master();
  Doctormaster: Doctor_Master = new Doctor_Master();

  UIN: string;
}
