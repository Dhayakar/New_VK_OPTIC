import { PurchaseOrder } from '../PurchaseOrder.model';
import { PurchaseOrderTrans } from '../PurchaseOrderTrans.model';



export class Purchaseordercancellation {

  PurchaseOrdercancel: PurchaseOrder = new PurchaseOrder();
  PurchaseOrderTransdetailscancel: Array<PurchaseOrderTransdetailscancel> = [];
}





export class PurchaseOrderTransdetailscancel {

  Itemname: string;
  ItemID: number;
  ItemQty: number;
  UOMID: number;
  UOMname: string;
  ItemRate: number;
  ItemValue: number;
  DiscountPercentage: number;
  DiscountAmount: number;
  GSTPercentage: number;
  GSTTaxValue: number;
  Grossamount: number;
  Totalamount: number;
  PONUM: string;
  PONUMDate: Date;
  CESSPercentage: number;
  CESSAmount: number;
  AdditionalCESSPercentage: number;
  AddCESSAmount: number;
  TaxDescription: string;
  CESSDescription: string;
  AdditionalCESSDescription: string;
}


