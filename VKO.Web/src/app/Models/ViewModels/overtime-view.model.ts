


import { OverTime } from '../over-time';



export class OvertimeViewM {

  OverTime: OverTime = new OverTime();
  getEmployeeDet: Array<getEmployeeDet> = [];
  OvertimeDet: Array<OvertimeDet> = [];

  OvertimeRemainingDet: Array<OvertimeRemainingDet> = [];


  getHistoryDet: Array<getHistoryDet> = [];
  getAddHistoryDet: Array<getAddHistoryDet> = [];
 
 
  
}



export class getHistoryDet {
  ID1: number;
  OTDate1: Date;
  FromTime1: string;
  ToTime1: string;
  NoofHours1: number;
  OTperHour1: number;
  TotalOTAmount1: number
}



export class getAddHistoryDet {


  
  OTDate: Date;
  FromTime: string;
  ToTime : string;
  NoofHours : number;
  OTperHour: number;
  TotalOTAmount: number
}






export class getEmployeeDet {
  
  FirstName: string;
  Designation: string;
  DOJ: Date;
  Emp_ID: number;
  Gender: string;

}

export class OvertimeDet {

  EmpID: number;
  OTDate: Date;
  FromTime: string;
  ToTime: string;
  NoofHours: number;
  OTperHour: number;
  TotalOTAmount: number;
}



export class OvertimeRemainingDet {

  EmpID: number;
  OTDate: Date;
  FromTime: string;
  ToTime: string;
  NoofHours: number;
  OTperHour: number;
  TotalOTAmount: number;
}


