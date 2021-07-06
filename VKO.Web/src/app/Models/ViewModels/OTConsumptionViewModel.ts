import { DateTime } from 'wijmo/wijmo';

export class OTConsumption {
  Tc: number;
  CreatedBy: number;
  Cmpid: number;
  OTItemDetails: Array<OTItemDetails> = [];
  SurgeryPerformedDoctors: Array<SurgeryPerformedDoctor> = [];
  BeforeSkinIncisions: Array<BeforeSkinIncision> = [];
  BeforePatientLeaves: Array<BeforePatientLeaves> = [];
  UIN: string;
  storeID: number;
  OTNotes: number;
  FromTime: string;
  ToTime: string;
  SAID: string;
  Monitoring: Monitoring = new Monitoring();
  AnaesthesiaDrug: Array<AnaesthesiaDrugUsed> = [];
  IntraOperativeNotes: Array<IntraOperativeNote> = [];
  OtImages: Array<OtImage> = [];
  SurgeryPackageCost: number;
  LensDescription: string;
  SurgeryId: string;
  AdmID: string;
  SurgeryDateTime: DateTime;
}

export class BatchlistDetails {
  BatchNo: string;
  TotalQty: number;
  BalanceQty: number;
  ExpireInDays: string;
  CriticalIntervalDay: string;
  RetestIntervalDays: string;
  ExpiryDate: string;
  RetestIntervalDate: Date;
  CriticalIntervalDate: Date;
  QtyTaken: number;
}



export class OTItemDetails {
  Brand: string;
  DrugID: number;
  AvailQuantity: number;
  Quantity: number;
  UOM: string;
  GenericName: string;
  IsSerial: boolean;
  SerialsInfo: [];
  SelectedList: [];
  BatchInfo: Array<BatchlistDetails> = [];
  SelectedBatchQty: number;
  DrugCategory: string;
  Rate: number;
}


export class BeforeSkinIncision {
  Questions: string;
  ToWhom: string;
  Yes: boolean;
  No: boolean;
  NA: boolean;
  Description: string;
  DisabledYes: boolean;
  DisabledNo: boolean;
  DisabledNA: boolean;
  Sscid: number;
  OLMID: number;
}


export class BeforePatientLeaves {
  Questions: string;
  ToWhom: string;
  Yes: boolean;
  No: boolean;
  NA: boolean;
  Description: string;
  DisabledYes: boolean;
  DisabledNo: boolean;
  DisabledNA: boolean;
  Sscid: number;
}


export class Monitoring {
  ECG: boolean;
  ECGLeadsDesc: string;
  SpO2: boolean;
  SpO2SiteDesc: string;
  Temp: string;
  TempDesc: string;
  FiO2: boolean;
  ETCO2: boolean;
  ETCO2Desc: string;
  InspETAA: boolean;
  AirwayPress: boolean;
  NIBP: boolean;
  IBP: boolean;
  IBPSiteDesc: string;
  CVP: boolean;
  CVPSiteDesc: string;
  PCWP: boolean;
  Resp: boolean;
  RespSource: string;
  BloodLoss: boolean;
  UrineOutput: boolean;
}

export class AnaesthesiaDrugUsed {
  Brand: string;
  DrugID: number;
  AvailQuantity: number;
  Quantity: number;
  UOM: string;
  GenericName: string;
  IsSerial: boolean;
  SerialsInfo: [];
  SelectedList: [];
  BatchInfo: Array<BatchlistDetails> = [];
  SelectedBatchQty: number;

  timeHH: string;
  timeMM: string;
  IsAnaesthesia: boolean;
  ConsumedUOM: string;
  ConsumedQuantity: number;
//  ActConsumption: number
}

export class IntraOperativeNote {
  IOProcedureTempID: number;
  IOTempTranID: number;
  OTNotesDescription = '';
  UserInputType = '';
  InputValue: Array<string> = [];
  GivenInputValue: string;
}

export class OtImage {
  ImagePath: string;

}


export class SurgeryPerformedDoctor {
  ID:number
}
