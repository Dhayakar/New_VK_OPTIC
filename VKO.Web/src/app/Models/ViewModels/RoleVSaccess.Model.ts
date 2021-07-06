

import { User_Master } from '../User';
import { ModuleMaster } from '../ModuleMaster.Model';
import { RoleVsModule } from '../RoleVsModule';


export class RoleVSaccess {
  Modelmastername: ModuleMaster = new ModuleMaster();
  RoleVsModule: Array<RoleVsModule> = [];
  CmpID: string;
  Roleid: string;
  userdoctorid: string;
  ModuleNameGet: Array<ModuleNameGet> = [];
  ModuleMaster: Array<ModuleMasterget> = [];
  UpdateModuleMaster: Array<updateModuleMasterget> = [];
}
export class ModuleNameGet {
  RoleDesc: string;
  UserName: string;
}
export class ModuleMasterget {
  Desc: string;
  Code: number;
}
export class updateModuleMasterget {
  Desc: string;
  Add: boolean;
  Edit: boolean;
  Delete: boolean;
  All: boolean;
  Export: boolean;
  Update: boolean;
  ModType: string;

}
