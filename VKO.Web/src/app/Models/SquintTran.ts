export class SquintTran {
  ID: number;
  SquintID: number;
  IsDVOD: boolean = false;
  IsDVOS: boolean = false;
  IsDVOU: boolean = false;
  OD: boolean;
  OS: boolean;
  OU: boolean;
  IsActive: boolean;
  chkOD: boolean = true;
  chkOS: boolean = true;
  chkOU: boolean = true;
  checkStatusOD: boolean = false;
  checkStatusOS: boolean = false;
  checkStatusOU: boolean = false;
  SquintType: number = 0;
  SquintDiagnosisDescription = '';
  CreatedBy = 0;
  CreatedUTC: Date;
  UpdatedBy = 0;
  UpdatedUTC: Date;
}


