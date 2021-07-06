

export class Diagnosis {

  ID: number;
  FindingsID: string;
  DiagnosisId = '';
  IsOD: boolean;
  IsOS: boolean;
  IsOU: boolean;
  CreatedUTC: Date;
  UpdatedUTC: Date;
  CreatedBy: number;
  UpdatedBy = 0;
  Description: string = null;

  icddesc: string = null;
  iccode: string = null;
}
