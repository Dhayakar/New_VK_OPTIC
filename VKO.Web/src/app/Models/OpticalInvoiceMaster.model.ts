export class OpticalInvoiceMaster {
  ID: number;
  CMPID: number;
  InvoiceNumber: string;
  InvoiceDate: Date;
  BookingDate: Date;
  DeliveryDate: Date;
  TransactionId: number;
  GrossProductValue: number;
  TotalDiscountValue: number;
  TotalTaxValue: number;
  TotalCGSTTaxValue: number;
  TotalSGSTTaxValue: number;
  NetAmount: number;
  CESSAmount: number;
  AdditionalCESSAmount: number;
  TransactionID: number;
  CreatedBy: number;
}
