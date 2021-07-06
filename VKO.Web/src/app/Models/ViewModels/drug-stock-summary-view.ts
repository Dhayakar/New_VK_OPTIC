


export class DrugStockSummaryView {

  IDArrays: Array<IDArrays> = [];

  DropArray: Array<DropArray> = [];

  TempArr: Array<TempArr> = [];//Ledgers
  Ledgers: Array<Ledgers> = [];
}

export class Ledgers {
  DocumentDate: Date;
  DocumentNo: string;
  DocumentType: string;
  Store: string;
  Brand: string;
  UOM: string;
  OpeningBalance: number;
  Receipt: number;
  Issue: number;
  Balance: number;
  ClosingBalance: number;
}
export class DropArray {

  IDs: number;
  Amt: number;
  Drugname: string;
  Taxx: number
  Text: string;
  Value: number;
  Values: number;
  itemvalue: number;
  //From: Date;
  //To: Date;
  //CmpId: number;
}
export class IDArrays {

  IDs: number;
  Amt: number;
  Drugname: string;
  Taxx: number
  Text: string;
  Value: number;
  Values: number;
  itemvalue: number;
  //From: Date;
  //To: Date;
  //CmpId: number;

}


export class TempArr {

  IDs: number;

}
