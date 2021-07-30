import { paymenttran } from './Payment_master.model';
import { Payment_Master } from '../PaymentWebModel ';

export class ExpenseViewModel {
  Expesneitemdata: Array<Expesneitemdata> = [];
  paymenttran: Array<paymenttran> = [];
  PaymentMaster: Array<Payment_Master> = [];
  paidto: string;
  Cmpid: number;
  OrderDate: string;
  Paymenttotalamount: number;
  Userid: number;
  TransactionID: number;
}

export class Expesneitemdata {
  ID: number
  Expensedescription: string
  Remarks: string
  Amount: number;
}
