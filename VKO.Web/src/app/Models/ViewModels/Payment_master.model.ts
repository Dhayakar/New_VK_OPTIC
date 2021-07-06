import { Payment_Master } from '../PaymentWebModel ';
import { MedicalBillTran } from '../MedicalBillTran.model';
import { MedicalBill_Master } from '../MedicalBillMaster.model ';
import { MedicalPrescriptionIddetails } from './BillingPharmacy_master.model';



export class Payment {

  payment: Payment_Master = new Payment_Master();
  MedicalBillTran: MedicalBillTran = new MedicalBillTran();
  MedicalBillMaster: MedicalBill_Master = new MedicalBill_Master();
  MedicalPrescriptionIddetails: Array<MedicalPrescriptionIddetails> = [];
  paymenttran: Array<paymenttran> = [];
  StoreID: number;
  CmpId: number;
  Tc: number;
  CreatedBy: number;
  Status: string;
  MedicalBillID: number;
  PendingPayment: PendingPayment = new PendingPayment();
}



export class paymenttran {
  PaymentFor: string;
  PaymentAgainstID: number;
  PaymentMode: string;
  InstrumentNumber: string;
  Instrumentdate: Date;
  BankName: string;
  BankBranch: string;
  Expirydate: Date;
  Amount: number;
  // Generalid:number
}


export class PendingPayment {
  UIN: string;
  MedicalBillID: number;
  CreditItemCost: number;
  TC: number;
  CMPID: number;
  CreatedBy: number;
  PayRef: string;
}
