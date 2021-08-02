




export class ExcelModel {

  Excelimport: Array<RegistrationExcel> = [];
  DrugExcelimport: Array<DrugExcelimport> = [];
  DrugStockExcelimports: Array<DrugStockExcelimport> = [];
  OpticalStockExcelimports: Array<OpticalStockExcelimport> = [];
  StoreId: number;
  VendorID: number;
  Lensarray: Array<Lensarray> = [];
  Lensframestock: Array<Lensframestock> = [];
}


export class Lensframestock {
  Type: string;
  Brand: string;
  Quantity: number;
  Status: string;
}


export class Lensarray {
  Type: string;
  Sph: string;
  Cyl: string;
  Axis: string;
  Add: string;
  Index: string;
  Model: string;
  Size: string;
  Colour: string;
  Brand: string;
  Prize: number;
  CostPrize: number;
  InclusiveTax: string;
  InclusiveTaxbool: boolean;
  UOM: string;
  HSNNo: string;
  FrameShape: string;
  FrameType: string;
  FrameWidth: string;
  FrameStyle: string;
  TaxDescription: string;
  GSTPercentage: number;
  IGSTPercentage: number;
  Status: string;
  Sphh: string;
  Cyll: string;
  Axiss: string;
  Addd: string;
  FrameShapee: string;
  FrameTypee: string;
  FrameWidthh: string;
  FrameStylee: string;
}

export class RegistrationExcel {
  UIN: string;
  DateofRegistration: string;
  Name: string;
  MiddleName: string;
  LastName: string;
  DateofBirth: string;
  Gender: string;
  Address1: string;
  Address2: string;
  Phone: number;
  Status: string;
  //Fees: number;
}


export class DrugExcelimport {
  ID: number;
  Brand: string;
  GenericName: string;
  Manufacturer: string;
  UOM: string;
  DrugGroup: string;
  Rate: string;
  DrugCategory: string;
  DrugTracker: string;
  HSNO: string;
  DrugSubDescription: string;
  AConstant: string;
  OpticDia: string;
  ModelNo: string;
  Length: string;
  DrugComposition: string;
  Status: string;
}

export class DrugStockExcelimport {
  DrugID: number;
  Brand: string;
  Generic: string;
  BatchSerial: string;
  Date: Date;
  Quantity: number;
  Status: string;
  Remarks: string;
}


export class OpticalStockExcelimport {
  OpticalID: number;
  Brand: string;
  LensType: string;
  LensOptions: string;
  Model: string;
  Quantity: number;
  Status: string;
  Remarks: string;
}
