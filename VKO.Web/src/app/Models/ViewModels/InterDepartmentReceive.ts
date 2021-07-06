

export class InterDepartmentReceive {
  storeId: number;
  SenderstoreId: number;
  SenderUserId: number;
  SentSmid: string;
  Senderdatetime: Date;
  Recdatetime: Date;
  cmpid: number;
  CreatedBy: number;
  TransactionID: number;
  ItemDetails: Array<StockTransferItemDetail> = [];
  fullItemsReceivedDetails: Array<fullItemsReceivedDetail> = [];
  RecName: string;
}

export class fullItemsReceivedDetail {
  ItemId: number;
  DrugName: string;
  GenericName: string;
  UOM: string;
  SMID: string;
  STID: string;
  IsSerial?: boolean;
  BatchSerial: string;
  ItemBatchID: string;
  SentQuantity: number;
  RecQuantity: number;
  Difference: number;
  BatchExpiry: Date;
  Reasons: string;

}

export class StockTransferItemDetail {
  ItemId: number;
  DrugName: string;
  TotalQuantity: number;
  SMID: string;
  STID: string;
  IsSerial?: boolean;
  ItemReceivedBatchDetails: Array<ReceivedBatchDetail> = [];
  ItemReceivedSerialDetails: Array<ReceivedSerialDetail> = [];
  ItemReceivedOtherDetails: Array<ReceivedOtherDetail> = [];
}


export class ReceivedBatchDetail {
  ItemBatchID: string;
  ItemBatchNo: string;

  SentQuantity: number;
  RecQuantity: string;
  Difference: number;
  BatchExpiry: Date;
  Reasons: string;
}

export class ReceivedSerialDetail {
  SerialNo: number;
  ExpiryDate: Date;
  Difference: number;
  Reasons: string;
}


export class ReceivedOtherDetail {
  SentQty: number;
  Recqty: string;
  Difference: number;
  Reasons: string;
}

