import { Depart } from '../Depart.model';



export class DepartViewm {


  Des: Depart = new Depart();
  DepartDetails: Array<DepartDetails> = [];
   

}

export class DepartDetails {

  ID: number;
  CMPID: number;
  Description: string;
  DepartmentIncharge: string;
  DepartmentLocation: string;

}
