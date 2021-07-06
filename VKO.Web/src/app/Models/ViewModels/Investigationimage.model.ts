import { MedicalPrescription } from '../medicalprescription.model';
import { MedicalPrescriptionTran } from '../medicalprescriptiontrans.model';
import { ICDMaster } from '../icdmaster.model';
import { OneLine_Master } from '../OneLineMaster';
import { RegistrationMaster } from './RegistrationMasterWebViewModel ';
import { Registration_Master } from '../RegistrationMasterWebModel';
import { InvestigationImages } from '../Investigationimage.model';
import { Payment_Master } from '../PaymentWebModel ';





export class InvestigationImage {

  Registration: Registration_Master = new Registration_Master();
  INV: Array<InvestigationImages> = [];
  Investigation: InvestigationImages = new InvestigationImages();
  stringArray: string[];

  PatDetails: Array<PatDetails> = [];
  InvestigationDetails: Array<InvestigationDetails> = [];
  OneLineMaster: OneLine_Master = new OneLine_Master();
  InvImg: Array<InvImg> = [];
  InvDetails: Array<InvDetails> = [];
  PastDetails: Array<PastDetails> = []; // InvDet
  InvDet: Array<InvDet> = [];
  PaymentMaster: Array<Payment_Master> = [];
  uid = 0;
}

export class PatDetails {

  Uin: string;
  idd: number;
  DOI: Date;
  PresBy: string;
  Remarks: string;
  Name: string;
  Age: number;
  Gender: string;
  Desc: string;
  rd: number;
  Cost: number;

}

export class InvDet {

  InvName: string;
  Amount: number;
  Taxper: number;
  Tax: number;
  DisPer: number;
  Discount: number;
  Totalvalue: number;

}

export class InvestigationDetails {

  Code: number;
  Desc: string;
  Amount: number;

}

export class InvImg {

  idm: number;
  Desccm: string;
  imgdt: string;
  fimg: string;

}

export class InvDetails {

  Desc: string;
  rd: number;
  Cost: number;

}

export class PastDetails {

  uin: string;
  ImgcapLoc: string;
  ExtInt: string;
  Address1: string;
  Address2: string;
  ReferredBy: string;
  Remarks: string;


}


