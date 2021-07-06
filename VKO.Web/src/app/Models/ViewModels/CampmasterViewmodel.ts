import { Camporganization_Model } from '../Camporganization_Model';
import { DateTime } from 'wijmo/wijmo';

export class campmasterViewModel {
  Camp_OrganizationModel = new Camporganization_Model();
  OrganizationName: string;
  OrganizationID: string;
  Address1: string;
  Address2: string;
  Address3: string;
  Location: string;
  City: string;
  State: string;
  Country: string;
  ContactPerson: string;
  Phone: string;
  EMailID: string;
  Website: string;
  OrganizationType: string;
  IsActive: string;

  CampMastreID: string;
  CampMastreName: string;
  CampMastrefrom: DateTime;
  CampMastreto: DateTime;
  CampMastreorganisedby: string;
  CampMastrestate: string;
  CampMastrecity: string;
  CampMastrelocation: string;
  CampMastrecountry: string;

  Userroleid: string;
}
