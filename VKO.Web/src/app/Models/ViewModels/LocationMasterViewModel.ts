import { LocationMaster } from '../LocationMaster';


export class LocationMasterViewModel {

  LocMaster: LocationMaster = new LocationMaster();

  loactiondetails: Array<loactiondetails> = [];
}
export class loactiondetails {

  Countryname: string;
  Statename: string;
  Cityname: string;
  Loactionname: string;
  Pincode: number;
  LoactionID: number;
  disab: boolean;
}
