export class OpticalOrderTran
{
  OOID: number;
  LTID: number;
  UOMID: number;
  OrderedQty: number;
  ReceivedQty: number;
  Price: number;
  DiscountPercentage: number;
  DiscountAmount: number;
  GSTPercentage: number;
  GSTTaxValue: number;
  CGSTPercentage: number;
  CGSTTaxValue: number;
  SGSTPercentage: number;
  SGSTTaxValue: number;
  IGSTPercentage: number;
  IGSTTaxValue: number;
  CESSPercentage: number;
  CESSAmount: number;
  AdditionalCESSPercentage: number;
  AddCESSPerAmt: number;
  IsCancelled: boolean
  ContraOOID: number;
}
