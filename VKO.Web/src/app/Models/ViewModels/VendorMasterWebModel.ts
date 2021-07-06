
import { Vendor_Masters } from "../VendorMaster";
import { drugMaster } from './DrugMasterViewModel';
import { DecimalPipe } from '@angular/common';
import { DateTime } from 'wijmo/wijmo';


export class VendorMasters {

  VendorMasters: Vendor_Masters = new Vendor_Masters();
  Drugmaster: drugMaster = new drugMaster();
  VendorDetails: Array<VendorDetail> = [];
  unvendordetails: Array<unVendorDetail> = [];
  ItemDetails: Array<ItemDetail> = [];
  UNItemDetails: Array<UNItemDetail> = [];
  Opticamreturnsubmitdetails: Array<Opticamreturnsubmitdetails> = [];
  Code: string;
  CompanyID: string;
  UserID: string;
  ponumber: string;
  podate: string;
  Remarks: string;
  GRN: string
  TransactiomnID: number;
  vendorid: number;
  storeiud: number;
  Issuedate: DateTime;
}

export class Opticamreturnsubmitdetails {
  Item: string;
  type: string;
  model: string;
  color: string;
  itemqty: string;
  ClosingQty: string;
  itemrate: string;
  itemvalue: string;
  Returnqty: number;
  ItemID: number;
  UOM: number | null;
  STID: string;
}

export class VendorDetail {
  Description: string;
  Select: boolean;
}

export class unVendorDetail {
  Description: string;
  Select: boolean;
}

export class ItemDetail {
  Description: string;
  Select: boolean;
}

export class UNItemDetail {
  Description: string;
  Select: boolean;
}

