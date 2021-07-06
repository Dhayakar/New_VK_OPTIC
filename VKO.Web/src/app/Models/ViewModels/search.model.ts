import { Storemasters } from '../Storemaster.model';
import { Vendor_Masters } from '../VendorMaster';
import { OperationTheatre } from '../OPerationTheatre';




export class Search {

  Storemaster: Storemasters = new Storemasters();
  VendorMasters: Vendor_Masters = new Vendor_Masters();
  OperationTheatre: OperationTheatre = new OperationTheatre();
  // SurgeryDT: SurgeryMaster = new SurgeryMaster();
  SurgeryDT: Array<SurgeryMaster> = [];
  Persondetails: Array<Persondetails> = [];
  SurgeryDT3: Array<Surgerydetail3> = [];
  SurgeryDT4: Array<Surgerydetail4> = [];
  SurgeryDT5: Array<Surgerydetail5> = [];

  Persondetailspost: Array<Persondetailspost> = [];
  Postoper: Postoper = new Postoper();
  Postoper3: Array<Postoper3> = [];
}



export class Persondetailspost {
  Uin: string;
  Namepat: string;
  Date: Date;
  Gender: string;
  Age: string;
  Phone: string;
  Allergy: string;
  Ocular: string;
  DateofSurgery: Date;
  OTID: string;
  Doctorname: string;
  Anaestheticname: string;
  Description: string;
  SID: number;
  ReviewDate: number;
}

export class Postoper {

  UIN: string;
  Name: string;
  DatePicker1: Date;
  Age: string;
  Phone: string;
  Gender: string;
  Allergy: string;
  Ocular: string;
  DateofSurgery: Date;
  OTID: string;
  Doctorname: string;
  Anaestheticname: string;
  Description: string;
  SID: number;
  ReviewDate: number;
}

export class Postoper3 {

  DateofSurgery: Date;
  Description: string;
  Doctorname: string;
  Ocular: string;
  Complication: string;
  Treatment: string;
  PostOperativeDate: Date;
  ReviewDate: Date;
  ID: number;
}

export class SurgeryMaster {

  UIN: string;
  Name: string;
  DatePicker1: Date;
  Age: string;
  Gender: string;
  Allergy: string;
}
export class Persondetails {
  UIN: string;
  Name: string;
  DateofBirth: Date;
  Age: string;
  Regtranid: string;
  Gender: string;
  Allergy: string;
  DateofSurgery: Date;
  Description: string;
  Doctorname: string;
  OTID: string;
  Anaestheticname: string;
  Ocular: string;

}


export class Surgerydetail3 {
  UIN: string;
  Name: string;
  DatePicker1: Date;
  DateofSurgery: Date;
  Description: string;
  Doctorname: string;
  Ocular: string;
  Complication: string;
  Treatment: string;
  PostOperativeDate: Date;
  ReviewDate: Date;
}

export class Surgerydetail4 {
  UIN: string;
  IODate: Date;
  AntibioticGivenBy: string;
  CaseSheetPreparedBy: string;
  Note: string;
  Instruction: string;
}
export class Surgerydetail5 {
  UIN: string;
  IODate: Date;
  AntibioticGivenBy: string;
  CaseSheetPreparedBy: string;
  Note: string;
  Instruction: string;
}




