import { Drug_Master } from '../DrugMaster.model';
import { DrugGroup_Master } from '../DrugGroupMaster';




export class drugMaster {
  drugMaster: Drug_Master = new Drug_Master();
  DrugDetail: Array<DrugDetail> = [];
  DrugGroupDetail: Array<DrugGroupDetail> = [];
  DrugGroup: DrugGroup_Master = new DrugGroup_Master;
  CMPID: string;
  DrugLanguageDescription: string;
}

export class DrugDetail {
  ID: number;
  DrugGroupID: string;
  DrugDescription: number;
  Form: string;
  Brand: string;
  UOM: string;
  Rate: number;
  HSNNo: string;
  Status: boolean;
}

export class DrugGroupDetail {
  Brand: string;
  MedicineName: string;
  Manufacturer: string;
}


