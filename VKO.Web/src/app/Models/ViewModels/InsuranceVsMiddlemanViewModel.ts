import { Insurance } from "../Insurance.model";
import { InsuranceVsMiddleman } from '../InsuranceVsMiddleman.model';




export class InsuranceVsMiddlemanViewModel {

  Insurance: Insurance = new Insurance();
  InsuranceVsMiddleman: InsuranceVsMiddleman = new InsuranceVsMiddleman
  InsertIvsM: Array<InsertIvsM> = [];
  UpdateIvsM: Array<UpdateIvsM> = [];
}
export class InsertIvsM {
  ID: number;
  Name: string;
  Amount: number;
}
export class UpdateIvsM {
  ID: number;
  IvsMID: number;
  Name: string;
  Amount: number;
  checkeda: boolean;

}
