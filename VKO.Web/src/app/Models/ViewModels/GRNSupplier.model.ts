
import { OneLine_Master } from "../OneLineMaster";
import { PurchaseOrder } from '../PurchaseOrder.model';
import { PurchaseOrderTrans } from '../PurchaseOrderTrans.model';
import { StockMaster } from '../stockmaster.model';
import { StockTran } from '../stocktran.model';
import { Vendor_Masters } from '../VendorMaster';
import { ItemBatch } from '../itembatch.model';
import { Data } from '@angular/router';

export class GRN {

  //PurchaseOrder: PurchaseOrder = new PurchaseOrder();
  //PurchaseOrderTrans: PurchaseOrderTrans = new PurchaseOrderTrans();
  //OneLineMaster: OneLine_Master = new OneLine_Master();
  //VendorMaster: Vendor_Masters = new Vendor_Masters();

  StockMaster: StockMaster = new StockMaster();
  StockTran: Array<StockTran> = [];
  PurchaseDetails: Array<PurchaseDetails> = [];
  purchasedetailsPOV: Array<purchasedetailsPOV> = [];
  ItemDetails: Array<ItemDetails> = [];
  STableArray: Array<STableArray> = [];
  BatchDetails: Array<BatchDetails> = [];

  //BatchDetailss: Array<BatchDetailss> = [];
  //ItemBatch: Array<ItemBatch> = [];
  //GrnDetails: Array<GrnDetails> = [];
  //GrnitemDetails: Array<GrnitemDetails> = [];
  SerialArray: Array<SerialArray> = [];

  Companyname: string;

  //ItembalanceArry: Array<ItembalanceArry> = [];

}
export class purchasedetailsPOV {

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
  PORecdQty: number = 0;
  PORecd: number = 0;
  POCancel: number = 0;
  RandomUniqueID: string;
}
export class ItembalanceArry {
  ActualQty: number;
  DrugName: string;
  UOM: string;
  DrugID: number;
  UOMID: number;
}

export class SerialArray {
  DrugName: string;
  SerialNumber: number;
  GRNNumber: string;
  TC: number;
  UOM: string;
  Store: number;
  CreatedBy: number;
  //UpdatedBy: number;
  ExpiryDate1: Date;
  ID: number;
  druggid: number;
}



export class STableArray {
  DrugName: string;
  SerialNumber: number;
  GRNNumber: string;
  TC: number;
  UOM: string;
  Store: number;
  CreatedBy: number;
  //UpdatedBy: number;
  ExpiryDate1: Date;
  ID: number;
}

export class PurchaseDetails {

  POId: number;
  PONumber: string;
  PODate: Date;
  QuotationNumber: string;
  QuotationDate: Date;
  VendorId: number;
  SupplierName: string;
  Address1: string;
  Address2: string;
  Location: string;
  Phone: string;
  GST: string;
  DeliveryName: string;
  DeliveryAddress1: string;
  DeliveryAddress2: string;
  DeliveryAddress3: string;
  DeliveryLocation: string;

}

export class ItemDetails {

  DrugName: string;
  DrgId: number;
  uom: number;
  BaseUOM: string;
  PurchaseUOM: string;
  Quantity: number;
  ReceivedQuantity: number;
  ActualQuantity: number;
  Rate: number;
  Value: number;
  GST: number;
  GSTValue: number;
  Discount: number;
  DiscountValue: number;
  GrossAmount: number;
  TotalCost: number;
  CESSAmount: number;
  AdditionalCESSAmount: number;
  Type: string;
}

export class BatchDetails
{
  DrugName: string = "";
  druggid: number;
  uomm: number;
  BatchQuantity: number = 0;
  BatchNo: string = "";
  ExpiryDate: Date;
}

export class BatchDetailss
{
  BatchQuantity1: number = 0;
  BatchNo1: string = "";
  ExpiryDate1: Date;
}

export class GrnDetails {

  GrNo: string;
  GrDt: Date;
  poid: string;
  podt: Date;
  qnum: string;
  qudt: Date;
  store: string;
  vendor: string;
  GpValue: number;
  TdValue: number;
  TtValue: number;
  TcValue: number;
  TsValue: number;
  TpValue: number;
  Address11: string;
  Address22: string;
  Locationn: string;
  Phonee: string;
  GSTt: string;
  DeliveryNamee: string;
  DeliveryAddress11: string;
  DeliveryAddress22: string;
  DeliveryAddress33: string;
  DeliveryLocationn: string;
  Terms: string;
}

export class GrnitemDetails {

  DrugName: string;
  DrgQuan: number;
  Uom: string;
  rate: number;
  value: number;
  Discount: number;
  DiscountValue: number;
  GST: number;
  GSTValue: number;
  TotalCostt: number;

}
