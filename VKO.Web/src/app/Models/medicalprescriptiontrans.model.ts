export class MedicalPrescriptionTran {

  MedicalPrescriptionTranID: number;
  MedicalPrescriptionID: string;
  DrugID: string = null;
  // Dossage: string = null;
  Frequency: string = null;
  Quantity: number = null;
  Eye: string = null;
  UOM: string = null;
  Food: string = null;
  Days: number = null;
  FromDate: Date;
  ToDate: Date;
  Remarks: string = null;
  CreatedUTC: Date;
  UpdatedUTC: Date;
  CreatedBy: number;
  UpdatedBy: number;
  ICD_DESCRIPTION: string = null;
  Brand: string = null;
  medicineid: number;
  // UOM: string = null;
  // tdesc: string = null;
  // did: number=0;
  manufac: string = null;
  dform: string = null;

  AvailableQty: number;
}
