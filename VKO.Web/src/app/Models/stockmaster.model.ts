



export class StockMaster {


  SMID: number;
  TransactionID: number;
  CMPID: number;
  DocumentNumber: string;
  DocumentDate: Date;
  QtnNumber: string;
  QtnDate: Date;
  DCNumber: string;
  DCDate: Date;
  POID: number = 0;
  StoreID: number;
  TransactionType: string;
  VendorID: number;
  GrossProductValue: number;
  TotalDiscountValue: number;
  TotalTaxValue: number;
  TotalCGSTTaxValue: number;
  TotalSGSTTaxValue: number;
  TotalCESSValue: number;
  TotalAdditionalCESSValue: number;
  TotalPOValue: number;
  IsCancelled: boolean;
  TermsConditions: string;
  IsDeleted: boolean;
  CreatedUTC: Date;
  UpdatedUTC: Date;
  CreatedBy: number;
  UpdatedBy: number = 0;
  Fyear: string;

}
