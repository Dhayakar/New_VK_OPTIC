import { OneLine_Master } from '../OneLineMaster';
import { DateTime } from 'wijmo/wijmo';
export class AppointmentView {
  cmpid: string;
  fname: string;
  mname: string;
  uin: string;
  lanme: string;
  dateofbirth: DateTime;
  gender: string;
  address1: string;
  address2: string;
  phonenumber: string;
  location: string;
  doctorid: string;
  appointmentresons: string;
  Appointmentrequesteddate: string;
  bookedby: string;
  HH: string;
  MM: string;
  Cretedby: string;
  onelinemaster: OneLine_Master = new OneLine_Master();
  MastersName: string;
  NV1: string;
  NV2: string;
}
