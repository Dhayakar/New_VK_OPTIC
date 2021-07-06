export class Surgery_Cost_Detail {
  ID: number;           /*Not Null*/
  ICDCode: string = null;        /*Not Null*/
  SurgeryCost: number = 0;
  Roomtype: string = null;
  PACKAGERATE: number = 0;
  DressingCharge: number = 0;
  MedicationCharge: number = 0;
  SURGEONCHARGE: number = 0;
  CreatedUTC: Date;      /*Not Null*/
  UpdatedUTC: Date;
  Createdby: number;    /*Not Null*/
  Updatedby: number;
  CMPID: number;
}
