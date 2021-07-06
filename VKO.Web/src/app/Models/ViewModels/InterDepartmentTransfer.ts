import { BatchlistDetails } from './OTConsumptionViewModel';


export class InterDepartmentTransfer {
 // interTransfer: interTransfer = new interTransfer();
  interTransfers: Array<interTransfer> = [];
  SupplierStoreID: number;
  ReceiverStoreID: number;
  Cmpid: number;
  TransactionId: number;
  CreatedBy: number;
  ExactAlloted: Array<TransferBatch> = [];
}

export class interTransfer {
  ID: number;
  Brand: string;
  GenericName: string;
  UOM: string;
  Quantity: number;

  ItemBatchBalnceQty: number;
  RetestInterval: number;
  RetestCriticalInterval: number;

  IsAvailable: boolean
  IsSerial: boolean
  AvailQuantity: number;
  BatchDetail: Array<BatchlistDetails> = [];
  SerialsInfo: [];
  SelectedList: [];
  SelectedBatchQty: number
}

export class TransferBatch {
  DrugId: number
  itemBatchNo: string
  balanceQty: number
  ExpiryDate: string
  CreatedUTC: Date
  GoingToIssue:number
}
