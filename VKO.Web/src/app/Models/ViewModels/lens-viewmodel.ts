
import { LensTranModel } from '../lens-tran-model';
import { Lensmaster } from '../LensMaster.model';
import { OneLine_Master } from '../OneLineMaster';


export class LensViewmodel {

  Lensmaster: Lensmaster = new Lensmaster();
  OneLineMaster: OneLine_Master = new OneLine_Master();
  LensTranModel: Array<LensTranModel> = [];
}





