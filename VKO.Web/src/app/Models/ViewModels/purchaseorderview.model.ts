import { PurchaseOrder } from '../PurchaseOrder.model';
import { PurchaseOrderTrans } from '../PurchaseOrderTrans.model';
import { Drug_Master } from '../DrugMaster.model';
import { VendorMasters } from './VendorMasterWebModel';
import { Vendor_Masters } from '../VendorMaster';
import { OneLineMaster } from './OneLineMasterWebModel.ts';
import { OneLine_Master } from '../OneLineMaster';



export class purchaseorderview {

  PurchaseOrder: PurchaseOrder = new PurchaseOrder();
  purchasedetails: Array<purchasedetails> = [];
  Vendername: Array<Vendername> = [];
  purchasedetailsDelete: Array<purchasedetailsDelete> = [];
}



export class Vendername {

  Address1: string = "";
  Address2: string;
  Location: string = "";
  GSTNo: string;
  PhoneNo: string;

}
export class purchasedetails {

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
export class purchasedetailsDelete {

  ID: number;
  IsDeleted: boolean;

}









