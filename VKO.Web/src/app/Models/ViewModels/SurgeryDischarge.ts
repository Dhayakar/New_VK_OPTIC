import { MedicalPrescriptionTran } from '../medicalprescriptiontrans.model';
import { SurgeryDischargeMaster } from '../SurgeryDischargeMaster.model';




export class SurgeryDischarge {

  SurgeryDischarge: SurgeryDischargedetail = new SurgeryDischargedetail();
  SurgeryPatientDischargedDetails: SurgeryPatientDischargedDetails = new SurgeryPatientDischargedDetails();
  MedicalPrescriptionTran: MedicalPrescriptionTran = new MedicalPrescriptionTran();
  MedicalPrescriptionTranDetails: Array<MedicalPrescriptionTran> = [];
  SurgeryDischargeMaster: SurgeryDischargeMaster = new SurgeryDischargeMaster();
  MedPrescription: MedPrescription = new MedPrescription();
  SystemicConditionDetails: Array<SystemicConditions> = [];
  OcularConditionsDetails: Array<OcularConditions> = [];
  PatientAllergys: Array<PatientAllergy> = [];
  PreviousSurgeryDetails: Array<PreviousSurgeryDetails> = [];
  PrescribedMedicalPrescriptionTran: Array<PrescribedMedicalPrescriptionTran> = [];
  Description: string;
  DoctorID: number;
  Createdby: number;
}

export class PatientAllergy {
  AllergyType: string;
  Description: string;
}

export class SurgeryDischargedetail {
  UIN: string;
  Name: string;
  Age: string;
  Gender: string;
  ocular: string;
  SurgeryDate: Date;
  AdmissionDate: Date;
  RegistrationTranId: number;
  SurID: number;
  Allergy: string;
  SurgeonName: string;
  AdmissionID: number;
  AnaestheticName: string;
  DoctorID: number;
  SurgeryDescription: string;
}

export class MedPrescription {
  UIN: string;
  Name: string;
  Prescribedby: number;
  ID: number;
  ReviewDate: Date;
  Createdby: number;
  Tc: number;
}


export class SurgeryPatientDischargedDetails {
  UIN: string;
  RegistrationTranId: number;
  SurgeryId: number;
  Name: string;
  Age: string;
  DOB: Date;
  Gender: string;
  AdmissionDate: Date;
  SurgeryDate: Date;
  DischargeDate: Date;
  TreatmentAdvice: string;
  DischargeType: string;
  AdmissionID: number;
  TransactionId: number;
  CMPID: number;
  Allergy: string;
  SurgeonName: string;
  AnaesthetistName: string;
  ocular: string;
  SurgeryDescription: string;
}

export class SystemicConditions {
  FromDate: Date;
  Description: string;
  ToMonths: number;
}


export class OcularConditions {
  Code: string;
  Description: string;
  OD: boolean;
  OU: boolean;
  OS: boolean;
}

export class PreviousSurgeryDetails {
  Name: string;
  Surgeon: string;
  SurgeryDate: Date;
  ocular: string;
  SurgeryDescription: string;
}


export class PrescribedMedicalPrescriptionTran {
  MedicalPrescriptionTranID: number;
  MedicalPrescriptionID: string;
  DrugID: string = null;
  ICD_DESCRIPTION: string = null;
  Brand: string = null;
  Frequency: string = null;
  Quantity: number = null;
  Eye: string = null;
  Food: string = null;
  Days: number = null;
  FromDate: Date;
  ToDate: Date;
  Remarks: string = null;
  UOM: string = null;
} 
