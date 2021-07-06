



export class CancelPORegView {

  getC_PO_Reg: Array<getC_PO_Reg> = [];
}


export class getC_PO_Reg {

  PoNo: string; 
  
  PoDate: string; 
  
  //Q_No: number;
     
  //Q_Date: number;
  Parent_No: number;
  Parent_Date: number;

       
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
