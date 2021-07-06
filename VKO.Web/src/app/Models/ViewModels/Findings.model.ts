
import { ICDMaster } from '../icdmaster.model';
import { OneLine_Master } from '../OneLineMaster';
import { Refraction } from '../Refractionmaster.model';
import { Finding } from '../findings.model';
import { SlitLamp } from '../slitlamp.model';
import { InvestigationTran } from '../investigationtran.model';
import { Investigation } from '../investigation.model';
import { Diagnosis } from '../diagnosis.model';
import { Registration_Master } from '../RegistrationMasterWebModel';
import { Fundus } from '../fundus.model';
import { SlitlampExtn } from '../slitlampextn.model';
import { FindingsExt } from '../findingsext.model';
import { SquintMaster } from '../SquintMaster';
import { SquintTran } from '../SquintTran';
import { SquintImage } from '../squintimage.model';
import { SlitLampImage } from '../slitlampimage.model';
import { FundusImage } from '../fundusimage.model';
import { Glaucoma } from '../glaucoma';
import { GlaucomaImage } from '../glaucomaimage.model';
import { VisualField } from '../visualfield.model';
import { GlaucomaEvaluation } from '../glaucomaevaluation';
import { InvPrescription } from '../InvestigationPrescription';
import { InvPrescriptionTran } from '../InvestigationPrescriptionTran';
import { PatDetails } from './Investigationimage.model';
import { InvestigationImages } from '../Investigationimage.model';
import { TonometryTran } from '../TonometryTran.model';
import { SlitLampMaster } from '../SlitLampMaster';
import { FundusMaster } from '../FundusMaster';
import { FDDTDescriptionDetail } from './PatientHistoryDetailsView';
import { SquintExt } from '../SquintExt.model';
import { SquintExtnMaster } from '../SquintExtnMaster';
import { SchirmerTest } from '../SchirmerTest';
import { Tonometry } from '../Tonometry.model';
import { VISUALACUITY } from '../VISUALACUITY.model';
import { PGP } from '../PGPmodel';
import { REFRACTIONEXT } from '../REFRACTIONEXT.model';
import { DryEyes } from '../DryEyes';
import { UploadInvestigationPrescription } from '../UploadInvestigationPrescription.model';
import { paediatricvisualacuity } from './RefractionMaster.model';
import { EyelidDisorder } from '../EyelidDisorder';
import { EyelidImage } from '../eyelidimage.model';




export class Findings {

  VISUALACUITY: Array<VISUALACUITY> = [];
  SlitLampMaster: SlitLampMaster = new SlitLampMaster();
  FundusMaster: FundusMaster = new FundusMaster();
  TonometryTran: Array<TonometryTran> = [];
  InvPrescription: InvPrescription = new InvPrescription();
  UploadInvestigationPrescription: Array<UploadInvestigationPrescription> = [];
  InvPsT: Array<InvPrescriptionTran> = [];
  SquintExtnMaster: SquintExtnMaster = new SquintExtnMaster();
  EyelidDisorder: EyelidDisorder = new EyelidDisorder();
  MastersName: string;
  uid = 0;
  Investigation: InvestigationImages = new InvestigationImages();
  PatDetails: Array<PatDetails> = [];
  INV: Array<InvestigationImages> = [];
  ICDMaster: ICDMaster = new ICDMaster();
  OneLineMaster: OneLine_Master = new OneLine_Master();
  Glaucoma: Glaucoma = new Glaucoma();
  SquintExt: SquintExt = new SquintExt();
  GlaucomaImage: Array<GlaucomaImage> = [];
  Registration: Registration_Master = new Registration_Master();
  Refracion: Array<Refraction> = [];
  PGP: Array<PGP> = [];
  REFRACTIONEXT: Array<REFRACTIONEXT> = [];
  Finding: Finding = new Finding();
  SlitlampExtn: SlitlampExtn = new SlitlampExtn();
  SquintMaster: SquintMaster = new SquintMaster();
  SquintTran: Array<SquintTran> = [];
  SLT: Array<SlitLamp> = [];
  Patientinfo: Array<Patientinfo> = [];
  Slitinfo: Array<Slitinfo> = [];
  Diag: Array<Diag> = [];
  InvestigationTran: InvestigationTran = new InvestigationTran();
  PatientinfoOs: Array<PatientinfoOs> = [];
  FindingsExt: Array<FindingsExt> = [];
  SQI: Array<SquintImage> = [];
  SlitLampImage: Array<SlitLampImage> = [];
  EyelidImage: Array<EyelidImage> = [];
  FundusImage: Array<FundusImage> = [];
  VisualField: Array<VisualField> = [];
  SquintTranDeletefi: Array<SquintTranDeletefi> = [];
  SchirmerTest: Array<SchirmerTest> = [];
  Tonometry: Tonometry = new Tonometry();
  IOPOs: Array<IOPOs> = [];
  DIA: Array<Diagnosis> = [];
  Slithis: Array<Slithis> = [];
  Diaghis: Array<Diaghis> = [];
  Slitlatest: Array<Slitlatest> = [];
  Diaglate: Array<Diaglate> = [];
  Options: Array<Options> = [];
  IOP: Array<IOP> = [];
  SlitOdimg: string;

