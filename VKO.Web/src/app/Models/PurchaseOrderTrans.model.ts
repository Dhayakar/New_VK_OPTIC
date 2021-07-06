export class PurchaseOrderTrans {

  POTranID: number;
  POID: number;
  ItemID: number;
  ItemQty: number = 0;
  PORecdQty: number = 0;
  POCancelledQty: number = 0;
  UOMID: number = 0;
  ItemRate: number = 0;
  ItemValue: number = 0;
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
  IGSTTaxValue: number = 0;
  IGSTPercentage: number = 0;
  CESSPercentage: number = 0;
  CESSAmount: number = 0;
  AdditionalCESSPercentage: number = 0;
  AddCESSAmount: number = 0;


}


