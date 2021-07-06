
import { Surgery } from '../Surgery';
import { Admission } from '../Admission';
import { Surgerytran } from '../SurgeryTran';
import { SurgeryAssigned } from '../SurgeryAssigned.model';
import { SurgeryAssignedTran } from '../SurgeryAssignedTran.model';
import { RoomOccupiedStatus } from '../RoomOccupiedStatus';
import { Payment_Master } from '../PaymentWebModel ';
import { DateTime } from 'wijmo/wijmo';
import { AttendersPass } from '../AttendersPass.model';


export class Surgeryadmissionandassign {

  findingsID: string;
  UpdatedBy: number;
  Admission: Admission = new Admission();
  SurgeryMaster: Surgery = new Surgery();
  Surgery_Tran: Array<Surgerytran> = [];
  SurgeryAssigned: SurgeryAssigned = new SurgeryAssigned();
  SurgeryAssignedTran: Array<SurgeryAssignedTran> = [];
  RoomOccupiedStatus: Array<RoomOccupiedStatus> = [];
  PaymentMaster: Array<Payment_Master> = [];
  AdmDate: DateTime;
  SurgeryDate: DateTime;
  DateofSurgery: DateTime;
  VehiclePasstran: Array<VehiclePasstran> = [];
  AttendersPass: AttendersPass = new AttendersPass();
}


export class VehiclePasstran {

  ID: number;
  Make: string;
  VehicleNo: string;
  Type: string;

}

