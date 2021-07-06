


export class SurgeryHistoryViewModel {
  CreatedBy: number;
  Cmpid: number;
  SurgeryHistoryDetails: Array<SurgeryHistoryDetail> = [];
  ListCmpid: Array<ListCompanyIds> = [];
  SurgeryHistory: SurgeryHistoryDetail = new SurgeryHistoryDetail();
  RemovedReasons: string;
}


export class SurgeryHistoryDetail {
  DateOfSurgery: Date;
  TypeofSurgery: string;
  SurgeonName: string;
  HospitalClinic: string;
  Eye: string;
  SurgeryDone: string;
  Status: string;
  Cmpid: number;
  SurgeryId: number;
  UIN: string;
  RemovedReason: string;
  Remarks: string;
}

export class ListCompanyIds {
 CompanyIDS: number;
}
