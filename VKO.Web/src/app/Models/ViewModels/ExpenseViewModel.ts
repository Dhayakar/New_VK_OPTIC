import { paymenttran } from './Payment_master.model';

export class ExpenseViewModel {
  Expesneitemdata: Array<Expesneitemdata> = [];
  paymenttran: Array<paymenttran> = [];
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
