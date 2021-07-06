import { ProTax } from '../Protax';
import { ProTaxTran } from '../ProtaxTran';
import { DateTime } from 'wijmo/wijmo';


export class profesl {

  ProfesDetails: Array<ProfesDetails> = [];
  getDetails: Array<getDetails> = [];
  details: Array<details> = [];

  ProTax: ProTax = new ProTax();
  ProTaxTran: ProTaxTran = new ProTaxTran();
  getdate: Array<getdate> = [];

}


export class getDetails {

  From1: number;
  To1: number;
  PTAmount1: number;
  WithEffectFrom1: Date;
  StateID11: number;
  Frequency1: number;
  
}

  export class ProfesDetails {

  From: number;
  To: number;
  PTAmount: number;
  WithEffectFrom: Date;
  StateID: number;
  Frequency: number;
  

}

export class details {

  From: number;
  To: number;

}

export class getdate {

  StateIDS: number;

}
