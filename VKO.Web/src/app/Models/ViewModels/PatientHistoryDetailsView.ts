import { PatientHistory } from '../PatientHistory';
import { AllergyTran } from '../AllergyTran.model';
import { PACInvestigation } from '../PACInvestigation';
import { PACExamination } from '../PACExamination';
import { BirthHistory } from '../BirthHistory';

export class PatientHistoryViewModels {

  listofHistory: Array<PatientHistory>;
  Userid: string;
}


export class PatientHistoryViewModel {

  History: PatientHistory = new PatientHistory();

  listofHistory: Array<PatientHistory>;
  PatientHistoryDetails: Array<PatientHistoryDetails> = [];
  AllergyTran: Array<AllergyTran> = [];
  PACExamination: PACExamination = new PACExamination();
  BirthHistory: BirthHistory = new BirthHistory();
  // FDDTDescriptionDetails: Array<FDDTDescriptionDetail> = [];
  // SYRINGINGDescriptionDetails: Array<FDDTDescriptionDetail> = [];
}

export class PatientHistoryDetails {
  ID: number;
  Description: string;
  FromUTC: string;
  Duration: string;
}



export class FDDTDescriptionDetail {
  ID: number;
  UIN: string;
  VISITDATE: Date;
  FDDTSYRINGEID: number;
  FDDTDESCRIPTION: string;
  REMARKS: string;
  CREATEDBY: number;
  CMPID: number;
  REGTRANID: number;
  Status: string;
  REGURGITATION: string;
  FLUID: string;
  Eye: string;
  Stop: string;
  Doctor: string;
  DoctorID: number;
  // UPDATEDBY: number;
  // CreatedUTC: Date;
  // UpdatedUTC: Date;
}