  Adnexa: Array<Adnexa> = [];
  Lids: Array<Lids> = [];
  Conjuctiva: Array<Conjuctiva> = [];
  Cornea: Array<Cornea> = [];
  Antchmbr: Array<Antchmbr> = [];
  Iris: Array<Iris> = [];
  Pupil: Array<Pupil> = [];
  Lens: Array<Lens> = [];
  OcularMovements: Array<OcularMovements> = [];

  Fundus: Array<Fundus> = [];

  Disc: Array<Disc> = [];
  Vessels: Array<Vessels> = [];
  Macula: Array<Macula> = [];
  Funlatest: Array<Funlatest> = [];
  Funlatest1: Array<Funlatest1> = [];
  Slitlatest1: Array<Slitlatest1> = [];
  GlaucomaEvaluation: Array<GlaucomaEvaluation> = [];

  FDDTDescriptionDetails: Array<FDDTDescriptionDetail> = [];
  SYRINGINGDescriptionDetails: Array<FDDTDescriptionDetail> = [];
  SchDeletefi: Array<SchDeletefi> = [];
  GlaDeletefi: Array<GlaDeletefi> = [];
  paediatricvisualacuity: Array<paediatricvisualacuity> = [];

  DryEyes: DryEyes = new DryEyes();

  UIN: string;
  createdby: string;
  updatedby: string;
  cmpid: number;
  Tag: string;

  FddtSyringeRemoval: FddtSyringeRemoval= new FddtSyringeRemoval();


}

export class FddtSyringeRemoval {
  RemovalReason: string;
 // Remarks: string;
  RemovedBy: number;
}


export class SquintTranDeletefi {

  ID: number;
  IsActive: boolean;

}
export class SchDeletefi {

  ID: number;
  IsActive: boolean;

}

export class GlaDeletefi {

  ID: number;
  IsActive: boolean;

}



export class Funlatest1 {
  FundDescLat1: string;

  DescFun1: string;
  CodeFun1: number;
  OdFun1: boolean;
  OsFun1: boolean;
  OuFun1: boolean;

}
export class Slitlatest1 {
  SlitDescLat1: string;
  DescLat1: string;
  CodeLat1: number;
  OdLat1: boolean;
  OsLat1: boolean;
  OuLat1: boolean;


}


export class Disc {

  Desc: string;
  Code: number;
  checkStatusdsc: boolean;
  checkStatusdsc1: boolean;
  checkStatusdsc2: boolean;
  disabledscod = false;
  disabledscos = false;
  disabledscou = false;

}

export class Vessels {

  Desc: string;
  Code: number;
  checkStatusves: boolean;
  checkStatusves1: boolean;
  checkStatusves2: boolean;
  disablevesod = false;
  disablevesos = false;
  disablevesou = false;

}

export class Macula {

  Desc: string;
  Code: number;
  checkStatusmac: boolean;
  checkStatusmac1: boolean;
  checkStatusmac2: boolean;
  disablemacod = false;
  disablemacos = false;
  disablemacou = false;

}

