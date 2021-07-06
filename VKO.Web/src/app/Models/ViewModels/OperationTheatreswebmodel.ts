
import { OperationTheatre } from "../OPerationTheatre";
import { OperationExtension } from '../OperationExtension';

export class OperationTheatres {


  OperationTheatre: OperationTheatre = new OperationTheatre();
  OperationExtensionDetails: Array<OperationExtension> = [];
  OperationExtension: Array<OperationExtension> = [];
}


export class OperationExtensionDetails {

  ICDCODE: string;
  ICDSPECIALITY: string;
  ID: number;
  OTID: number;
}
