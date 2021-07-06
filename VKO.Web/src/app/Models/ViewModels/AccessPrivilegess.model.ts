


import { User_Master } from "../User";
import { RoleVsModule } from '../RoleVsModule';



export class AccessPrivilegess {


  Moduleget: Array<Moduleget> = [];

  RoleVsModule: Array<RoleVsModule> = [];

 // RoleVsModuleaccessupdate: Array<RoleVsModule> = [];

  AccessPrivilegesname: Array<AccessPrivilegesname> = [];

  Getacessprivi: Array<Getacessprivi> = [];



}



export class AccessPrivilegesname {

  RoleDesc: string;
  UserName: string;
  UserroleID: number;

}

export class Moduleget {

  Desc: string;
  Code: number;


}

export class Getacessprivi {


  ModuleID: number;
  Add: boolean;
  Edit: boolean;
  Delete: boolean;
  Query: boolean;
  Print: boolean;
  All: boolean;
  UserRoledesc: string;
  UserRoleID: string;
  RolemodID: number;

}

