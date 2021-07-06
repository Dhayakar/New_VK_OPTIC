

export class Finding {

  ID: number;
  RandomUniqueID: string;
  CmpID: number;
  RegistrationTranID: number;
  UIN = '';
  SlitLampODImagePath = '';
  SlitLampOSImagePath = '';
  IOLNCTOD: string = null;
  IOLNCTOS: string = null;
  IOLATOD: string = null;
  IOLATOS: string = null;
  FundusODImagePath: string = null;
  FundusOSImagePath: string = null;
  DiagnosisOthers: string = null;
  ProposedSurgeryPeriod: string = null;
  TreatmentAdvice: string = null;
  IsSurgeryAdviced: boolean;
  Consultation: number;
  ReviewDate: Date;
  CreatedUTC: Date;
  UpdatedUTC: Date;
  CreatedBy: number;
  UpdatedBy = 0;
  Category = 0;
  Categoryos = 0;
  DistSphod: string = null;
  NearCylod: string = null;
  N_V_DESCod: string = null;
  PinAxisod: string = null;
  DistSphos: string = null;
  NearCylos: string = null;
  N_V_DESCos: string = null;
  PinAxisos: string = null;
  IOLNCTbdOD: string = null;
  IOLNCTbdOS: string = null;
  IOLATbdOD: string = null;
  IOLATbdOS: string = null;
  PgDtls: string = null;
  PgSphOD: string = null;
  PgCylOD: string = null;
  PgAxisOD: string = null;
  PgAddOD: string = null;
  PgSphOS: string = null;
  PgCylOS: string = null;
  PgAxisOS: string = null;
  PgAddOS: string = null;
  RDySphOD: string = null;
  RDyCylOD: string = null;
  RDyAxisOD: string = null;
  RDySphOS: string = null;
  RDyCylOS: string = null;
  RDyAxisOS: string = null;
  RWtSphOD: string = null;
  RWtCylOD: string = null;
  RWtAxisOD: string = null;
  RWtSphOS: string = null;
  RWtCylOS: string = null;
  RWtAxisOS: string = null;
  Instrument = 0;
  PGlassOD: string = null;
  PGlassOS: string = null;
  TimeNCT: string = null;
  TimeAT: string = null;
  ConsultantFees: number;
  IsBilled: boolean;
}
