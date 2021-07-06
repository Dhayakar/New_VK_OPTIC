import { Employee_Master } from '../EmployeeMaster.model';
import { EmployeeStatutory } from '../EmployeeStatutory.model';
import { EmployeeBank } from '../EmployeeBank.model';
import { EmployeeCommunication } from '../EmployeeCommunication.model';
import { QualificationExt } from '../QualificationExt';
import { EmployeeExperience } from '../EmployeeExperience';



export class Employeemasters {

  employeeMaster: Employee_Master = new Employee_Master();
  EmployeeStatutory: EmployeeStatutory = new EmployeeStatutory();
  EmployeeBank: EmployeeBank = new EmployeeBank();
  EmployeeCommunication: EmployeeCommunication = new EmployeeCommunication();
  QualificationExt: QualificationExt = new QualificationExt();
  EmployeeDetail: Array<EmployeeDetail> = [];
  EmployeeExperience: Array<EmployeeExperience> = [];
  Employeerole: string;
  Employeestatutory1: Array<Employeestatutory1> = [];
  Employeebank1: Array<Employeebank1> = [];
  Employeeexperience1: Array<Employeeexperience1> = [];
  qualificationexten: Array<qualificationexten> = [];
  qualificationexten1: Array<qualificationexten1> = [];
  empqua: Array<empqua> = [];
  empqua1: Array<empqua1> = [];


}

export class EmployeeDetail {
  EmployeeID: number;
  CMPID: number;
  //Title: string;
  EmployeeName: string;
  PresentAddress1: string;
  PresentAddress2: string;
  PresentAddress3: string;
  PresentLocationID: string;
  PresentLandmark: string;
  PermanentAddress1: string;
  PermanentAddress2: string;
  PermanentAddress3: string;
  PermanentLocationID: string;
  PermanentLandmark: string;
  Phone1: number;
  Phone2: number;
  EmailID: string;
  DOJ: Date;
  DOR: Date;
  Designation: string;
  EmergencyContactName: string;
  EmergencyContactNo: string;
  BloodGroup: string;
  IsActive: boolean;
  EmproleID: number;
}
export class Employeestatutory1 {

  IsPFEligible: boolean;
  PFNumber: string;
  PFCommencementDate: Date;
  VPFPercentage: number;
  IsESIEligible: boolean;
  ESINumber: string;
  ESICommencementDate: Date;
  IsProfessionalTaxEligible: boolean;
  GratuityNo: string;
  UANNo: string;

}
export class Employeebank1 {
  BankName: string;
  BankBranch: string;
  AccountHoldersName: string;
  AccountType1: string;
  AccountNo: string;
  IFSCCode: string;
  delete: boolean;
}
export class Employeeexperience1 {

  Organisation: string;
  FromDate: Date;
  ToDate: Date;
  Designation1: string;

}
export class qualificationexten {
  ID: string;
  QualExtDescription: string;
  QID: number;
}
export class qualificationexten1 {
  QualExtAnsDescription: string;
}
export class empqua {
  qualification: string;
  Degree: string;
  specialization: string;
  fromdate: Date;
  todate: Date;
  university: string;
  instition: string;
  yearofpassing: string;
  percentageofmarks: number;
  qid: number;
  uid: number;
}
export class empqua1 {
  qualification: string;
  Degree: string;
  specialization: string;
  fromdate: Date;
  todate: Date;
  university: string;
  instition: string;
  yearofpassing: string;
  percentageofmarks: number;
  qid: number;
  uid: number;
  createby: number;
}

