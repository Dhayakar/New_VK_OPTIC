import { PACHistoryModel } from '../PACHistoryModel';
import { PACHistoryTranModel } from '../PACHistoryTranModel';
import { PACExamination } from '../PACExamination';
import { PACInvestigation } from '../PACInvestigation';
import { number } from '@amcharts/amcharts4/core';
import { PACPreOperativeInstruction } from '../PACPreOperativeInstruction';

export class PACViewM {
  PACHistoryModel: PACHistoryModel = new PACHistoryModel();
  PACHistoryTranModel: PACHistoryTranModel = new PACHistoryTranModel();
  PACExamination: PACExamination = new PACExamination();
  PACInvestigation: PACInvestigation = new PACInvestigation();
  PACPreOperativeInstruction: PACPreOperativeInstruction = new PACPreOperativeInstruction();
  AddPAHDet: Array<AddPAHDet> = [];
  pushData: Array<pushData> = [];
  Beforeinductionoana: Array<Beforeinductionoana> = [];
  Cmpid: number;
  SAID: number;
  CreatedBy: number;
  DoctorID: number;
}


export class Beforeinductionoana {

  SSCID: number;
  SSCRID: number;
  Description: string;
  Question: string;
  Questiontowhom: string;
  Yes: boolean;
  No: boolean;
  NA: boolean;
  Yess: boolean;
  Noo: boolean;
  NAA: boolean;
  chkYes: boolean;
  chkNo: boolean;
  chkNA: boolean;
  checkStatusYes: boolean;
  checkStatusNo: boolean;
  checkStatusNA: boolean;
  OLMID: number;
  ID: number;
}

export class AddPAHDet {

  PACHDosage: string;
  PACHFrequency: string;
  PACHGenericName: string;
  PACHDrugName: string;
  PACHDesc: string;
}

export class pushData {
  DrugName: string;
  GenericName: string;
  Dosage: string;
  frequency: string;
  DrugDescription: string;
}


export class datagrid {
  DrugName: string;
  GenericName: string;
  Dosage: string;
  frequency: string;
  DrugDescription: string;
  DrugID: number;
}



