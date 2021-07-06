import { MedicalPrescription } from "../medicalprescription.model"
import { MedicalPrescriptionTran } from "../medicalprescriptiontrans.model"
import { ICDMaster } from "../icdmaster.model";
import { OneLine_Master } from "../OneLineMaster";
import { RegistrationMaster } from './RegistrationMasterWebViewModel ';
import { Registration_Master } from '../RegistrationMasterWebModel';
import { InvestigationImages } from '../Investigationimage.model';
import { Payment_Master } from '../PaymentWebModel ';
import { InvestigationBillMaster } from '../InvestigationBillMaster.model';
import { paymenttran } from './OpticalOrderView.Model';





export class InvestigationBilling {

  Registration: Registration_Master = new Registration_Master();
  INV: Array<InvestigationImages> = [];
  Investigation: InvestigationImages = new InvestigationImages();
  OneLineMaster: OneLine_Master = new OneLine_Master();
  InvestigationBillMaster: InvestigationBillMaster = new InvestigationBillMaster();
  PaymentMaster: Array<Payment_Master> = [];
  BillDetails: Array<BillDetails> = [];
  paymenttran: Array<paymenttran> = [];
  uid: number = 0;
}

export class BillDetails {

  Investigation: string;
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
  TotalCost: number = 0;
  TaxID: number = 0;
}
