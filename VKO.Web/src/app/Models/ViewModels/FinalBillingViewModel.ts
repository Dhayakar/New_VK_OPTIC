import { Payment_Master } from '../PaymentWebModel ';

export class FinalBillingMaster {
  billingdetail1: Array<billing1> = [];
  billingdetail2: Array<billing2> = [];
  paymenttran1: Array<Finalpaymenttran> = [];
  payment: Payment_Master = new Payment_Master();
  Adv: number;
  AdvRePrint: number;
  InsuranceRePrint: number;
  //RePrint
  ReprintBilling1: Array<ReprintB1> = [];
  paymentReprintADV: Array<paymentAdvRP> = [];
  Companyname: string;
  GETPatientInsuranceBilgTran: GETPatientInsuranceBilgTran = new GETPatientInsuranceBilgTran();
  AdditemD: Array<AdditemD> = [];

  InvoiceNumber: string;
  Totalbillamount: number;
  PaymentTotalamount: number;
  TranTypeID: number;

}
export class AdditemD {
  ServicesDescription: string;
  Description: string;
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
  TaxDescription: string;
  CESSDescription: string;
  AdditionalCESSDescription: string;
  TotalCost: number;
  TaxID: number;
}
export class paymentAdvRP {
  AdvAmount: number;
}

export class GETPatientInsuranceBilgTran
{
  PAINSID: number
  AmountAvailed: number
}
export class ReprintB1 {
  Description: string
  OLMID: number
  TotalProductValue: number
  TotalDiscountP: number
  TotalDiscountValue: number
  TotalTaxValue: number
  TotalCGSTTaxValue: number
  TotalSGSTTaxValue: number
  TotalIGSTTaxValue: number
  CESSPercentage: number
  AdditionalCESSPercentage: number
  TotalBillValue: number
}

export class billing1 {
  Description: string
  OLMID: number
  TotalProductValue: number
  TotalDiscountP: number
  TotalDiscountValue: number
  TotalDiscountProduct: number
  TotalTaxValue: number
  TotalCGSTTaxValue: number
  TotalSGSTTaxValue: number
  TotalIGSTTaxValue: number
  CESSPercentage: number
  AdditionalCESSPercentage: number
  TotalBillValue: number
}
export class billing2 {
  Description: string
  OLMID: number
  TotalProductValue: number
  TotalDiscountP: number
  TotalDiscountValue: number
  TotalDiscountProduct: number
  TotalTaxValue: number
  TotalCGSTTaxValue: number
  TotalSGSTTaxValue: number
  TotalIGSTTaxValue: number
  CESSPercentage: number
  AdditionalCESSPercentage: number
  TotalBillValue: number
}
export class Finalpaymenttran {
  PaymentFor: string;
  PaymentAgainstID: number;
  PaymentMode: string;
  InstrumentNumber: string;
  Instrumentdate: Date;
  BankName: string;
  BankBranch: string;
  Expirydate: Date;
  Amount: number;
  AdvAmount: number;
  UIN: string;
  PaymentReferenceID: number;
}
