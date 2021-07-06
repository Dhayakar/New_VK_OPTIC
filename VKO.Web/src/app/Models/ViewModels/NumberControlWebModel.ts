
import { Number_Control } from "../NumberControl";


export class NmberControl {


  NumberControl: Number_Control = new Number_Control();
  NumColgrid: Array<NumColgrid> = [];
}
export class NumColgrid {
  VCID: number;
  TransactionID: number;
  DepartmentID: number ;
  CmpID: number;
  Location: string;
  Prefix: string;
  Suffix: string;
  Description: string;
  Autonumber: boolean;
  RunningNumber: number;
  EffectiveFrom: Date;
  EffectiveTo: Date;
  IsActive: boolean;
  IsDeleted: boolean;
  CreatedUTC: Date;
  UpdatedUTC: Date;
  CreatedBy: number;
  UpdatedBy: number;

}
