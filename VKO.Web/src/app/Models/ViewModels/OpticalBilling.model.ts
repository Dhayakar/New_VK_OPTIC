import { Payment_Master } from '../PaymentWebModel ';
import { OpticalInvoiceMaster } from '../OpticalInvoiceMaster.model';


export class OpticalBilling {

  GetOpticaldetailsfullcheck: Array<GetOpticaldetailsfullcheck> = [];
  PaymentMaster: Array<Payment_Master> = [];
  OpticalInvoiceMaster: OpticalInvoiceMaster = new OpticalInvoiceMaster();
}


export class GetOpticaldetailsfullcheck {

  COID: number = 0;
  COTID: number = 0;
  LTID: number = 0;
  LTname: string;
  UOMID: number = 0;
  UOMname: string;
  Type: string;
  Brand: string;
  Index: string;
  Model: string;
  Color: string;
  OrderedQty: number = 0;
  Price: number = 0;
  Value: number = 0;
  DiscountPercentage: number = 0;
  DiscountAmount: number = 0;
  GSTPercentage: number = 0;
  GSTTaxValue: number = 0;
  CESSPercentage: number = 0;
  CESSAmount: number = 0;
  GrossValue: number = 0;
  Totalamount: number = 0;
  AdditionalCESSPercentage: number = 0;
  AddCESSPerAmt: number = 0;
  TaxDescription: string;
  CessDescription: string;
  AddcessDescription: string;
  Stockcheck: string;
}
