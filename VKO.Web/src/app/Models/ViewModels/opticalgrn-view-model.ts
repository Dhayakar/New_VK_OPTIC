
import { OpticalStockMaster } from '../OpticalStockMaster.model';


export class OpticalgrnViewModel {

  GetOpticalGrntrns: Array<GetOpticalGrntrns> = [];
  OpticalStockMaster: OpticalStockMaster = new OpticalStockMaster();
  GetOpticalGrntrnsgrn: Array<GetOpticalGrntrnsgrn> = [];

}

export class GetOpticalGrntrns {
  OOID: number;
  LTname: string
  LTID: number;
  UOMname: string;
  UOMID: number;
  OrderedQty: number = 0;
  ReceivedQty: number = 0;
  Price: number = 0;
  Value: number = 0;
  TotalCost: number = 0;
  ActualQuantity: number = 0;
  Type: string;
  DiscountAmount: number = 0;
  DiscountPercentage: number = 0;
}

export class GetOpticalGrntrnsgrn {
  LTname: string
  UOMname: string;
  ItemQty: number = 0;
  Itemrate: number = 0;
  Itemvalue: number = 0;
  TotalPOValue: number = 0;
  Type: string;
  DiscountAmount: number = 0;
  DiscountPercentage: number = 0;
}
