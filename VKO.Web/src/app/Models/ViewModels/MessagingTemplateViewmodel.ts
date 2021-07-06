import { MsgTemplate } from '../Messagetemplatemodel';


export class Consentdata {
  Fromdate: string;
  Todate: string;
  Consentobtainedby: string;
  cmpid: string;
}


export class MessagingTemplate {
  // MessageTemplates: MsgTemplate = new MsgTemplate();
  MsgTemplateName: string;
  MsgTemplateSMSDESC: string;
  MsgTemplateMAILDESCR: string;
  MsgTemplateSUBJECT: string;
  MsgTemplateWHATSAPPDESCRIP: string;
  MsgTemplateCreatedby: string;
  MsgTemplateCMPID: string;
  Checklistdetailsss: Array<ChecklistDetails> = [];
  PatientChecklistDetailssssssss: Array<PatientChecklistDetails> = [];


  PatientChecklistDetailssssssssmail: Array<PatientChecklistDetailsmal> = [];
  PatientChecklistDetailsssssssswhatsapp: Array<PatientChecklistDetailswhatsap> = [];
  ParientChecklistdetailsss: Array<PatientchecklistChecklistDetails> = [];


  visittype: string;
}


export class PatientChecklistDetailsmal {
  ItemDescription: string;

}

export class PatientChecklistDetailswhatsap {
  ItemDescription: string;

}

export class PatientChecklistDetails {
  ItemDescription: string;

}

export class ChecklistDetails {
  ItemDescription: string;

}


export class PatientchecklistChecklistDetails {
  phonenumber: string;
  UIN: string;
  email: string;
  Select: boolean;
}
