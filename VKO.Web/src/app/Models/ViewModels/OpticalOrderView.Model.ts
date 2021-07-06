import { OpticalOrder } from '../OpticalOrder.model';
import { OpticalOrderTran } from '../OpticalOrderTran.model';

export class OpticalOrderView {
  OpticalOrder: OpticalOrder = new OpticalOrder();
  OpticalOrderTran: OpticalOrderTran = new OpticalOrderTran();
  //table value binding
  OPticalOrderdetails: Array<OPticalOrderdetails> = [];
  OPticalDetails: Array<OPticalDetails> = [];
  //update 
  OpticalOrderUpdate: Array<OpticalOrderUpdate> = [];

  paymenttran: Array<paymenttran> = [];
  Companyname: string;
}

//table value binding

export class paymenttran {
  PaymentFor: string;
  PaymentAgainstID: number;
  PaymentMode: string;
  InstrumentNumber: string;
  Instrumentdate: Date;
  BankName: string;
  BankBranch: string;
  Expirydate: Date;
  Amount: number;
  // Generalid:number
}

export class OPticalOrderdetails {
  LensName: string;
  LMID: string;
  UOMDescription: string;
  ID: number;
  Prize: number;
  GST: number;
  IGST: number;
  CESS: number;
  AdditionalCESS: number;
  TaxDescription: string;
  CESSDescription: string;
  AdditionalCESSDescription: string;
}
//update 
export class OpticalOrderUpdate {
  ID: number;
  OrderNumber: string
  OrderDate: Date;
  RefNo: string;
  RefDate: Date;
  VendorName: string;
  DeliveryName: string;
  DeliveryAddress1: string;
  DeliveryLocationName: string;
}

export class OPticalDetails {

  Type: string;
  Brand: string;
  Model: string;
  Index: string;
  Color: string;

  LensName: string;
  LMID: string;
  LTID: number;
  UOMDescription: string;
  ID: number;
  Quantity: number = 0;
  Prize: number = 0;
  Amount: number = 0;
  Discount: number = 0;
  DiscountAmount: number = 0;
  GST: number = 0;
  GrossAmount: number = 0;
  GSTAmount: number = 0;
  TotalAmount: number = 0;
  IGST: number = 0;
  IGSTAmount: number = 0;
  CESS: number = 0;
  CESSAmount: number = 0;
  AdditionalCESS: number = 0;
  AdditionalCESSAmount: number = 0;


  TaxDescription: string = "";
  CESSDescription: string = "";
  AdditionalCESSDescription: string = "";


  CompanyName: string;
  CAddress1: string;
  CAddress2: string;
  CAddress3: string;
  CPhone1: string;
  CWebsite: string;

}
