
import {ModuleMaster} from '../ModuleMaster.Model';
export class ModuleMasterView {


  ModuleMaster: ModuleMaster = new ModuleMaster();
  getModuleMasDetails: Array<getModuleMasDetails> = [];
  getparentName: Array<getparentName> = [];

  Description: string;
  Tag: boolean;
  CMPUID: string;

}



export class getModuleMasDetails {
  ModuleID: number;
  ModuleDescription: string; 
  ModuleType: string;
  ParentModuleid1: number; 
  ParentModule: string;
  Parentmoduledescription: string;
  CmpID: number;
  IsActive: boolean;
}

export class getparentName {

  ModuleID1: number;
  ModuleDescription1: string;

}
