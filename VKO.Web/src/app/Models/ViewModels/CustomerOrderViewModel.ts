import { paymenttran } from './Payment_master.model';




export class CustomerOrderViewModel {
  Cmpid: number;
  Tc: number;
  OrderDate: string;
  CreatedBy: number;
  CustomerId: number;
  RefDate: Date;
  RefNo: number;

  CustomerItemOrders: Array<CustomerItemOrder> = [];
  paymenttran: Array<paymenttran> = [];

  OrderNo: string;
  CancelledReasons: string;
  CustomerDatas: CustomerData = new CustomerData();

  UIN: string;
  RegTranId: number;
  Deliverydate: Date;
  Remarks: string;
}

export class CustomerData {
  UIN: string
  FirstName: string
  Middlename: string
  Lastname: string
  Address1: string
  Address2: string
  Address3: string
  MobileNo: number
}



export class CustomerItemOrder {
  Type: string
  Brand: string
  Model: string
  LensOptions: string
  Index: string
  Color: string
  HSNNo: string
  Quantity: number
  UOM: string
  UnitPrice: number
  GivenQtyPrice: number
  Discount: number
  DiscountAmount: number
  GST?: number
  CGST?: number
  SGST?: number

  CESS?: number
  AddCess?: number

  GSTDesc: string
  CESSDesc: string
  AddCessDesc: string

  GSTValue: number
  CESSValue: number
  AddCessValue: number

  GrossAmount: number
  Amount: number
  LMID: number
  LTID: number

  OneplusOfferValue: number

  ParentRowId: number
  ChildRowId: number

  Count: number

  Offer: Array<OnePlusOfferDetails> = [];
}


export class OnePlusOfferDetails {
  Type: string
  Brand: string
  Model: string
  LensOptions: string
  Index: string
  Color: string
  HSNNo: string
  Quantity: number;
  UOM: string
  UnitPrice: number
  Discount: number
  DiscountAmount: number
  GST: number
  CGST: number
  SGST: number
  GSTValue: number
  GrossAmount: number
  Amount: number
  LMID: number
  LTID: number
}
