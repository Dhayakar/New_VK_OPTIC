
import { DiagnosisVSMedicine } from '../diagnosisvsmedicine';



export class diagnosisvsmedicine {


  DiagnosisVSMedicine: Array<DiagnosisVSMedicine> = [];
  SpecialityDetaildm: Array<SpecialityDetaildm> = [];
  SSpecialityDetaildm: Array<SSpecialityDetaildm> = [];
  Code: number;
  SubCode: string;
  CompanyID: string;
  UserID: string;

}
export class SpecialityDetaildm {
  Description: string;
  Descriptionsub: string;
  Select: boolean;
}

export class SSpecialityDetaildm {
  Description: string;
  Descriptionsub: string;
  Select: boolean;
}
