

export class OpticalTran {

  ID: number;
  OID: number;
  LensID: number = 0;
  Description: string = "";
  Quantity: number;
  UOMID: number = 0;
  Price: number;
  ProductAmount: number;
  TaxID: number;
  DiscountAmount: number = 0;
  TaxPercentage: number;
  TaxAmount: number = 0;
  NetAmount: number = 0;
  CreatedUTC: Date;
  UpdatedUTC: Date;
  CreatedBy: number;
  UpdatedBy: number = 0;

  DiscountPercentage: number = 0;
  LensOption: string = "";
  UOM: string = "";
  GrossAmount: number = 0;

}
