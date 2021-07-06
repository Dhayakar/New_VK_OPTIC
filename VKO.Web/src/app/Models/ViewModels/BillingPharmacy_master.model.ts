import { MedicalBillTran } from '../MedicalBillTran.model';
import { MedicalBill_Master } from '../MedicalBillMaster.model ';
import { Payment_Master } from '../PaymentWebModel ';
import { BatchlistDetails } from './OTConsumptionViewModel';
import { PendingPayment } from './Payment_master.model';




export class BillingPharmacy {
  UINSearchDetails: Array<UINSearchDetails> = [];
  DateMedicalPrescription: Array<DateMedicalPrescription> = [];
  MedicalPrescriptionIddetails: Array<MedicalPrescriptionIddetails> = [];
  ExtraDrugDetails: Array<ExtraDrugDetails> = [];
  MedicalBillTran: MedicalBillTran = new MedicalBillTran();
  MedicalBillMaster: MedicalBill_Master = new MedicalBill_Master();
  //paymenttran: Payment_Master = new Payment_Master();
  GetClosedDetails: Array<GetClosedDetails> = [];
  getRegisterDetail: Array<getRegDet> = [];
  getSummaryDet: Array<grouped1> = [];
  paymenttrans: Array<paymenttrans> = [];
  ExactAlloted: Array<AllotedBatch> = [];
  StoreID: number;
  CreatedBy: number;
  CmpId: number;
  Status: string;
  Tc: number;

  //ReturnMedicalBillItemdetails: Array<ReturnMedicalBillItemdetail> = [];
}
export class AllotedBatch {
  DrugId: number;
  itemBatchNo: string;
  balanceQty: number;
  ExpiryDate: string;
  CreatedUTC: Date;
}



export class paymenttrans {
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

export class getRegDet {
  BillNo: string;
  BillDate: number;
  PatientName: string;
  item: string;
  UOM: string;
  Quantity: number;
  Rate: number;
  ProductValue: number;
  Discount: number;
  DiscountAmount: number;
  GST: number;
  GSTValue: number;
  ItemRate: number;
  TotalCost: number;
}
export class grouped1 {

  Item: string;
  Uom: string;
  Quan: number;
  Irate: number;
  Tvalue: number;
  IDis: number;
  Damt: number;
  IGst: number;
  Gamt: number;
  // ItemRate1: number;
  TotalCost1: number;
}



export class UINSearchDetails {
  PatientName: string;
  Age: number;
  Gender: string;
  PrescribedDoctor: string;
  PrescribedDate: Date;
  RegistrationTranID: number;
}



export class DateMedicalPrescription {
  PatientName: string;
  Age: string;
  Gender: string;
  PrescribedDoctor: string;
  PrescribedDate: Date;
  RegistrationTranID: number;
  UIN: string;
  MedicalPrescriptionID: number;
  MedicalPrescriptionNo: string;
  Status: string;
}



export class MedicalPrescriptionIddetails {
  Drug: string;
  DrugID: number;
  Quantity: number;
  UOM: string;
  UnitPrice: number;
  GST: number;
  GSTValue: number;
  Cess: number;
  AddCess: number;
  CessValue: number;
  AddCessValue: number;
  Discount: number;
  IsMedicinePrescribed: boolean;
  Amount: number;
  DiscountAmount: number;
  GrossAmount: number;
  TotalCost: number;
  ItemRate: number;
  MedicalPrescriptionTranId: number;
  IsAvailable: boolean;
  AvailQuantity: number;

  IsSerial: boolean;
  BatchDetail: Array<BatchlistDetails> = [];
  SerialsInfo: [];
  SelectedList: [];
  SelectedBatchQty: number;
  Reqqty: number;
  TaxDescription: string;
}

export class ExtraDrugDetails {
  Drug: string;
  DrugID: number;
  Quantity: number;
  UOM: string;
  UnitPrice: number;
  GST: number;
  GSTValue: number;
  Discount: number;
  IsMedicinePrescribed: boolean;
  Amount: number;
  DiscountAmount: number;
  GrossAmount: number;
  TotalCost: number;
  ItemRate: number;
  Cess: number;
  AddCess: number;

}


export class GetClosedDetails {
  DrugID: number;
  Drug: string;
  Reqqty: number;
  UOM: string;
  UnitPrice: number;
  GST: number;
  GSTValue: number;
  Discount: number;
  Amount: number;
  DiscountAmount: number;
  GrossAmount: number;
  TotalCost: number;
  Cess: number;
  AddCess: number;
  CessValue: number;
  AddCessValue: number;
  TaxDescription: string;
}

export class ReturnMedicalBillItemdetail
{
  ItemId: number;
  Drug: string;
  UOM: string;
  Qty: number;
  AlreadyReturnQty: number;
  ReturnQty: number;
  UnitPrice: number;
  Amount: number;
  Discount: number;
  DiscountAmount: number;
  GST: number;
  Cess: number;
  AddCess: number;
  TotalCost: number;
  GSTValue: number;
  CessValue: number;
  AddCessValue: number;
  TaxID: number;
  MedicalbillTranID: number;
  MedicalPrescriptionTranId: number;
  MedicalPrescriptionID: number;
  IsMedicinePrescribed: boolean;
  IsSerial: boolean;
  BatchDetails: Array<ReturnBatchDetails> = [];
  onSelection: Array<ReturnSerialDetails> = [];
  SelectedList: Array<ReturnSerialDetails> = [];
  SelectedBatchQty: number;
  IsReturned: boolean;
}

export class ReturnSerialDetails {
  SerialNo: string; 
  ExpiryDate: Date;
  BillNo: string; 
}

export class ReturnBatchDetails
{
  BatchNo:string
  ExpiryDate:Date
  TransactQty:number
  ReturnQty:number
  SMID: string
  STID: string
  ItemBatchTransID: string
  QtyToReturn: number
}


export class BillingReturns {
  TC: number
  Cmpid: number
  CreatedBy: number
  StoreID: number
  MedicalBillId: number
  BillNo: string
  UIN: string
  BillType: string

  ReturnMedicalBillItemdetails: Array<ReturnMedicalBillItemdetail> = [];
  paymenttrans: Array<paymenttrans> = [];
}



export class CreditPayment {
  CmpId: number;
  Tc: number;
  CreatedBy: number;
  Status: string;
  MedicalBillID: number;
  PendingPayment: PendingPayment = new PendingPayment();
  paymenttrans: Array<paymenttrans> = [];
  PaymentHistory: Array<paymenttrans> = [];
}
