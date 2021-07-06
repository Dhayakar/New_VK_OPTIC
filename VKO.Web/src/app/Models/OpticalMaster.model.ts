

export class OpticalMaster {

  ID: number;
  OpticalPrescriptionID: number;
  RegTranID: number;
  InvoiceNumber: string = null;
  InvoiceDate: Date;
  BookingDate: Date;
  DeliveryDate: Date;
  GrossProductValue: number;
  TotalDiscountValue: number = 0;
  TotalTaxValue: number = 0;
  TotalCGSTTaxValue: number = 0;
  TotalSGSTTaxValue: number = 0;
  TotalIGSTTaxValue: number = 0;
  NetAmount: number;
  CMPID: number;
  TransactionId: number;
  CreatedUTC: Date;
  UpdatedUTC: Date;
  CreatedBy: number;
  UpdatedBy: number = 0;


}
