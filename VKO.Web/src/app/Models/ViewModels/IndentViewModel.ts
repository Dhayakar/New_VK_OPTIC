import { DateTime } from 'wijmo/wijmo';

export class IndentViewModel {
  Drugdetails: Array<Drugdetails> = [];
  GridDeatils: Array<Gridadata> = [];
 ExtraGridDeatils: Array<ExtraGridadata> = [];
  Indentdetails: IndentTotalData = new IndentTotalData();
  Userid: string;
  transactionid: string;

  Statuss: string;
  indentnumbers: string;
}

export class Drugdetails {
  DrugID: number;
  DrugDescription: string;
}
export class IndentTotalData {
  OperationtheatreID: string;
  OTRaisedBY: string;
  Storename: string;
  OTIndentdate: string;
}

export class Gridadata {
  Manufacture: string;
  Generic: string;
  UOM: string;
  Brand: string;
  IndnetQTY: number;
  Drugdroup: string;



}


export class ExtraGridadata {
  Manufacture: string;
  Generic: string;
  UOM: string;
  Brand: string;
  IndnetQTY: string;
  Drugdroup: string;
  OTRAISEDDATE: DateTime;


}
