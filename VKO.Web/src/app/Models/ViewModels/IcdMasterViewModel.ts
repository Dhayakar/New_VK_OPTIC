import { ICD_Code_Master } from "../IcdMaster";
import { OneLine_Master } from "../OneLineMaster";
import { Surgery_Cost_Detail } from '../SurgeryCostDetails';



export class IcdMaster {

  icdcodemasters: ICD_Code_Master = new ICD_Code_Master();
  onelinemaster: OneLine_Master = new OneLine_Master();
  SurgeryCostDetails: Surgery_Cost_Detail = new Surgery_Cost_Detail();
 
  IcdDetail: Array<IcdDetail> = [];
  ICDExtenstionDOC: Array<ICDExtenstionDOC> = [];
}
export class ICDExtenstionDOC
{
  DOCID: number ;
  Doctorname: string = '';
  //DoctorSpeciality: string = '';
  SurgeonCharges: number = 0;
}
export class IcdDetail {
  icdbrand: string = '';
  Code: string = '';
  description: string = '';
  speciality: string = '';
  icdgroup: string = '';
  roomtype: string;
  surgerycost: number;
  packagerate: number;
  dressingcharge: number;
  medicinecharge: number;
  surgeoncharge: number;
  id: number;
}
