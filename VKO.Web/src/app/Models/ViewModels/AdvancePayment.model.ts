import { Payment_Master } from '../PaymentWebModel ';



export class AdvancePayment {

  payment: Payment_Master = new Payment_Master();
  paymenttran: Array<paymenttran> = [];

  ADVrePF: Array<ADVrePF> = [];
  uid: number = 0;


 
}



export class paymenttran {
  //UIN: string;
  //PaymentType: string;
  //IsBilled: boolean;
  //InVoiceNumber: string;
  //InVoiceDate: Date;

  PaymentMode: string;
  InstrumentNumber: string;
  Instrumentdate: Date;
  BankName: string;
  BankBranch: string;
  Expirydate: Date;
  Amount: number;
}


export class ADVrePF {
  PaymentMode: string;
  InstrumentNumber: string;
  Instrumentdate: Date;
  BankName: string;
  BankBranch: string;
  Expirydate: Date;
  Amount: number;     
  PAddress: string;
  PAddress2: string;
  PAddress3: string;
  Pphone: string;
  Pweb: string;
  PCompnayname: string;
}




