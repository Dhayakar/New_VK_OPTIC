
import { OneLine_Master } from "../OneLineMaster";
import { PurchaseOrder } from '../PurchaseOrder.model';
import { PurchaseOrderTrans } from '../PurchaseOrderTrans.model';
import { StockMaster } from '../stockmaster.model';
import { StockTran } from '../stocktran.model';
import { Vendor_Masters } from '../VendorMaster';
import { ItemBatch } from '../itembatch.model';

export class GrnWpo {


  StockMaster: StockMaster = new StockMaster();
  Itemdetails: Array<Itemdetails> = [];
  BatchhDetails: Array<BatchhDetails> = [];
  SerialArraywithpo: Array<SerialArraywithpo> = [];
}


export class Itemdetails {

  ItemID: string;
  ItemDrug: string;
  ItemQty: number = 0;
  UOMID: string;
  UOMname: string;
  ItemRate: number = 0;
  ItemValue: number = 0;
  DiscountPercentage: number = 0;
  DiscountAmount: number = 0;
  GSTPercentage: number = 0;
  GSTTaxValue: number = 0;
  CESSPercentage: number = 0;
  CESSAmount: number = 0;
  AdditionalCESSPercentage: number = 0;
  AddCESSAmount: number = 0;
  TotalAmount: number = 0;
  GrossAmount: number = 0;
  TaxDescription: string;
  CESSDescription: string;
  AdditionalCESSDescription: string;
  RandomUniqueID: string;
  Type: string;
  GenericName: string;
  Tracking: number;

}

export class BatchhDetails {

  DrugName: string = "";
  druggid: number;
  uomm: number;
  BatchQuantity: number = 0;
  BatchNo: string = "";
  ExpiryDate: string = "";
  ValidExpiryDate: string = "";
  Genericname: string;
  UOM: string = "";
  chk: boolean = true;
}

export class SerialArraywithpo {
  DrugName: string = "";
  druggid: number;
  SerialNumber: string = "";
  GRNNumber: string;
  TC: number;
  Store: number;
  ExpiryDate: string = "";
  ValidExpiryDate: string = "";
  CreatedBy: number;
  Genericname: string;
  serialQuantity: number;
  UOM: string = "";
  chk: boolean = true;
}

