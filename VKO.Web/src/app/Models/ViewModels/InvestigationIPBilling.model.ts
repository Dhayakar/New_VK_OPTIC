import { MedicalPrescription } from "../medicalprescription.model"
import { MedicalPrescriptionTran } from "../medicalprescriptiontrans.model"
import { ICDMaster } from "../icdmaster.model";
import { OneLine_Master } from "../OneLineMaster";
import { RegistrationMaster } from './RegistrationMasterWebViewModel ';
import { Registration_Master } from '../RegistrationMasterWebModel';
import { InvestigationImages } from '../Investigationimage.model';
import { Payment_Master } from '../PaymentWebModel ';
import { InvestigationBillMaster } from '../InvestigationBillMaster.model';





export class InvestigationIPBilling {

  Registration: Registration_Master = new Registration_Master();
  INV: Array<InvestigationImages> = [];
  Investigation: InvestigationImages = new InvestigationImages();
  OneLineMaster: OneLine_Master = new OneLine_Master();
  InvestigationBillMaster: InvestigationBillMaster = new InvestigationBillMaster();
  PaymentMaster: Array<Payment_Master> = [];
  BillDetailsIP: Array<BillDetailsIP> = [];
  BillDetailsIPTax: Array<BillDetailsIPTax> = [];
  
  GetTaxDetails: Array<GetTaxDetails> = [];
  
  uid: number = 0;
}




export class GetTaxDetails
{
  TaxID: number;
  TaxDescription: string;
  CESSDescription: string;
  AdditionalCESSDescription: string;
  GSTPercentage: number;
  CESSPercentage: number;
  AdditionalCESSPercentage: number;
  CGSTPercentage: number;
  SGSTPercentage: number;
  IGSTPercentage: number;
}

export class BillDetailsIP {

  Investigation: string;
  Amount: number;
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
export class BillDetailsIPTax
{
  Investigation: string;
  Amount: number;
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
}
