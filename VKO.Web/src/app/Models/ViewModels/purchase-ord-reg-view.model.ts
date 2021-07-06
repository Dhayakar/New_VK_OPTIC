export class PurchaseOrdRegView {
  getPO_Reg: Array<getPO_Reg> = [];

  getPO_Reg1: Array<getPO_Reg1> = [];
}

export class getPO_Reg {

  PoNo: string;

  PoDate: string;

  Q_No: number;

  Q_Date: number;
 // Parent_No: number;
  //Parent_Date: number;


  VendorName: string;

  Dlvry_Name: string;

  Dlvry_Addrss: string;

  Location: string;

  Gross_Prod_val: number;
  Tot_Dis_val: number;

  Tot_Tax_val: number;

  //Tot_CGSTTax_val: number;
  // Tot_SGSTTax_val: number;
  Tot_Po_val: number;

  PO_status: string;

  Parent_PO_No: number;

  Parent_PO_Date: number;




}

export class getPO_Reg1 {

  PoNo1: string;

  PoDate1: string;

  //Q_No: number;

  //Q_Date: number;
  Parent_No1: number;
  Parent_Date1: number;


  VendorName1: string;

  Dlvry_Name1: string;

  Dlvry_Addrss1: string;

  Location1: string;

  Gross_Prod_val1: number;
  Tot_Dis_val1: number;

  Tot_Tax_val1: number;

  //Tot_CGSTTax_val: number;
  // Tot_SGSTTax_val: number;
  Tot_Po_val1: number;

  PO_status1: string;

  Parent_PO_No1: number;

  Parent_PO_Date1: number;




}

