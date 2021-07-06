import { OneLine_Master } from '../OneLineMaster';
import { Refraction } from '../Refractionmaster.model';
import { RegistrationTran_Master } from '../registrationtrans.model';
import { SquintMaster } from '../SquintMaster';
import { SquintTran } from '../SquintTran';
import { PGP } from '../PGPmodel';
import { ACCEPTANCE } from '../ACCEPTANCE.model';
import { FINALPRESCRIPTION } from '../FINALPRESCRIPTION.model';
import { Amsler } from '../Amsler.model';
import { ColorVision } from '../ColorVision.model';
import { IntraOcularPressure } from '../IntraOcularPressure.model';
import { VISUALACUITY } from '../VISUALACUITY.model';
import { REFRACTIONEXT } from '../REFRACTIONEXT.model';



export class RefractionMaster {
  Refracion: Array<Refraction> = [];
  UIN: string;
  createdby: string;
  updatedby: string;
  OneLineMaster: OneLine_Master = new OneLine_Master();
  SquintTran: Array<SquintTran> = [];
  VISUALACUITY: Array<VISUALACUITY> = [];
  PGP: Array<PGP> = [];
  REFRACTIONEXT: Array<REFRACTIONEXT> = [];
  ACCEPTANCE: Array<ACCEPTANCE> = [];
  FINALPRESCRIPTION: Array<FINALPRESCRIPTION> = [];
  Amsler: Array<Amsler> = [];
  ColorVision: Array<ColorVision> = [];
  cmpid: number;
  Tag: string;
  SquintTranDelete: Array<SquintTranDelete> = [];
  paediatricvisualacuity: Array<paediatricvisualacuity> = [];
}



export class SquintTranDelete {

  ID: number;
  IsActive: boolean;

}

export class paediatricvisualacuity {
  Description: string;
  Central: boolean = false;
  Steady: boolean = false;
  Maintained: boolean = false;
  Uncentral: boolean = false;
  Unsteady: boolean = false;
  Unmaintained: boolean = false;
  CentralOS: boolean = false;
  SteadyOS: boolean = false;
  MaintainedOS: boolean = false;
  UncentralOS: boolean = false;
  UnsteadyOS: boolean = false;
  UnmaintainedOS: boolean = false;
  Ocular: string;
  OcularOS: string;
  CreatedBy: number;
  Remarks: string = "";
  ChartType: string;
  SubCategory: number = 0;
  OD: false;
  OS: false;
}















