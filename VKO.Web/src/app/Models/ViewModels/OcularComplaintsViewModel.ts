import { CurrentMedication } from '../CurrentMedication';
import { OcularComplaints } from '../OcularComplaints';
import { Patientgeneralwebmodel } from '../PatientGeneral';
import { OneLine_Master } from '../OneLineMaster';

export class OcularComplaintsViewModel {
  complaints: OcularComplaints = new OcularComplaints();
  listofcomplaints: Array<OcularComplaints>;
  ComplaintsDetails: Array<ComplaintsDetails> = [];
  Userid: string;
  familyhistory: string;
  patientgeneral: Patientgeneralwebmodel = new Patientgeneralwebmodel();
  OcularComplaintsNew: Array<OcularComplaintsNew> = [];
  systemicconditionsNew: Array<systemicconditionsNew> = [];
  CurrentMedications: Array<CurrentMedication> = [];
  OneLineMaster: OneLine_Master = new OneLine_Master();
  Role: string;
  Registrationtranid: string;
  CMPID: string;

}

export class ComplaintsDetails {
  ID: number;
  Description: string;
  ISOD: boolean;
  ISOS: boolean;
  ISOU: boolean;
}
export class OcularComplaintsNew {

  ID: number;
  Description: string;
  ISOD: boolean;
  ISOS: boolean;
  ISOU: boolean;
  Reasons: string = null;
  Actions: string;
  FromDate: Date;
  Totalmonths: string;
  CMPID: string;
  Doctoruserid: string;
  Remarks: string;

}
export class systemicconditionsNew {
  Remarks: string;
  ID: number;
  Description: string;
  Reasons: string = null;
  Actions: string;
  FromDate: Date;
  Totalmonths: string;
  CMPID: string;
  Doctoruserid: string;

}
