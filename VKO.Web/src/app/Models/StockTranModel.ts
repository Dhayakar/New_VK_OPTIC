

export class StockTranModel {

  STID: number;
  SMID: number;
  ItemID: number;
  ItemQty: number;
  UOMID: number;
  ItemRate: number;
  ContraSMID: number;
  ContraSTID: number;
  DiscountPercentage: number;
  DiscountAmount: number;
  GSTPercentage: number;
  GSTTaxValue: number;
  CGSTPercentage: number;
  CGSTTaxValue: number;
  SGSTPercentage: number;
  SGSTTaxValue: number;
  IsDeleted: boolean;
  UpdatedUTC: Date;
  CreatedBy: number;
  UpdatedBy: number;
  CreatedUTC: Date;
  DrugName: string;

}
