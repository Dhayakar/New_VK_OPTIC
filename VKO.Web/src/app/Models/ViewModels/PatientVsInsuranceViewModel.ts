import { PatientVsInsurance } from "../PatientVsInsurance.model";
import { JointFamilyDetails } from "../JointFamilyDetails.model";
import { string } from '@amcharts/amcharts4/core';
import { InsuranceImageTran } from '../InsuranceImageTran.model';




export class PatientVsInsuranceViewModel {

  PatientVsInsurance: PatientVsInsurance = new PatientVsInsurance();
  JointFamilyDetails: JointFamilyDetails = new JointFamilyDetails();
  InsuranceImageTran: InsuranceImageTran = new InsuranceImageTran();

  
  InsImageTranArray: Array<InsuranceImageTran> = [];

  JoindataKIN: Array<JoindataKIN> = [];
}
export class JoindataKIN {
  ID: number;
  Amount: number;
  Relationship: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  ContactNumber: string;
  EmailID: string;
}
