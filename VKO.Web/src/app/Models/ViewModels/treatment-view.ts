import { TreatmentMasterModel } from '../treatment-master-model';

export class TreatmentView {

  GetArray: Array<GetArray> = [];
  TableArray: Array<TableArray> = [];
  GetDataArray: Array<GetDataArray> = [];

  TreatmentMasterModel: TreatmentMasterModel = new TreatmentMasterModel();

}
export class GetArray {
  ID: number;
  SpecialityID: number;
  Description: string;
  IsActive: boolean;
}

export class TableArray {
  ID: number;
  SpecialityID: number;
  Description: string;
  IsActive: boolean;
}

export class GetDataArray {
  ID: number;
  SpecialityID: string;
  Description: string;
  IsActive: boolean;
}
