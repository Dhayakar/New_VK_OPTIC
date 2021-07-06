import { Doctor_Master } from '../DoctorMaster.model';
import { Speciality_master } from '../Speciality';
import { OneLine_Master } from '../OneLineMaster';
import { Company_Master } from '../CompanyMasterWebModel';
import { Speciality_trans } from '../Specialitytrans';



export class Doctormasters {

  doctormaster: Doctor_Master = new Doctor_Master();
  speciality: Speciality_master = new Speciality_master();
  onelinemaster: OneLine_Master = new OneLine_Master();
  Companymaster: Company_Master = new Company_Master();
  docdetail: Array<docdetail> = [];
  Specialitytrans: Array<Speciality_trans> = [];
  speciality1: Array<speciality1> = [];
  DoctorGridconsulting: Array<DoctorGridconsulting> = [];
  DoctorGridconsultingnewcolumns: Array<DoctorGridconsultingnewcolumns> = [];
  DeleteDoctorGridconsulting: Array<DeleteDoctorGridconsulting> = [];
  Doctorroleid: string;
  CPMID: string;
  USERID: string;
  Engages: Engage = new Engage();
}

export class Engage {
  EngagementType: string;
  USERID: number;
}

export class DoctorGridconsultingnewcolumns {
  Days: string;
  CMPID: string;
  USERID: string;
  firstname: number;
  Lastname: string;
  DoctorID: number;
  firstsessionstart: string;
  firstsessionend: string;
  Secondsessionstart: string;
  fsecondsessionend: string;
  Maxpatientsmorning: string;
  Maxpatientecening: string;
}



export class DoctorGridconsulting {
  Doctorname: string;
  DoctorID: number;
  Docday: string;
  FFtime: string;
  FTTime: string;
  SSFtime: string;
  SSSTime: string;
  Maxfpatient: string;
  Maxtpatient: string;
  EveningFFtime: string;
  EveningFTTime: string;
  EveningSSFtime: string;
  EveningSSSTime: string;
  FirstFtime: string;
  FirstTTime: string;
  secondFtime: string;
  secondTTime: string;

}


export class DeleteDoctorGridconsulting {
  Doctorname: string;
  DoctorID: number;
  Docday: string;
  FFtime: string;
  FTTime: string;
  SSFtime: string;
  SSSTime: string;
  Maxfpatient: string;
  Maxtpatient: string;
  EveningFFtime: string;
  EveningFTTime: string;
  EveningSSFtime: string;
  EveningSSSTime: string;

}


export class speciality1 {


}



export class docdetail {
  DoctorID: number;
  DoctorSpecialityID: number;
  CMPID: number;
  Speciality: string;
  // DoctorName: string;
  Address1: string;
  Address2: string;
  Address3: string;
  LocationID: string;
  RegistrationNumber: string;
  EngagementType: number;
  Phone1: string;
  Phone2: string;
  EmailID: string;
  Title: string;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  Gender: number;
  DateofBirth: Date;
  Designation: string;
  roleid: number;
  Status: boolean;
}
