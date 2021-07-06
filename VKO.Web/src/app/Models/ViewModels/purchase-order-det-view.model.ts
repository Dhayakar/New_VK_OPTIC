


import { Drug_Master } from '../DrugMaster.model';

export class PurchaseOrderDetView {

  getPODet1: Array<getPODet> = [];
   
}


export class getPODet {

  
  Po_No1: string;
  Po_Date1: number;
  drugName1: string;
  drugQuantity1: number;
  drugRcvdQuantity1: number;
  UOM1: string;
  itemRate1: number;
 // itemValue1: number;
  discountPercentage1: number;
 // discountAmount1: number;
  GSTPercentage1: number;
 // GSTAmount1: number;
  TotalCost: number;
  ItemValue2: number
  discountAmount2: number;
  GSTAmount2: number;

}
