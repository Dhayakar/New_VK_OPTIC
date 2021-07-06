

export class ItemBatch {


  ItemBatchID: number; 
  SMID: number; 
  STID: number; 
  ItemID: number; 
  ItemBatchNumber: string = null; 
  ItemBatchQty: number = 0; 
  UOMID: number = 0;
  ContraItemBatchID: number; 
  CreatedUTC: Date;
  UpdatedUTC: Date;
  CreatedBy: number;
  UpdatedBy: number = 0; 



}
