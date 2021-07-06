import { DateTime } from 'wijmo/wijmo';
import { BusinessRule } from "../BusinessRule";
import { BusinessRuleTran } from "../BusinessRuleTran";


export class BusinessRuleD {
  BusinessRule: BusinessRule = new BusinessRule();
  BusinessRT: Array<BusinessRT> = [];
  BusinessRT1: Array<BusinessRT1> = [];
  IcdSPYarray: Array<IcdSPYarray> = [];
  icdspyModuleDescription: Array<icdspyModuleDescription> = [];
}
//export class BusinessR {
//  ModuleID: number;
//  ModuleDescription: string;
//  BRBasedOn: string;
//  CMPID: number;
//  IsActive: boolean;
//  ICDCODE: string;
//  IsAllSurgery: boolean;
//  IsTransacted: boolean;
//  WEF: Date;

//}
export class icdspyModuleDescription {

  ////////////////////BusinessRT1//////////////////////
  ICDCODE: string;
  


}
export class IcdSPYarray {

  ////////////////////BusinessRT1//////////////////////
  ICDSPYDescription: string;
  id: number;


}
export class BusinessRT1 {

  ////////////////////BusinessRT1//////////////////////
  BRID: number;
  From: number;
  TO: number;
  Amount: number;
  NODays: number;
  WEF: DateTime;

}
export class BusinessRT
{

  ////////////////////BusinessRT//////////////////////
  BRID: number;
  From: number;
  TO: number;
  Amount: number;
  NODays: number;

}


