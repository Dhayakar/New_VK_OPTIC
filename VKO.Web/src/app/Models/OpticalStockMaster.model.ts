

export class OpticalStockMaster {

  SMID: number;
  TransactionID: number;
  CMPID: number;
  DocumentNumber: number;
  DocumentDate: Date;
  OpticalOrderID: string;
  StoreID: number;
  TransactionType: string;
  VendorID: number;
  DepartmentID: number;
  GrossProductValue: number;
  TotalDiscountValue: number;
  TotalTaxValue: number;
  TotalCGSTTaxValue: number;
  TotalSGSTTaxValue: number;
  TotalIGSTTaxValue: number;
  TotalPOValue: number;
  CESSAmount: number;
  AdditionalCESSAmount: number;
  IsCancelled: boolean;
  TermsConditions: string;
  IsDeleted: boolean;
  ReceiverStoreID: number;
  CreatedUTC: Date;
  UpdatedUTC: Date;
  CreatedBy: number;
  UpdatedBy: number;
}
