import { Room } from '../Room';


export class RoomMasterViewM {

  RoomMaster: Room = new Room();

  GetRoomDet: Array<GetRoomDet> = [];
  RoomDetails1: Array<RoomDetails1> = [];
  RoomDetails2: Array<RoomDetails2> = [];
  RoomNoArr: Array<RoomNoArr> = [];
  BedNoarr: Array<BedNoarr> = [];
  ToiletType: Array<ToiletType> = [];
}



export class RoomNoArr {
  RNo: number;
  RToiletType: string;
}

export class BedNoarr {
  BedNo: string;
}

export class GetRoomDet {

  No: number;
  ToiletType: string;
  BedNo: string;
  RoomType: string;
  RoomDescription: string;
  RoomCost:number;
  
}
export class ToiletType
{
  RoomNo: number;
  RestRoomType: string;

}
export class RoomDetails1 {
  No: number;
  NoofBeds: number;
  ToiletType: string;
  RoomDetID: number;
}

export class RoomDetails2 {
  No: number;
  BedNo: string;
  ToiletType: string;
  RoomDetID: number;
  IsActive: string;
  RoomType: string;
  RoomDescription: string;
  Roomcost: number;
}
