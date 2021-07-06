import { Dmmeterial } from '../dmmeterial';
import { StockmasterModel } from '../StockmasterModel';
import { StockTranModel } from '../StockTranModel';
import { ItemBatchModel } from '../ItemBatchModel';
import { ItemBatchTranModel } from '../ItemBatchTranModel';

export class Vmmeterial {


  Dmmeterial: Dmmeterial = new Dmmeterial();
  StockmasterModel: StockmasterModel = new StockmasterModel();
  StockTranModel: StockTranModel = new StockTranModel();
  ItemBatchModel: ItemBatchModel = new ItemBatchModel();
  ItemBatchTranModel: ItemBatchTranModel = new ItemBatchTranModel();

  Meterials4: Array<Meterials4> = [];
  Meterials5: Array<Meterials5> = [];
  PushArray: Array<PushArray> = [];


}

export class Meterials4 {

  DrugName1: string
  RecivedQty1: number;
  ConsumedQty1: number;
  ConsumedQty2: number;
  BalanceQty1: number;
  BalanceQty2: number;
  BatchList1: string;
  QtyIssued: number;
  Expired: Date;
  Rate: number;
  GrossproductValue: number;
  TotalDiscountValue: number;
  TotalPOValue: number;
  TotalSGSTTaxValue: number;
  TotalIGSTTaxValue: number;
  TotalCGSTTaxValue: number;
  TotalTaxValue: number;
  SGSTPercentage: number;
  CGSTPercentage: number;
  UOM: string;
  IGSTPercentage: number;
  GenericName: string;
  ItemBatchID: number;
  GSTTaxValue: number;
  CGSTTaxValue: number;
  SGSTTaxValue: number;
  GSTPercentage: number;
  IGSTTaxValue: number;
  DiscountPercentage: number;
  DescountAmopunt: number;
}

export class Meterials5 {

  DrugName1: string;
  RecivedQty1: number = 0;
  ConsumedQty1: number = 0;
  ConsumedQty2: number = 0;
  BalanceQty1: number = 0;
  BalanceQty2: number = 0;
  QtyIssued: number = 0;
  BatchList1: string;
  Expired: Date;
  Rate: number;
  GrossproductValue: number;
  TotalDiscountValue: number;
  TotalPOValue: number;
  TotalSGSTTaxValue: number;
  TotalCGSTTaxValue: number;
  TotalTaxValue: number;
  SGSTPercentage: number;
  CGSTPercentage: number;
  UOM: string;
  GenericName: string;
  IGSTPercentage: number;
  TotalIGSTTaxValue: number;
  ItemBatchID: number;
  GSTTaxValue: number;
  CGSTTaxValue: number;
  SGSTTaxValue: number;
  GSTPercentage: number;
  IGSTTaxValue: number;
  DescountAmopunt: number;
  DiscountPercentage: number;
}


export class PushArray {

  DrugName1: string
  RecivedQty1: number;
  ConsumedQty1: number;
  ConsumedQty2: number;
  BalanceQty1: number;
  BalanceQty2: number;
  BatchList1: string;
  QtyIssued: number;
  Expired: Date;
  Rate: number;
  GrossproductValue: number;
  TotalDiscountValue: number;
  TotalPOValue: number;
  TotalSGSTTaxValue: number;
  TotalIGSTTaxValue: number;
  TotalCGSTTaxValue: number;
  TotalTaxValue: number;
  SGSTPercentage: number;
  CGSTPercentage: number;
  UOM: string;
  IGSTPercentage: number;
  GenericName: string;
  ItemBatchID: number;
  GSTTaxValue: number;
  CGSTTaxValue: number;
  SGSTTaxValue: number;
  GSTPercentage: number;
  IGSTTaxValue: number;
  DiscountPercentage: number;
  DescountAmopunt: number;

}
