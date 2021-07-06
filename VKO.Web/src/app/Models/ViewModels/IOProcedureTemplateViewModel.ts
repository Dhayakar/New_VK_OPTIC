export class IOProcedureTemplateViewModel {

  IOProcedureTemp: IOProcedureTemp = new IOProcedureTemp();
  IOProcedureTempDetails: Array<IOProcedureTemp> = [];
}


export class IOProcedureTemp {
  ID: number;
  icdSpeciality: string;
  SurgeryDescription: string;
  OTNotesDescription: string;
  Status: boolean;
  icdSpecialityDesc: string;
  UserInputType: string;
  InputValue: string;

  changed: boolean;
  Added: boolean;
}
