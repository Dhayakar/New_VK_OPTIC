import { MedicalPrescription } from '../medicalprescription.model';
import { MedicalPrescriptionTran } from '../medicalprescriptiontrans.model';
import { ICDMaster } from '../icdmaster.model';
import { OneLine_Master } from '../OneLineMaster';
import { RegistrationMaster } from './RegistrationMasterWebViewModel ';
import { Registration_Master } from '../RegistrationMasterWebModel';
import { UploadMedicalPrescription } from '../UploadMedicalPrescription.model';





export class Medical_Prescription {

  MedicalPrescription: MedicalPrescription = new MedicalPrescription();
  MedicalPrescriptionTran: MedicalPrescriptionTran = new MedicalPrescriptionTran();
  MPT: Array<MedicalPrescriptionTran> = [];
  UploadMedicalPrescription: Array<UploadMedicalPrescription> = [];
  ICDMaster: ICDMaster = new ICDMaster();
  OneLineMaster: OneLine_Master = new OneLine_Master();
  Patientlist: Array<Patientlist> = [];
  Registration: Registration_Master = new Registration_Master();
  MedBill: Array<MedBill> = [];
  MedData: Array<MedData> = [];
  DrugInfo: Array<DrugInfo> = [];
  Medlistss: Array<Medlist> = [];
  TapDrug: Array<TapDrug> = [];
  tempDesc: Array<tempDesc> = [];
  tdesc: string = null;
  did = 0;
  uid = 0;
  medicineid = 0;
  cmpid = 0;

}

export class TapDrug {

  drugid: number;
  drugname: string;
  
}

export class tempDesc {

  TempDesc: string;

}

export class Medlist {

  ICD_DESCRIPTION: string;
  uom: string;
  Brand: string;
  Quantity: string;
  Frequency: string;
  Eye: string;
  Food: string;
  Days: number;


}



export class Patientlist {

  ICD_DESCRIPTION: string;
  Brand: string;
  Dossage: string;
  Frequency: string;
  Eye: string;
  Food: string;
  FromDate: Date;
  ToDate: Date;

}

export class drgdtl {

  Brand: string;
  MedicineName: string;
  DrugGroup: string;
  Manufacturer: string;


}

export class MedBill {

  Bill: string;
  DocName: string;
  BillDate: Date;

}


export class MedData {

  DrugName: string;
  Dose: string;
  Freq: string;
  Foodd: string;
  Tdays: number;
  MFromDate: Date;
  MToDate: Date;

}

export class DrugInfo {

  DrugName: string;
  sideeffect: string;
  precaution: string;
  overdose: string;

}

