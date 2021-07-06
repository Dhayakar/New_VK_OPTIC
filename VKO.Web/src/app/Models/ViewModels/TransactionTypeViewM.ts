import { TransactionType } from '../transaction-type.model';


export class TransactionTypeViewM {


  TransactionType: TransactionType = new TransactionType();

  getContraDet: Array<getContraDet> = [];

}


export class getContraDet {


  TransactionID: number;
  Description: string;
}
