

export class MedicalPrescription {

  MedicalPrescriptionID: number;
  RegistrationTranID: number;
  UIN = '';
  PrescribedBy: number;
  PrescribedByName = '';
  IsDeleted: boolean;
  CreatedUTC: Date;
  UpdatedUTC: Date;
  CreatedBy: number;
  UpdatedBy = 0;
  MedicalPrescriptionNo = '';
  CmpID: number;
  Transactionid: number;
}
