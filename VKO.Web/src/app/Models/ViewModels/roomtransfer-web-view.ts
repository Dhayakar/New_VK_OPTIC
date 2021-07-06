


export class RoomtransferWebView {

  RoomOccupiedArray: Array<RoomOccupiedArray> = [];

}


export class RoomOccupiedArray {
  RoomID: number;
  RoomDetailsID: number;
  UIN: string;
  BedNo: string;
  Status: string;
  FromDate: Date;
  ToDate: Date;
  FromTime: string;
  ToTime: string;
  IsOccupied: boolean;
  CreatedUTC: Date;
  UpdatedUTC: Date;
  CreatedBy: number;
  UpdatedBy: number;


}
