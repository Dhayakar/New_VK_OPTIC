

export class Opinion_Master {

  ID: number;
  RegistrationTranID: number;
  ContraOpionionID: number;
  FromDoctor: number;
  ToDoctor: number;
  OpinionDescription: string = null;
  OpinionStatus: number;
  OpinionTriggeredFrom: string = null;
  IsDeleted: boolean;
  CreatedUTC: Date;
  UpdatedUTC: Date;
  CreatedBy: number;
  UpdatedBy: number;
  
}
