import { Surgery } from "../Surgery";
import { Surgerytran } from "../SurgeryTran";
import { SurgeryDoctor } from "../SurgeryDoctor";
import { Admission } from "../Admission";
import { IntraOperative } from "../IntraOperative";
import { PreOperative } from "../PreOperative";


export class SurgeryMas {

  SurgeryMaster: Surgery = new Surgery();
  Surgerytran: Surgerytran = new Surgerytran();
  SurgeryDoctor: SurgeryDoctor = new SurgeryDoctor();
  Admission: Admission = new Admission();
  SurgeryDT1: Array<Surgerydetail1> = [];
  SurgeryDT2: Array<Surgerydetail2> = [];
  SurgeryDT3: Array<Surgerydetailprev> = [];
  Surgerydetailprev1: Array<Surgerydetailprev1> = [];
  Surgerydetailprev2: Array<Surgerydetailprev2> = [];
  Intraoperative: IntraOperative = new IntraOperative();
  PreOperative: PreOperative = new PreOperative();
 
}


export class Surgerydetail1 {
  DiagnosisId: string;
  ParentDescription: string;
  IsOD: Boolean;
  IsOS: Boolean;
  IsOU: Boolean;
}
export class Surgerydetail2 {
  Description: string;
  FromUTC: Date;
}

export class Surgerydetailprev1 {
  UIN: string;
  IODate: Date;
  AntibioticGivenBy: string;
  CaseSheetPreparedBy: string;
  Note: string;
  Instruction: string;
}
export class Surgerydetailprev2 {
  UIN: string;
  IODate: Date;
  AntibioticGivenBy: string;
  CaseSheetPreparedBy: string;
  Note: string;
  Instruction: string;
}


export class Surgerydetailprev {
  UIN: string;
  Name: string;
  DatePicker1: Date;
  DateofSurgery: Date;
  Description: string;
  Doctorname: string;
  Ocular: string;
  Complication: string;
  Treatment: string;
  PostOperativeDate: Date;
  ReviewDate: Date;
  DischargeID: number;
}
