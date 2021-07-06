


import { Company } from '../Company';

export class CompanyMasterView

{
  CompanyMaster: Company = new Company();
  getCompName: Array<getCompName> = []; 
  getCompDetails: Array<getCompDetails> = [];

  getCompModuless: Array<getCompModuless> = [];

  getNumbercontrolModules: Array<getNumbercontrolModules> = [];
  companygroup: string;
}


export class getCompModuless {
  ModuleDesc: string;
}


export class getNumbercontrolModules {
  Desc: string;
  RunningNumber: number;
  Prefix: string;
  Suffix: string;        
    }

export class getCompName {
  companyName: string;
  CmpID: number;
}

export class getCompDetails {
  CmpID: number;
  CompanyName: string;
  Address1: string;
  Address2: string;
  Address3: string;
  LocationName: string;
  ContactPerson : string;
  GSTNo: string;
  ParentID: number;
  Phone1: string;
  Phone2: string;
  EmailID: string;
  Website: string;

}
