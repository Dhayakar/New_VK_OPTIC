import { Financial } from '../Financialmodel';
import { FinancialStatus } from '../FinancialStatus';
import { clamp } from 'wijmo/wijmo';



export class FinancialViewData {

  Fes: Financial = new Financial();
  Fts: FinancialStatus = new FinancialStatus();


  FinancialDetails: Array<FinancialDetails> = [];


}


export class FinancialDetails {

  ID: number;
  FYDescription: string;
  //Tag: string;
  FYFrom: string;
  FYTo: number;
  FYAccYear: number;
  IsActive: number;
  ClosedBy: number;
  FYStatus: number;
  DateTime: Date;

}

