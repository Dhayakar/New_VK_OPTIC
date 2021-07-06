import { SpecialityVSTest } from '../specialityvstest';
import { OneLine_Master } from '../OneLineMaster';



export class specialityvstest {


  SpecialityVSTest: Array<SpecialityVSTest> = [];
  SpecialityDetail: Array<SpecialityDetail> = [];
  SSpecialityDetail: Array<SSpecialityDetail> = [];
  OneLineMaster: OneLine_Master = new OneLine_Master();
  Code: number;
  CompanyID: string;
  UserID: string;

}

export class SpecialityDetail {
  Description: string;
  Select: boolean;
}

export class SSpecialityDetail {
  Description: string;
  Select: boolean;
}

