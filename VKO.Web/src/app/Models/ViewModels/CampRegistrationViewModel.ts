//import { CampPatientKINDetails } from "../CampPatientKINDetails.Model";
import { CampRegistration } from "../CampRegistration.Model";
import { CampRegistrationExtension } from "../CampRegistrationExtension.Model";
import { CampRegistrationTran } from "../CampRegistrationTran.Model";




export class CampRegistrationViewModel
{
  CampRegistration: CampRegistration = new CampRegistration();
  CampRegistrationTran: CampRegistrationTran = new CampRegistrationTran();
  CampRegistrationExtension: CampRegistrationExtension = new CampRegistrationExtension();
 // CampPatientKINDetails: CampPatientKINDetails = new CampPatientKINDetails();


  CampPatientKIN: Array<CampPatientKIN> = [];
  Companyname: string;
}



export class CampPatientKIN {

  Relationship: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  ContactNumber: number;
  EmailID: string;
  PrimaryKinId: boolean;

}