export class Funlatest {

  DescFun: string;
  CodeFun: number;
  OdFun: boolean;
  OsFun: boolean;
  OuFun: boolean;

}



export class Adnexa {

  Desc: string;
  Code: number;
  checkStatusad: boolean;
  checkStatusad1: boolean;
  checkStatusad2: boolean;
  checkStatusadn: boolean;
  checkStatusadn1: boolean;
  checkStatusadn2: boolean;
  checkStatusadndi = false;
  checkStatusadndi1 = false;
  checkStatusadndi2 = false;

}

export class Lids {

  Desc: string;
  Code: number;
  checkStatusli: boolean;
  checkStatusli1: boolean;
  checkStatusli2: boolean;
  checkStatuslid: boolean;
  checkStatuslid1: boolean;
  checkStatuslid2: boolean;
  checkStatusliddi = false;
  checkStatusliddi1 = false;
  checkStatusliddi2 = false;

}

export class Conjuctiva {

  Desc: string;
  Code: number;
  checkStatuscon: boolean;
  checkStatuscon1: boolean;
  checkStatuscon2: boolean;
  disableconod = false;
  disableconos = false;
  disableconou = false;

}

export class Cornea {

  Desc: string;
  Code: number;
  checkStatuscor: boolean;
  checkStatuscor1: boolean;
  checkStatuscor2: boolean;
  disableconjod = false;
  disableconjos = false;
  disableconjou = false;

}

export class Antchmbr {

  Desc: string;
  Code: number;
  checkStatusant: boolean;
  checkStatusant1: boolean;
  checkStatusant2: boolean;
  disableantod = false;
  disableantos = false;
  disableantou = false;

}

export class Iris {

  Desc: string;
  Code: number;
  checkStatusiris: boolean;
  checkStatusiris1: boolean;
  checkStatusiris2: boolean;
  disableirisod = false;
  disableirisos = false;
  disableirisou = false;

}

export class Pupil {

  Desc: string;
  Code: number;
  checkStatuspup: boolean;
  checkStatuspup1: boolean;
  checkStatuspup2: boolean;
  disablepupod = false;
  disablepupos = false;
  disablepupou = false;

}

export class Lens {

  Desc: string;
  Code: number;
  checkStatuslens: boolean;
  checkStatuslens1: boolean;
  checkStatuslens2: boolean;
  disablelensod = false;
  disablelensos = false;
  disablelensou = false;

}

export class OcularMovements {

  Desc: string;
  Code: number;
  checkStatusocu: boolean;
  checkStatusocu1: boolean;
  checkStatusocu2: boolean;
  disableocuod = false;
  disableocuos = false;
  disableocuou = false;

}



export class PatientinfoOs {
  CategoryOs: string;
  DistSpOs: string;
  NearCyOs: string;
  PinAxiOs: string;
  Nearos: string;

}

export class IOPOs {
  IolnctOs: string;
}

export class Patientinfo {

  Category: string;
  DistSp: string;
  NearCy: string;
  PinAxi: string;
  Nearod: string;

}

export class IOP {

  Iolnct: string;
  // Iolat: string;


}

export class Slitinfo {

  Desc: string;
  Code: number;
  ODDescription: any;
  OSDescription: any;


}

export class Diag {

  Desc1: string;
  Code1: number;

  checkStatus: boolean;
  checkStatus1: boolean;
  checkStatus2: boolean;
  disablediaod = false;
  disablediaos = false;
  disablediaou = false;
}

export class Slithis {

  PDescription: string;
  Description: string;
  Od: boolean;
  Os: boolean;
  Ou: boolean;


}

export class Options {

  Desc: string;
  Code: number;


}

export class Diaghis {

  IcdCode: number;
  IcdDesc: string;
  Odd: boolean;
  Oss: boolean;
  Ouu: boolean;
}

export class Slitlatest {

  DescLat: string;
  CodeLat: number;
  OdLat: boolean;
  OsLat: boolean;
  OuLat: boolean;

}

export class Diaglate {

  IcdCode2: number;
  IcdDesc2: string;
  Odd2: boolean;
  Oss2: boolean;
  Ouu2: boolean;

}



