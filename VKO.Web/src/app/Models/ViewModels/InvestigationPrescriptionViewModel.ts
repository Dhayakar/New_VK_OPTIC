import { InvPrescription } from "../InvestigationPrescription";
import { InvPrescriptionTran } from "../InvestigationPrescriptionTran";



export class InvestigationPrescription {
  
  InvPrescription: InvPrescription = new InvPrescription();
  InvPsT: Array<InvPrescriptionTran> = [];
  Companyname: string;
}



