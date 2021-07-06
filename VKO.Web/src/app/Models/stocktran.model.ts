


export class StockTran {


  STID: number;
  SMID: number;
  ItemID: number;
  ItemQty: number = 0;
  UOMID: number = 0;
  ItemRate: number = 0;
  ItemValue: number = 0;
  ContraSMID: number;
  ContraSTID: number;
  DiscountPercentage: number = 0;
  DiscountAmount: number = 0;
  GSTPercentage: number = 0;
  GSTTaxValue: number = 0;
  CGSTPercentage: number = 0;
  CGSTTaxValue: number = 0;
  SGSTPercentage: number = 0;
  SGSTTaxValue: number = 0;
  IsDeleted: boolean;
  CreatedUTC: Date;
  UpdatedUTC: Date;
  CreatedBy: number;
  UpdatedBy: number = 0;



}
