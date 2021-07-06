import { TaxMaster } from '../tax-master.model';




export class TaxMasterViewM {

  
  taxMaster: TaxMaster = new TaxMaster();

  getTaxDet: Array<getTaxDet> = [];
}

export class getTaxDet {

  TaxDescription: string;
  GSTPercentage: number;
  CGSTPercentage: number;
  SGSTPercentage: number;
  IGSTPercentage: number;
  TaxGroup: string;
  IsActive: boolean;


}


