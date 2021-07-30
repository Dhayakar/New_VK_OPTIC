
export class OpticalDashboardViewModel {
  OpsumRandomUniquieIDs: Array<string> = [];
  OpticalBillSalesAmounts: Array<OpticalBillSalesAmount> = [];
  OpticalAdvanceAmounts: Array<OpticalAdvanceAmount> = [];
}


export class OpticalBillSalesAmount {
  BillNo:string
  BillDate:Date 
  CustomerName:string
  Description:string 
  Brand:string
  UOM:string 
  Qty:number 
  Rate:number   
  Amount:number 
  DisPerc: number
  DisAmount: number
  GrossAmount: number
  NetAmount: number
  GST: number
  CGST: number
  CGSTValue: number
  SGST: number
  SGSTValue: number


  IGST: number
  IGSTValue: number




  CESS:number
  AddCess: number
  GSTValue: number
  CESSValue: number
  AddCessValue: number
  GSTDesc: string
  CESSDesc: string
  AddCessDesc: string
}


export class OpticalAdvanceAmount {
  ReceiptNo: string 
  ReceiptDate: Date
  CustomerName: string
  SaleAmount: number
  CollectedAmount: number 
  PayMode: string
  InstrumentNo: string
  InstrumentDate: Date
  BankName: string
  Expirydate: Date
  Amount: number
}
