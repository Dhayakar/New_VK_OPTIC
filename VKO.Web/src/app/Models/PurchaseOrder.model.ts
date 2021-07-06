



export class PurchaseOrder {


  POID: number;
  TransactionID: number;
  CMPID: number;
  PONumber: string;
  PODate: Date;
  QuotationNumber: string;
  QuotationDate: Date;
  VendorID: number;
  DepartmentID: number;
  DeliveryName: string;
  DeliveryAddress1: string;
  DeliveryAddress2: string;
  DeliveryAddress3: string;
  DeliveryLocationID: number;
  GrossProductValue: number;
  TotalDiscountValue: number;
  TotalTaxValue: number;
  TotalCGSTTaxValue: number;
  TotalSGSTTaxValue: number;
  TotalPOValue: number;
  POStatus: string;
  IsCancelled: boolean;
  TermsConditions: string;
  IsDeleted: boolean;
  CreatedUTC: Date;
  UpdatedUTC: Date;
  CreatedBy: number;
  UpdatedBy: number;
  Validity: string;
  Delivery: string;
  PaymentandTerms: string;
  TotalIGSTTaxValue: number;
  CESSAmount: number;
  AdditionalCESSAmount: number;
  RandomUniqueID: string;
}


